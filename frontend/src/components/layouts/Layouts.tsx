export default function Layout() {
  return (
    <div>
      <header>
        <h1>StaffCore</h1>
      </header>
      <nav>
        <ul>
          <li><a href="/dashboard">Dashboard</a></li>
          <li><a href="/empleados">Empleados</a></li>
          <li><a href="/departamentos">Departamentos</a></li>
          <li><a href="/nomina">Nómina</a></li>
        </ul>
      </nav>
      <main>
        {/* Aquí se renderizarán las páginas según la ruta */}
      </main>
    </div>
  )
}