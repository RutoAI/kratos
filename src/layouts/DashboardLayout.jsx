import { Outlet, Link, useLocation } from 'react-router-dom'

const DashboardLayout = () => {
  const location = useLocation()

  const navigation = [
    { name: 'Overview', href: '/dashboard', current: location.pathname === '/dashboard' },
    { name: 'Users', href: '/dashboard/users', current: location.pathname === '/dashboard/users' },
    { name: 'Finance', href: '/dashboard/finance', current: location.pathname === '/dashboard/finance' },
    { name: 'Appearance', href: '/dashboard/appearance', current: location.pathname === '/dashboard/appearance' },
    { name: 'Announcement', href: '/dashboard/announcement', current: location.pathname === '/dashboard/announcement' },
    { name: 'Security', href: '/dashboard/security', current: location.pathname === '/dashboard/security' },
    { name: 'System Health', href: '/dashboard/system-health', current: location.pathname === '/dashboard/system-health' },
  ]

  return (
    <div className="min-h-screen flex" style={{ backgroundColor: '#0F172A' }}>
      {/* Sidebar */}
      <div className="w-[350px] border-r border-gray-600" style={{ backgroundColor: '#070E1E' }}>
        <div className="p-6 align-center text-center">
          <img
            src="/images/ruto-long.png"
            alt="Ruto Logo"
            className="h-6 text-center align-center mx-auto"
          />
          <p className='text-white '>
            Administrative dashboard
          </p>
        </div>

        <nav className="px-4 space-y-1 ">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                item.current
                  ? 'text-orange-500 bg-orange-50 bg-opacity-10 border-l-4 border-orange-500'
                  : 'text-gray-300 hover:text-orange-400 hover:bg-gray-700 hover:bg-opacity-30'
              }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1">
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default DashboardLayout