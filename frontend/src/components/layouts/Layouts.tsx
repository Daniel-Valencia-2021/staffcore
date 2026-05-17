import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import Header from './Header'

export default function Layout() {
  return (
    <div className="layout flex h-screen bg-white">
      <Sidebar />
      <div className="main-content flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="content-area flex-1 overflow-y-auto p-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}