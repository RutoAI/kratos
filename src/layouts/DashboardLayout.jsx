import { Outlet, Link, useLocation } from 'react-router-dom'
import { useState } from 'react'
import { MdDashboard, MdPeople, MdAccountBalanceWallet, MdPalette, MdCampaign, MdSecurity, MdConfirmationNumber, MdChevronRight } from 'react-icons/md'

const DashboardLayout = () => {
  const location = useLocation()
  const [openMenus, setOpenMenus] = useState({ users: true })

  const toggleMenu = (menuName) => {
    setOpenMenus(prev => {
      const newState = {}
      Object.keys(prev).forEach(key => {
        newState[key] = false
      })
      newState[menuName] = !prev[menuName]
      return newState
    })
  }

  const navigation = [
    {
      name: 'Overview',
      href: '/dashboard',
      icon: MdDashboard,
      current: location.pathname === '/dashboard'
    },
    {
      name: 'Users',
      icon: MdPeople,
      hasSubmenu: true,
      isOpen: openMenus.users,
      submenu: [
        { name: 'Overview', href: '/dashboard/users' },
        { name: 'Manage General Users', href: '/dashboard/users/general' },
        { name: 'Manage Administrative User', href: '/dashboard/users/admin' },
        { name: 'Manage Roles', href: '/dashboard/users/roles' },
        { name: 'Inspect User Activity', href: '/dashboard/users/activity' },
      ]
    },
    { name: 'Finance', icon: MdAccountBalanceWallet, hasSubmenu: true, isOpen: openMenus.finance },
    { name: 'Appearance', icon: MdPalette, hasSubmenu: true, isOpen: openMenus.appearance },
    { name: 'Announcement', icon: MdCampaign, hasSubmenu: true, isOpen: openMenus.announcement },
    { name: 'Security', icon: MdSecurity, hasSubmenu: true, isOpen: openMenus.security },
    { name: 'Ticket', icon: MdConfirmationNumber, hasSubmenu: true, isOpen: openMenus.ticket },
  ]

  return (
    <div className="min-h-screen flex" style={{ backgroundColor: '#070E1E' }}>
      {/* Sidebar */}
      <div className="w-[350px] fixed h-screen border-r border-gray-600 flex flex-col" style={{ backgroundColor: '#070E1E' }}>
        {/* Header */}
        <div className="p-6 align-center text-center">
          <img
            src="/images/ruto-long.png"
            alt="Ruto Logo"
            className="h-6 text-center align-center mx-auto"
          />
          <p className="text-white text-sm mt-2">Administrative Dashboard</p>
        </div>

        {/* Navigation */}
        <nav className="px-4 space-y-2 flex-1 overflow-y-auto">
          {navigation.map((item) => {
            const IconComponent = item.icon
            return (
              <div key={item.name}>
                {item.hasSubmenu ? (
                  <div>
                    <button
                      onClick={() => toggleMenu(item.name.toLowerCase())}
                      className={`w-full flex items-center justify-between px-4 py-3 text-sm font-medium rounded-lg transition-colors border ${
                        item.isOpen
                          ? 'text-orange-500 border-gray-700'
                          : 'text-white border-gray-700 hover:bg-gray-800 hover:bg-opacity-30'
                      }`}
                    >
                      <div className="flex items-center">
                        <IconComponent className="mr-3 text-lg" />
                        {item.name}
                      </div>
                      <MdChevronRight className={`text-lg transition-transform ${item.isOpen ? 'rotate-90' : ''}`} />
                    </button>
                    {item.isOpen && item.submenu && (
                      <div className="mt-2 ml-4 space-y-1">
                        {item.submenu.map((subItem) => (
                          <Link
                            key={subItem.name}
                            to={subItem.href}
                            className={`block px-4 py-2 text-sm rounded-lg transition-colors ${
                              location.pathname === subItem.href
                                ? 'text-white bg-gray-800 bg-opacity-50'
                                : 'text-gray-300 hover:text-white hover:bg-gray-800 hover:bg-opacity-30'
                            }`}
                          >
                            {subItem.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    to={item.href}
                    className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors border ${
                      item.current
                        ? 'text-white border-gray-700 bg-gray-800 bg-opacity-30'
                        : 'text-white border-gray-700 hover:bg-gray-800 hover:bg-opacity-30'
                    }`}
                  >
                    <IconComponent className="mr-3 text-lg" />
                    {item.name}
                  </Link>
                )}
              </div>
            )
          })}

          {/* User Profile Section */}
          <div className="px-4 py-3 border border-gray-700 rounded-lg">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full mx-auto mb-3" style={{ backgroundColor: '#FFB3D9' }}></div>
              <h3 className="text-white font-semibold text-sm">Super Admin</h3>
              <p className="text-gray-400 text-xs mb-3">hi***@gmail.com</p>
              <div className="text-xs text-gray-400 mb-3">
                <div className="flex justify-between">
                  <span>Last logged in from:</span>
                  <span className="text-white">192.168.0.1</span>
                </div>
                <div className="flex justify-between">
                  <span>Current login:</span>
                  <span className="text-white">127.0.0.1</span>
                </div>
              </div>
              <button className="w-full px-4 py-2 text-orange-500 border border-orange-500 rounded-lg hover:bg-orange-500 hover:bg-opacity-10 transition-colors text-sm font-medium">
                Logout →
              </button>
            </div>
          </div>
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 ml-[350px]">
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default DashboardLayout
