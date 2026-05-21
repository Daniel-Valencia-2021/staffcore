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
    }
  };

  return (
    <div className="flex h-screen bg-[#F7F9FB]">

      {/* Mitad izquierda — identidad */}
      <div className="hidden md:flex w-1/2 bg-[#0a0a0a] flex-col justify-between px-16 py-12">
        
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-sm bg-[#2a5a2a] flex items-center justify-center">
            <span className="text-white text-[10px] font-black">SC</span>
          </div>
          <span className="text-white font-bold text-sm tracking-wide">StaffCore</span>
        </div>

        {/* Contenido central */}
        <div>
          <h1 className="text-5xl font-black text-white leading-tight mb-6 tracking-tight">
            Gestión de<br />personal,<br />
            <span className="text-[#7fd4a0]">sin fricción.</span>
          </h1>
          <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
            Datos claros, decisiones rápidas. Todo lo que necesitas para administrar tu equipo en un solo lugar.
          </p>
        </div>

        {/* Footer */}
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-[#2a5a2a]" />
          <span className="text-gray-600 text-xs">StaffCore · 2026</span>
        </div>

      </div>

      {/* Mitad derecha — formulario */}
      <div className="w-full md:w-1/2 flex items-center justify-center px-8">
        <div className="w-full max-w-sm">

          {/* Header del formulario */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 tracking-tight mb-1">
              Bienvenido de nuevo
            </h2>
            <p className="text-sm text-gray-400">
              Ingresa tus credenciales para continuar
            </p>
          </div>

          {/* Campo email */}
          <div className="mb-4">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-2 block">
              Email
            </label>
            <Input
              type="email"
              placeholder="tu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-11 bg-white border-gray-200 focus:border-[#2a5a2a] focus:ring-[#2a5a2a] rounded-lg"
            />
          </div>

          {/* Campo contraseña */}
          <div className="mb-6">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-2 block">
              Contraseña
            </label>
            <Input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter") handleLogin() }}
              className="h-11 bg-white border-gray-200 focus:border-[#2a5a2a] focus:ring-[#2a5a2a] rounded-lg"
            />
          </div>

          {/* Error */}
          {error && (
            <div className="mb-4 px-4 py-3 bg-red-50 border border-red-100 rounded-lg">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}

          {/* Botón */}
          <Button
            onClick={handleLogin}
            disabled={loading}
            className="w-full h-11 bg-[#2a5a2a] hover:bg-[#1e421e] text-white font-semibold rounded-lg transition-colors"
          >
            {loading ? "Ingresando..." : "Ingresar"}
          </Button>

        </div>
      </div>

    </div>
  );
}