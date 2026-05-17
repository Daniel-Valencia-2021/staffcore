export default function Header() {
  return (
    <header className="header h-16 border-b border-gray-100 flex items-center justify-between px-8 bg-white">
      <div className="header-left flex items-center text-green-700 font-bold text-lg tracking-wide ">
        <h1 className="header-title">StaffCore</h1>
      </div>
      <div className="flex gap-10">
        <div className="flex flex-col items-center">
          <span className="text-3xl font-black text-[#2a5a2a]">148</span>
          <span className="text-xs text-gray-400 uppercase tracking-wider">
            Empleados
          </span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-3xl font-black text-[#2a5a2a]">8</span>
          <span className="text-xs text-gray-400 uppercase tracking-wider">
            Departamentos
          </span>
        </div>
      </div>
      <div className="usuario flex flex-col items-end">
        <span className="text-sm font-medium text-gray-800">
          example@example.com
        </span>
        <span className="text-xs text-[#2a5a2a] font-semibold uppercase tracking-wider">
          Administrador
        </span>
      </div>
    </header>
  );
}
