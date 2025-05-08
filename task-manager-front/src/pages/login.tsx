import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import "../app/globals.css";
import Link from "next/link";

const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
})

type LoginSchema = z.infer<typeof loginSchema>;

export default function LoginPage(){
    const{
        register,
        handleSubmit,
        formState: {errors},
    } = useForm<LoginSchema>({
        resolver: zodResolver(loginSchema),
    });

    const router = useRouter();
    const [errorMsg, setErrorMsg] = useState("");

    const onSubmit = async (data: LoginSchema) => {
        try{
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, data);

            const token = response.data.access_token;

            localStorage.setItem("token", token);
            router.push("/dashboard");
        } catch (error: any) {
            setErrorMsg(error.response.data.message || "Invalid email or password");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
          <div className="w-full max-w-md bg-white p-8 rounded shadow">
            <h2 className="text-2xl font-bold mb-6 text-center text-black">Iniciar sesión</h2>
    
            {errorMsg && <p className="text-red-500 mb-4">{errorMsg}</p>}
    
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
                Iniciar sesión
              </button>
            </form>
            <p className="text-center text-black mt-2">¿No tienes una cuenta? <Link href="/register" className="text-blue-500 hover:text-blue-700">Regístrate</Link></p>
          </div>
        </div>
      );
}
