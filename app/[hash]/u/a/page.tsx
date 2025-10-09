'use client'

import { useState } from 'react'
import { PlusIcon, PencilIcon, TrashIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline'

const AdminUserManagement = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedUsers, setSelectedUsers] = useState<string[]>([])

  // Mock admin user data
  const adminUsers = [
    {
      id: '1',
      name: 'John Smith',
      email: 'john.smith@company.com',
      role: 'Super Admin',
      status: 'Active',
      lastLogin: '2024-01-08 10:30 AM',
      permissions: ['Full Access', 'User Management', 'System Config'],
    },
    {
      id: '2',
      name: 'Sarah Johnson',
      email: 'sarah.johnson@company.com',
      role: 'Admin',
      status: 'Active',
      lastLogin: '2024-01-07 2:15 PM',
      permissions: ['User Management', 'Content Management'],
    },
    {
      id: '3',
      name: 'Mike Wilson',
      email: 'mike.wilson@company.com',
      role: 'Moderator',
      status: 'Inactive',
      lastLogin: '2024-01-05 9:45 AM',
      permissions: ['Content Management', 'Report Review'],
    },
  ]

  const handleSelectUser = (userId: string) => {
    setSelectedUsers((prev) =>
      prev.includes(userId) ? prev.filter((id) => id !== userId) : [...prev, userId]
    )
  }

  const handleSelectAll = () => {
    setSelectedUsers(
      selectedUsers.length === adminUsers.length ? [] : adminUsers.map((user) => user.id)
    )
  }

  const filteredUsers = adminUsers.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.role.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-white">Administrative Users</h1>
          <p className="text-gray-400 mt-1">Manage system administrators and their permissions</p>
        </div>
        <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
          <PlusIcon className="w-5 h-5" />
          <span>Add Admin User</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gradient-to-r from-blue-500/10 to-blue-600/10 border border-blue-500/20 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-400 text-sm font-medium">Total Admins</p>
              <p className="text-white text-2xl font-bold mt-1">3</p>
            </div>
            <div className="bg-blue-500/20 p-3 rounded-lg">
              <svg className="w-6 h-6 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-500/10 to-green-600/10 border border-green-500/20 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-400 text-sm font-medium">Active</p>
              <p className="text-white text-2xl font-bold mt-1">2</p>
            </div>
            <div className="bg-green-500/20 p-3 rounded-lg">
              <svg className="w-6 h-6 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-yellow-500/10 to-yellow-600/10 border border-yellow-500/20 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-yellow-400 text-sm font-medium">Inactive</p>
              <p className="text-white text-2xl font-bold mt-1">1</p>
            </div>
            <div className="bg-yellow-500/20 p-3 rounded-lg">
              <svg className="w-6 h-6 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-500/10 to-purple-600/10 border border-purple-500/20 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-400 text-sm font-medium">Super Admins</p>
              <p className="text-white text-2xl font-bold mt-1">1</p>
            </div>
            <div className="bg-purple-500/20 p-3 rounded-lg">
              <svg className="w-6 h-6 text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <MagnifyingGlassIcon className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name, email, or role..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-900 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-orange-500"
            />
          </div>
          <div className="flex space-x-2">
            <select className="px-4 py-2 bg-gray-900 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-orange-500">
              <option>All Roles</option>
              <option>Super Admin</option>
              <option>Admin</option>
              <option>Moderator</option>
            </select>
            <select className="px-4 py-2 bg-gray-900 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-orange-500">
              <option>All Status</option>
              <option>Active</option>
              <option>Inactive</option>
            </select>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-gray-800/50 border border-gray-700 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-900/50">
              <tr>
                <th className="px-6 py-4 text-left">
                  <input
                    type="checkbox"
                    checked={selectedUsers.length === adminUsers.length}
                    onChange={handleSelectAll}
                    className="rounded border-gray-600 text-orange-500 focus:ring-orange-500"
                  />
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Last Login
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Permissions
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-900/30">
                  <td className="px-6 py-4">
                    <input
                      type="checkbox"
                      checked={selectedUsers.includes(user.id)}
                      onChange={() => handleSelectUser(user.id)}
                      className="rounded border-gray-600 text-orange-500 focus:ring-orange-500"
                    />
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <div className="h-10 w-10 rounded-full bg-gradient-to-r from-orange-400 to-orange-600 flex items-center justify-center">
                          <span className="text-white font-medium text-sm">
                            {user.name
                              .split(' ')
                              .map((n) => n[0])
                              .join('')}
                          </span>
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-white">{user.name}</div>
                        <div className="text-sm text-gray-400">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        user.role === 'Super Admin'
                          ? 'bg-purple-100 text-purple-800'
                          : user.role === 'Admin'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-green-100 text-green-800'
                      }`}
                    >
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        user.status === 'Active'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-400">{user.lastLogin}</td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1">
                      {user.permissions.slice(0, 2).map((permission, index) => (
                        <span
                          key={index}
                          className="inline-flex px-2 py-1 text-xs font-medium bg-gray-700 text-gray-300 rounded"
                        >
                          {permission}
                        </span>
                      ))}
                      {user.permissions.length > 2 && (
                        <span className="inline-flex px-2 py-1 text-xs font-medium bg-gray-700 text-gray-300 rounded">
                          +{user.permissions.length - 2}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <button className="text-blue-400 hover:text-blue-300 p-1">
                        <PencilIcon className="w-4 h-4" />
                      </button>
                      <button className="text-red-400 hover:text-red-300 p-1">
                        <TrashIcon className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Bulk Actions */}
      {selectedUsers.length > 0 && (
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-gray-800 border border-gray-600 rounded-lg p-4 shadow-lg">
          <div className="flex items-center space-x-4">
            <span className="text-white text-sm">
              {selectedUsers.length} user{selectedUsers.length > 1 ? 's' : ''} selected
            </span>
            <div className="flex space-x-2">
              <button className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded transition-colors">
                Edit Roles
              </button>
              <button className="px-3 py-1 bg-yellow-600 hover:bg-yellow-700 text-white text-sm rounded transition-colors">
                Change Status
              </button>
              <button className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white text-sm rounded transition-colors">
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminUserManagement
