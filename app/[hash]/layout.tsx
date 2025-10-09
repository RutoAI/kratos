'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname, useParams } from 'next/navigation'
import {
  Squares2X2Icon,
  UsersIcon,
  CurrencyDollarIcon,
  PaintBrushIcon,
  MegaphoneIcon,
  ShieldCheckIcon,
  TicketIcon,
  ChevronDownIcon,
} from '@heroicons/react/24/outline'

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname()
  const params = useParams()
  const hash = params.hash as string
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({})

  // Check if current route is login (just hash, no additional path)
  const isLoginRoute = /^\/[a-f0-9]{8}$/.test(pathname)

  // If it's login route, render without dashboard layout
  if (isLoginRoute) {
    return <>{children}</>
  }

  const toggleMenu = (menuName: string) => {
    setOpenMenus((prev) => ({ ...prev, [menuName]: !prev[menuName] }))
  }

  const navigation = [
    {
      name: 'Overview',
      href: `/${hash}/o`,
      icon: Squares2X2Icon,
      current: pathname === `/${hash}/o`,
    },
    {
      name: 'Users',
      icon: UsersIcon,
      hasSubmenu: true,
      isOpen: openMenus.users,
      submenu: [
        { name: 'Overview', href: `/${hash}/u/o` },
        { name: 'Manage General Users', href: `/${hash}/u/g` },
        { name: 'Manage Administrative User', href: `/${hash}/u/a` },
        { name: 'Manage Roles', href: `/${hash}/u/r` },
        { name: 'Inspect User Activity', href: `/${hash}/u/activity` },
      ],
    },
    {
      name: 'Finance',
      icon: CurrencyDollarIcon,
      hasSubmenu: true,
      isOpen: openMenus.finance,
      submenu: [],
    },
    {
      name: 'Appearance',
      icon: PaintBrushIcon,
      hasSubmenu: true,
      isOpen: openMenus.appearance,
      submenu: [],
    },
    {
      name: 'Announcement',
      icon: MegaphoneIcon,
      hasSubmenu: true,
      isOpen: openMenus.announcement,
      submenu: [],
    },
    {
      name: 'Security',
      icon: ShieldCheckIcon,
      hasSubmenu: true,
      isOpen: openMenus.security,
      submenu: [],
    },
    { name: 'Ticket', icon: TicketIcon, hasSubmenu: true, isOpen: openMenus.ticket, submenu: [] },
  ]

  // Auto-open menu if a submenu item is active
  useEffect(() => {
    navigation.forEach((item) => {
      if (item.hasSubmenu && item.submenu) {
        const hasActiveSubmenu = item.submenu.some((subItem) => subItem.href === pathname)
        if (hasActiveSubmenu) {
          setOpenMenus((prev) => ({ ...prev, [item.name.toLowerCase()]: true }))
        }
      }
    })
  }, [pathname])

  return (
    <div className="min-h-screen flex bg-gradient-to-tr from-[#171A21] to-[#0E0D19]">
      {/* Sidebar */}
      <div
        className="w-[320px] flex flex-col h-screen sticky top-0 overflow-hidden"
        style={{
          background:
            'linear-gradient(180deg, #0D0E16 0%, #151621 29.29%, #151621 66.21%, #0D0E16 100%)',
        }}
      >
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
                <div className="border border-white/15 rounded-lg overflow-hidden">
                  <button
                    onClick={() => toggleMenu(item.name.toLowerCase())}
                    className="w-full flex items-center justify-between px-4 py-3 text-sm font-medium transition-colors hover:bg-black/12  cursor-pointer hover:bg-opacity-30 text-white"
                  >
                    <div className="flex items-center">
                      <item.icon className="w-5 h-5 mr-3" />
                      {item.name}
                    </div>
                    <ChevronDownIcon
                      className={`w-5 h-5 text-white transition-transform duration-300 ${item.isOpen ? 'rotate-180' : 'rotate-0'}`}
                    />
                  </button>
                  <div
                    className={`transition-all duration-300 ease-in-out ${item.isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
                  >
                    <div className="space-y-1 pb-2">
                      {item.submenu?.map((subItem) => (
                        <Link
                          key={subItem.name}
                          href={subItem.href}
                          className={`block px-4 py-2 mx-2 text-sm rounded-lg transition-colors ${
                            pathname === subItem.href
                              ? 'text-orange-500'
                              : 'text-gray-300 hover:text-white hover:bg-black/15 backdrop-blur-sm hover:bg-opacity-30'
                          }`}
                        >
                          {subItem.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <Link
                  href={item.href || `/${hash}/o`}
                  className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors border ${
                    item.current
                      ? 'text-orange-500 border-orange-500'
                      : 'text-white border-white/15 hover:bg-gray-800 hover:bg-opacity-30'
                  }`}
                >
                  <item.icon className="w-5 h-5 mr-3" />
                  {item.name}
                </Link>
              )}
            </div>
          ))}
        </nav>

        {/* User Profile Section */}
        <div className="px-4 pb-4 flex-shrink-0">
          <div className="border border-white/15 rounded-lg px-8 py-4">
            <div className="text-center">
              <div
                className="w-16 h-16 rounded-full mx-auto mb-3"
                style={{ backgroundColor: '#FFB3D9' }}
              ></div>
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
              <button className=" inline-flex px-6 rounded-6xl gap-2 items-center justify-center  py-2 text-orange-500 border border-white/15 rounded-lg cursor-pointer transition-colors text-sm font-medium">
                Logout
                <span>
                  <img src="/svg/logout.svg" alt="" />
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1">
        <main className="p-6">{children}</main>
      </div>
    </div>
  )
}

export default DashboardLayout
