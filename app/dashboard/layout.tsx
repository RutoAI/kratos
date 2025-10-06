'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { MdDashboard, MdPeople, MdAccountBalanceWallet, MdPalette, MdAnnouncement, MdSecurity, MdConfirmationNumber, MdChevronRight, MdExpandMore } from 'react-icons/md'

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname()
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({ users: true })

  const toggleMenu = (menuName: string) => {
    setOpenMenus(prev => ({ ...prev, [menuName]: !prev[menuName] }))
  }

  const navigation = [
    {
      name: 'Overview',
      href: '/dashboard',
      icon: MdDashboard,
      current: pathname === '/dashboard'
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
    { name: 'Finance', icon: MdAccountBalanceWallet, hasSubmenu: true, isOpen: openMenus.finance, submenu: [] },
    { name: 'Appearance', icon: MdPalette, hasSubmenu: true, isOpen: openMenus.appearance, submenu: [] },
    { name: 'Announcement', icon: MdAnnouncement, hasSubmenu: true, isOpen: openMenus.announcement, submenu: [] },
    { name: 'Security', icon: MdSecurity, hasSubmenu: true, isOpen: openMenus.security, submenu: [] },
    { name: 'Ticket', icon: MdConfirmationNumber, hasSubmenu: true, isOpen: openMenus.ticket, submenu: [] },
  ]

  return (
    <div className="min-h-screen flex" style={{ backgroundColor: '#0F172A' }}>
      {/* Sidebar */}
      <div className="w-[350px] border-r border-gray-600 flex flex-col h-screen sticky top-0 overflow-hidden" style={{ backgroundColor: '#0F172A' }}>
        {/* Header */}
        <div className="p-6 align-center text-start flex-shrink-0">
          <img
            src="/images/ruto-white.png"
            alt="Ruto Logo"
            className="h-6 text-start mx-auto align-start"
          />
          <p className="text-white text-center text-sm mt-2">Administrative Dashboard</p>
        </div>

        {/* Navigation */}
        <nav className="px-4 space-y-2 flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
          {navigation.map((item) => (
            <div key={item.name}>
              {item.hasSubmenu ? (
                <div className="border border-gray-700 rounded-lg overflow-hidden transition-all">
                  <button
                    onClick={() => toggleMenu(item.name.toLowerCase())}
                    className="w-full flex items-center justify-between px-4 py-3 text-sm font-medium transition-colors hover:bg-gray-800 hover:bg-opacity-30 text-white"
                  >
                    <div className="flex items-center">
                      <item.icon className="mr-3 text-lg" />
                      {item.name}
                    </div>
                    {item.isOpen ? <MdExpandMore className="text-white text-lg" /> : <MdChevronRight className="text-white text-lg" />}
                  </button>
                  {item.isOpen && item.submenu && (
                    <div className="space-y-1 pb-2">
                      {item.submenu.map((subItem) => (
                        <Link
                          key={subItem.name}
                          href={subItem.href}
                          className={`block px-4 py-2 mx-2 text-sm rounded-lg transition-colors ${
                            pathname === subItem.href
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
                  href={item.href || '/dashboard'}
                  className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors border ${
                    item.current
                      ? 'text-orange-500 border-orange-500'
                      : 'text-white border-gray-700 hover:bg-gray-800 hover:bg-opacity-30'
                  }`}
                >
                  <item.icon className="mr-3 text-lg" />
                  {item.name}
                </Link>
              )}
            </div>
          ))}
        </nav>

        {/* User Profile Section */}
        <div className="px-4 pb-4 flex-shrink-0">
          <div className="border border-gray-700 rounded-lg px-4 py-3">
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
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1">
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  )
}

export default DashboardLayout
