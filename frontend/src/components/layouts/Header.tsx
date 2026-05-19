import { jwtDecode } from "jwt-decode";

interface HeaderProps {
  totalEmpleados: number;
  totalDepartamentos: number;
}

export default function Header({ totalEmpleados, totalDepartamentos }: HeaderProps) {
  const token = localStorage.getItem("token");
  const user = token ? jwtDecode<{ email: string; role: string }>(token) : null;

  return (
    <header className="header h-16 border-b border-gray-100 flex items-center justify-between px-8 bg-white">
      <div className="header-left flex items-center text-green-700 font-bold text-lg tracking-wide ">
        <h1 className="header-title">StaffCore</h1>
      </div>
      <div className="flex gap-10">
        <div className="flex flex-col items-center">
          <span className="text-3xl font-black text-[#2a5a2a]">{totalEmpleados}</span>
          <span className="text-xs text-gray-400 uppercase tracking-wider">
            Empleados
          </span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-3xl font-black text-[#2a5a2a]">{totalDepartamentos}</span>
          <span className="text-xs text-gray-400 uppercase tracking-wider">
            Departamentos
          </span>
        </div>
      </div>
      <div className="usuario flex flex-col items-end">
        <span className="text-sm font-medium text-gray-800">
          {user?.email || "example@example.com"}
        </span>
        <span className="text-xs text-[#2a5a2a] font-semibold uppercase tracking-wider">
          {user?.role || "Administrador"}
        </span>
      </div>
    </header>
  );
}
