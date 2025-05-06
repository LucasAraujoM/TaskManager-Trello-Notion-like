import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useState } from 'react';
import "../app/globals.css";
import Link from 'next/link';
const registerSchema = z.object({
  name: z.string().min(2, 'El nombre es obligatorio'),
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'Mínimo 6 caracteres'),
});

type RegisterFormData = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const router = useRouter();
  const [errorMsg, setErrorMsg] = useState('');

  const onSubmit = async (data: RegisterFormData) => {
    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/register`, data);

      const token = res.data.access_token;

      localStorage.setItem('token', token);

      router.push('/dashboard');
    } catch (err: any) {
      setErrorMsg(err.response?.data?.message || 'Error al registrarse');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded shadow">
        <h2 className="text-2xl font-bold mb-6 text-center text-black">Crear cuenta</h2>

        {errorMsg && <p className="text-red-500 mb-4">{errorMsg}</p>}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block mb-1 text-black">Nombre</label>
            <input
              type="text"
              {...register('name')}
              className="w-full border px-3 py-2 rounded text-black"
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
          </div>

          <div>
            <label className="block mb-1 text-black">Email</label>
            <input
              type="email"
              {...register('email')}
              className="w-full border px-3 py-2 rounded text-black"
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          </div>

          <div>
            <label className="block mb-1 text-black">Contraseña</label>
            <input
              type="password"
              {...register('password')}
              className="w-full border px-3 py-2 rounded text-black"
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Registrarse
          </button>
        </form>
        <p className="text-center text-black mt-2">¿Ya tienes una cuenta? <Link href="/login" className="text-blue-500 hover:text-blue-700">Inicia sesión</Link></p>
      </div>
    </div>
  );
}
