import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { LoginSchema, type LoginForm } from "@/schemas";
import { ArrowLeftIcon } from "lucide-react";

export default function Login() {

  const [formData, setFormData] = useState<LoginForm>({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<Partial<Record<keyof LoginForm, string>>>({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name as keyof LoginForm]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }) )
    }
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});

    const result = LoginSchema.safeParse(formData);

    if (!result.success) {
      const newErrors: Partial<Record<keyof LoginForm, string>> = {};
      result.error.issues.forEach((issue) => {
        const field = issue.path[0] as keyof LoginForm;
        newErrors[field] = issue.message;
      });
      setErrors(newErrors);
      toast.error("Ingrese los datos correctamente");
      return;
    }
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email: result.data.email,
      password: result.data.password,
    });

    if (error) {
      toast.error("Credenciales incorrectas: " + error.message);
    } else {
      // si el inicio de sesión es exitoso, redirigir al panel de administración
      navigate("/admin/dashboard");
    }
    setLoading(false);
  }

  return (
    <div className="flex h-screen items-center justify-center bg-[#f8f7ee]">
      <div className="absolute top-4 left-4 bg-secondary px-4 py-2 rounded-lg" data-aos="fade-right" data-aos-delay="100">
        <Link to="/" className="text-white uppercase hover:text-secondary-dark flex items-center gap-2">
          <ArrowLeftIcon className="w-4 h-4" />
          Volver a la página principal
        </Link>
      </div>
      <form onSubmit={handleLogin} className="w-full max-w-md mx-4 md:mx-0" data-aos="zoom-in">
        <h2 className="text-3xl font-bold mb-6 text-center text-secondary uppercase">Iniciar Sesión</h2>

        <div className="mb-4">
          <label className="block text-secondary text-sm font-bold mb-2">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            placeholder="correo@ejemplo.com"
            onChange={handleChange}
            className={`w-full px-3 py-2 border border-secondary text-secondary rounded-lg focus:outline-none focus:border-secondary bg-transparent placeholder-secondary
            ${errors.email
              ? "border-red-500 text-red-500"
              : "border-secondary text-secondary focus:border-secondary"
            }`}
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email}</p>
          )}
        </div>

        <div className="mb-6">
          <label className="block text-secondary text-sm font-bold mb-2">Contraseña</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className={`w-full px-3 py-2 border border-secondary text-secondary rounded-lg focus:outline-none focus:border-secondary bg-transparent placeholder-secondary
            ${errors.password
              ? "border-red-500 text-red-500"
              : "border-secondary text-secondary focus:border-secondary"
            }`}
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-secondary text-white font-bold uppercase tracking-wide py-3 px-4 rounded-full disabled:opacity-50 cursor-pointer text-lg"
        >
          {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
        </button>
      </form>
    </div>
  )
}
