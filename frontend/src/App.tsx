
import './App.css'
import { Routes, Route } from 'react-router-dom'
import Layout from './components/layouts/Layouts'
import Dashboard from './pages/Dashboard'
import Empleados from './pages/Empleados'
import Departamentos from './pages/Departamentos'
import Nomina from './pages/Nomina'
import Login from './pages/Login'

function App() {

return (
  <Routes>
    <Route path='/login' element={<Login />} />
    <Route element={<Layout />}>
      <Route path='/dashboard' element={<Dashboard />} />
      <Route path='/empleados' element={<Empleados />} />
      <Route path='/departamentos' element={<Departamentos />} />
      <Route path='/nomina' element={<Nomina />} />
    </Route>
  </Routes>
)
}

export default App
