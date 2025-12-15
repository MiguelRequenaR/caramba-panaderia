import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useCategories } from '@/hooks/useCategories';
import { toast } from 'react-toastify';
import { useQueryClient } from '@tanstack/react-query';
import type { Product } from '@/schemas';

interface FormAddProductProps {
  onClose: () => void;
  product?: Product | null;
}

export default function FormAddProduct({ onClose, product }: FormAddProductProps) {
  const queryClient = useQueryClient();
  const { data: categories, isLoading: loadingCategories } = useCategories();
  const isEditMode = !!product;
  
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category_id: '',
    is_available: false,
  });
  const [imageFile, setImageFile] = useState<File | null>(null);

  useEffect(() => {
    if (product) {
      setFormData({
        name: product?.name || '',
        description: product?.description || '',
        price: product?.price.toString() || '',
        category_id: product?.category_id.toString() || '',
        is_available: product?.is_available || false,
      });
      setPreview(product?.image_url || null);
    } else {
      setFormData({
        name: '',
        description: '',
        price: '',
        category_id: '',
        is_available: false,
      });
      setPreview(null);
      setImageFile(null);
    }
  }, [product]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
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
      let imageUrl = null;

      if (imageFile) {
        const fileExt = imageFile.name.split('.').pop();
        const fileName = `${Date.now()}.${fileExt}`;
        const filePath = `${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('products')
          .upload(filePath, imageFile);

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
          .from('products')
          .getPublicUrl(filePath);

        imageUrl = publicUrl;
      } else if (product?.image_url) {
        imageUrl = product.image_url;
      }

      const updateData: any = {
        name: formData.name,
        description: formData.description,
        price: parseFloat(formData.price),
        category_id: parseInt(formData.category_id),
        is_available: formData.is_available,
      };

      if (imageUrl) {
        updateData.image_url = imageUrl;
      }

      if (isEditMode && product) {
        const { error: updateError } = await supabase
          .from('products')
          .update(updateData)
          .eq('id', product.id);

        if (updateError) throw updateError;
        toast.success('¡Producto actualizado con éxito!');
      } else {
        const { error: insertError } = await supabase
          .from('products')
          .insert([updateData]);
        
        if (insertError) throw insertError;
        toast.success('¡Producto creado con éxito!');
      }

      queryClient.invalidateQueries({ queryKey: ['products'] });
      onClose();
    } catch (error: any) {
      console.error('Error:', error);
      toast.error(`Error al ${isEditMode ? 'actualizar' : 'crear'} producto: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Nombre */}
        <div>
          <label className="block text-sm font-medium text-secondary">Nombre del Producto</label>
          <input
            type="text"
            name="name"
            required
            className="mt-1 block w-full rounded-md border text-secondary border-secondary px-3 py-2 focus:border-orange-500 focus:outline-none"
            value={formData.name}
            onChange={handleChange}
          />
        </div>

        {/* Descripción */}
        <div>
          <label className="block text-sm font-medium text-secondary">Descripción</label>
          <textarea
            name="description"
            rows={3}
            className="mt-1 block w-full rounded-md border text-secondary border-secondary px-3 py-2 focus:border-orange-500 focus:outline-none"
            value={formData.description}
            onChange={handleChange}
          />
        </div>

        {/* Precio y Categoría (Grid) */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-secondary">Precio (S/.)</label>
            <input
              type="number"
              name="price"
              step="0.10"
              required
              className="mt-1 block w-full rounded-md border text-secondary border-secondary px-3 py-2 focus:border-orange-500 focus:outline-none"
              value={formData.price}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-secondary">Categoría</label>
            <select
              name="category_id"
              required
              className="mt-1 block w-full rounded-md border text-secondary border-secondary px-3 py-2 focus:border-orange-500 focus:outline-none"
              value={formData.category_id}
              onChange={handleChange}
            >
              <option value="">Seleccionar...</option>
              {loadingCategories ? (
                <option disabled>Cargando...</option>
              ) : (
                categories?.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))
              )}
            </select>
          </div>
        </div>
        <div className='grid grid-cols-2 gap-4'>
          {/* Imagen */}
          <div>
            <label className="block text-sm font-medium text-secondary mb-2">Imagen del Producto</label>
            <div className="flex flex-col items-center gap-2">
              <label
                htmlFor="image-upload"
                className="flex flex-col items-center justify-center w-full h-28 border-2 border-dashed border-secondary rounded-md cursor-pointer hover:bg-orange-50 transition-colors"
              >
                {preview ? (
                  <img
                    src={preview}
                    alt="Vista previa"
                    className="h-24 w-24 object-cover rounded-md border border-secondary"
                  />
                ) : (
                  <span className="text-gray-500 text-sm">
                    Haz clic o arrastra una imagen aquí
                  </span>
                )}
                <input
                  id="image-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
            </div>
          </div>

          {/* Disponible */}
          <div>
            <label className="block text-sm font-medium text-secondary mb-2" htmlFor="is_available_switch">
              Disponible
            </label>
            <div className="flex items-center py-3">
              <span className="mr-3 text-secondary font-medium">No</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  id="is_available_switch"
                  type="checkbox"
                  name="is_available"
                  checked={formData.is_available}
                  onChange={e =>
                    setFormData(prev => ({
                      ...prev,
                      is_available: e.target.checked
                    }))
                  }
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-secondary transition-colors after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full after:duration-300"></div>
              </label>
              <span className="ml-3 text-secondary font-medium">Si</span>
            </div>
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
            {loading ? 'Guardando...' : isEditMode ? 'Actualizar Producto' : 'Crear Producto'}
          </button>
        </div>
      </form>
    </div>
  );
};
