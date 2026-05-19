import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import api from "@/api/axios";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await api.post("/auth/login", { email, password });
      const { access_token } = response.data;
      localStorage.setItem("token", access_token);
      navigate("/dashboard");
    } catch {
      setError("Credenciales inválidas. Inténtalo de nuevo.");
    } finally {
      setLoading(false);
    }  };

  return (
    <div className="flex h-screen">
      <div className="hidden md:flex w-1/2 bg-[#0a0a0a] flex-col justify-center px-16">
        <div className="w-10 h-10 rounded-sm bg-[#2a5a2a] flex items-center justify-center text-white text-xs font-black tracking-wider mb-8">
          SC
        </div>
        <h1 className="text-4xl font-black text-white leading-tight mb-4">
          StaffCore
        </h1>
        <p className="text-gray-400 text-sm leading-relaxed">
          Sistema de gestion de empleados. Datos claros, decisiones rapidas.
        </p>
      </div>

      <div className='w-full md:w-1/2 flex items-center justify-center px-8'>
        <div className='w-full max-w-sm'>
          <h2 className='text-2xl font-bold text-gray-900 mb-2'>
          Bienvenido de nuevo
          </h2>
          <p className='text-sm text-gray-400 mb-8'>
          Ingresa tus credenciales para continuar
          </p>
          {/* Campo email */}
          <div className='mb-4'>
            <label className='text-sm font-medium text-gray-700 mb-1 block'>
              Email
            </label>
            <Input
              type='email'
              placeholder='tu@email.com'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          {/* Campo contraseña */}
          <div className='mb-6'>
            <label className='text-sm font-medium text-gray-700 mb-1 block'>
              Contraseña
            </label>
            <Input
              type='password'
              placeholder='••••••••'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

          <Button onClick={handleLogin} disabled={loading} className='w-full bg-[#2a5a2a] hover:bg-[#1e431e] text-white font-bold py-2 px-4 rounded'>
            {loading ? "Ingresando..." : "Ingresar"}
          </Button>

        </div>
      </div>
    </div>
  );
}
