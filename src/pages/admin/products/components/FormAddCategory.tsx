import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { toast } from 'react-toastify';
import { useQueryClient } from '@tanstack/react-query';
import type { Category } from '@/schemas';

interface FormAddCategoryProps {
  onClose: () => void;
  category?: Category | null;
}

export default function FormAddCategory({ onClose, category }: FormAddCategoryProps) {
  const queryClient = useQueryClient();
  const isEditMode = !!category;
  
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
  });
  const [imageFile, setImageFile] = useState<File | null>(null);

  // Cargar datos de la categoría si está en modo edición
  useEffect(() => {
    if (category) {
      setFormData({
        name: category?.name || '',
        slug: category?.slug || '',
      });
      setPreview(category?.image_url || null);
    } else {
      // Resetear formulario si no hay categoría
      setFormData({
        name: '',
        slug: '',
      });
      setPreview(null);
      setImageFile(null);
    }
  }, [category]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    // Auto-generar slug al escribir el nombre
    if (name === 'name' && !isEditMode) {
      const slug = value
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '') // Eliminar acentos
        .replace(/[^a-z0-9]+/g, '-') // Reemplazar espacios y caracteres especiales por guiones
        .replace(/(^-|-$)/g, ''); // Eliminar guiones al inicio y final
      setFormData(prev => ({ ...prev, slug }));
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      let imageUrl: string | null = null;

      if (imageFile) {
        const fileExt = imageFile.name.split('.').pop();
        const fileName = `category-${Date.now()}.${fileExt}`;
        const filePath = `${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('products')
          .upload(filePath, imageFile);

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
          .from('products')
          .getPublicUrl(filePath);

        imageUrl = publicUrl;
      } else if (category?.image_url) {
        // Si no hay nueva imagen pero hay una existente, usar la existente
        imageUrl = category.image_url;
      }

      const updateData: any = {
        name: formData.name,
        slug: formData.slug,
      };

      if (imageUrl) {
        updateData.image_url = imageUrl;
      }

      if (isEditMode && category) {
        // Modo edición: actualizar categoría
        const { error: updateError } = await supabase
          .from('categories')
          .update(updateData)
          .eq('id', category.id);

        if (updateError) throw updateError;
        toast.success('¡Categoría actualizada con éxito! 🎉');
      } else {
        // Modo creación: insertar nueva categoría
        const { error: insertError } = await supabase
          .from('categories')
          .insert([updateData]);
        
        if (insertError) throw insertError;
        toast.success('¡Categoría creada con éxito! 🎉');
      }

      queryClient.invalidateQueries({ queryKey: ['categories'] });
      onClose();
    } catch (error: any) {
      console.error('Error:', error);
      toast.error(`Error al ${isEditMode ? 'actualizar' : 'crear'} categoría: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Nombre */}
        <div>
          <label className="block text-sm font-medium text-secondary">Nombre de la Categoría</label>
          <input
            type="text"
            name="name"
            required
            className="mt-1 block w-full rounded-md border text-secondary border-secondary px-3 py-2 focus:border-orange-500 focus:outline-none"
            value={formData.name}
            onChange={handleChange}
          />
        </div>

        {/* Slug */}
        <div>
          <label className="block text-sm font-medium text-secondary">Slug (URL amigable)</label>
          <input
            type="text"
            name="slug"
            required
            className="mt-1 block w-full rounded-md border text-secondary border-secondary px-3 py-2 focus:border-orange-500 focus:outline-none"
            value={formData.slug}
            onChange={handleChange}
            placeholder="ejemplo: pan-dulce"
          />
          <p className="mt-1 text-xs text-gray-500">Este campo se genera automáticamente, pero puedes editarlo</p>
        </div>

        {/* Imagen */}
        <div>
          <label className="block text-sm font-medium text-secondary mb-2">Imagen de la Categoría</label>
          <div className="flex flex-col items-center gap-2">
            <label
              htmlFor="category-image-upload"
              className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-secondary rounded-md cursor-pointer hover:bg-orange-50 transition-colors"
            >
              {preview ? (
                <img
                  src={preview}
                  alt="Vista previa"
                  className="h-28 w-28 object-cover rounded-md border border-secondary"
                />
              ) : (
                <span className="text-gray-500 text-sm">
                  Haz clic o arrastra una imagen aquí
                </span>
              )}
              <input
                id="category-image-upload"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>
          </div>
        </div>

        {/* Botones */}
        <div className="flex gap-4 pt-4">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-2 px-4 border border-secondary rounded-full uppercase text-secondary cursor-pointer"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={loading}
            className="flex-1 py-2 px-4 bg-secondary hover:bg-secondary/80 text-white rounded-full uppercase disabled:opacity-50 cursor-pointer transition-colors duration-500"
          >
            {loading ? 'Guardando...' : isEditMode ? 'Actualizar Categoría' : 'Crear Categoría'}
          </button>
        </div>
      </form>
    </div>
  );
}
