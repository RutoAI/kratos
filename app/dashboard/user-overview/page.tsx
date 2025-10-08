'use client'

import { useState } from 'react'
import StatCard from '@/components/StatCard'
import TransactionTable from '@/components/TransactionTable'
import { Transaction } from '@/types'
import Modal from '@/components/modals/Modal'
import TotalCustomerModal from '@/components/modals/TotalCustomerModal'
import UserRegistrationModal from '@/components/modals/UserRegistrationModal'
import DailyUsersModal from '@/components/modals/DailyUsersModal'

const Page = () => {
  const [openModal, setOpenModal] = useState<string | null>(null)
  const transactions: Transaction[] = [
    {
      id: 'TXN001',
      type: 'Send',
      asset: 'Bitcoin',
      amount: '0.0075',
      gateway: 'onchain',
      status: 'Pending',
      time: '18/02/2025 XY:XX UTC 5+',
    },
    {
      id: 'TXN002',
      type: 'Send',
      asset: 'Bitcoin',
      amount: '0.0075',
      gateway: 'onchain',
      status: 'Pending',
      time: '18/02/2025 XY:XX UTC 5+',
    },
    {
      id: 'TXN003',
      type: 'Send',
      asset: 'Bitcoin',
      amount: '0.0075',
      gateway: 'onchain',
      status: 'pending',
      time: '18/02/2025 XY:XX UTC 5+',
    },
    {
      id: 'TXN004',
      type: 'Send',
      asset: 'Bitcoin',
      amount: '0.0075',
      gateway: 'onchain',
      status: 'pending',
      time: '18/02/2025 XY:XX UTC 5+',
    },
    {
      id: 'TXN005',
      type: 'Send',
      asset: 'Bitcoin',
      amount: '0.0075',
      gateway: 'onchain',
      status: 'pending',
      time: '18/02/2025 XY:XX UTC 5+',
    },
  ]

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold text-white">Overview - Users</h1>
          <p className="text-gray-400 text-sm">Real-time analytics</p>
        </div>
        <div className="flex items-center space-x-3"></div>
      </div>

      {/* 4 Grid Data Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div onClick={() => setOpenModal('totalCustomer')} className="cursor-pointer">
          <StatCard
            title="Total Customers"
            value="12,040"
            subtitle="+ 6.5% Since last week"
            icon="/svg/block.svg"
          />
        </div>

        <div
          onClick={() => setOpenModal('userRegistration')}
          className="p-3 rounded-lg border border-white/15 hover:border-gray-500 transition-colors bg-black/5 backdrop-blur-md cursor-pointer"
        >
          <div className="w-full flex justify-between">
            <h3 className="text-sm text-gray-400 mb-2">User Registration Trend</h3>
            <img src="/svg/block.svg" alt="" />
          </div>
          <img src="/svg/chart.svg" alt="" />
        </div>

        <div onClick={() => setOpenModal('dailyUsers')} className="cursor-pointer">
          <StatCard
            title="Daily Active Users"
            value="89,432"
            subtitle="+ 8.2% from"
            icon="/svg/block.svg"
          />
        </div>

        <StatCard
          title="Total Adminsitrative Users"
          value="178"
          subtitle="Currently Active: 20"
          icon="/svg/block.svg"
        />
      </div>

      {/* 8+4 Grid Layout */}
      <div className="grid grid-cols-12 gap-6">
        {/* Transaction Graph - 8 columns */}
        <div className="col-span-8 rounded-lg border border-white/15 bg-black/5 backdrop-blur-md">
          <div className="p-6">
            <div className="h-64 rounded border border-white/15 flex items-center justify-center">
              <img
                src="/images/Transactions.png"
                alt="Transaction Graph"
                className="max-h-full max-w-full object-contain"
              />
            </div>
          </div>

          {/* Bottom 2 cards in 4+4 layout */}
          <div className="grid grid-cols-2 gap-4 p-6 pt-0">
            <div className="p-4 rounded-lg border border-white/15">
              <h4 className="text-sm text-gray-400 mb-1">Transaction</h4>
              <p className="text-2xl font-bold text-white">0</p>
            </div>
            <div className="p-4 rounded-lg border border-white/15">
              <h4 className="text-sm text-gray-400 mb-1">Transferred by LLM</h4>
              <p className="text-2xl font-bold text-white">1,000.00 USDT</p>
            </div>
          </div>
        </div>

        {/* Active Tokens - 4 columns */}
        <div className="col-span-4 rounded-lg border border-white/15 p-6 bg-black/5 backdrop-blur-md">
          <h3 className="text-lg font-semibold text-white mb-4">Active Tokens</h3>
          <div className="space-y-4">
            {[
              {
                name: 'Bitcoin (WTBC)',
                network: 'Ethereum blockchain',
                status: 'Active',
                type: 'ERC-20',
              },
              {
                name: 'Ethereum (WTBC)',
                network: 'Ethereum blockchain',
                status: 'Active',
                type: 'ERC-20',
              },
              {
                name: 'Tether (WTBC)',
                network: 'Ethereum blockchain',
                status: 'Active',
                type: 'ERC-20',
              },
              {
                name: 'Binance (WTBC)',
                network: 'BSC blockchain',
                status: 'Active',
                type: 'ERC-20',
              },
              {
                name: 'Cardano (WTBC)',
                network: 'Cardano blockchain',
                status: 'Active',
                type: 'ERC-20',
              },
            ].map((token, index) => (
              <div key={index} className="flex justify-between items-center py-2">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                    <img src="/images/nohat_bg_removed_2896e6b4 1.png" alt="" className="text-sm" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">{token.name}</p>
                    <p className="text-xs text-gray-400">{token.network}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-white">{token.status}</p>
                  <p className="text-xs text-gray-400">{token.type}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Transaction Table */}
      <TransactionTable transactions={transactions} />

      {/* Final Empty 8+4 Grid Layout */}
      <div className="grid grid-cols-12 gap-6">
        <div className="h-full col-span-8 rounded-xl border border-white/15 overflow-x-auto">
          <div className="w-full p-4 text-white/75 bg-black/3 backdrop-blur-md">
            <p>Security -- Active Support Login</p>
          </div>
          <table className="w-full text-sm text-left">
            <thead className="">
              <tr>
                <th className="px-6 py-3 text-sm font-medium text-gray-300">id</th>
                <th className="px-6 py-3 text-sm font-medium text-gray-300">roles</th>
                <th className="px-6 py-3 text-sm font-medium text-gray-300">username</th>
                <th className="px-6 py-3 text-sm font-medium text-gray-300">last login</th>
                <th className="px-6 py-3 text-sm font-medium text-gray-300">location</th>
                <th className="px-6 py-3 text-sm font-medium text-gray-300">device</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">{/* Empty rows */}</tbody>
          </table>
        </div>

        <div className="col-span-4 rounded-lg border bg-black/3 backdrop-blur-md border-white/15 p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Operational Metrics</h3>

          <div className="grid grid-cols-2 gap-4">
            {/* Metric Box 1 */}
            <div className="rounded-lg border border-white/15 p-4 bg-black/5 backdrop-blur-md bg-opacity-50">
              <h4 className="text-sm font-medium text-gray-300">Backend API RPS</h4>
              <p className="text-2xl font-bold text-white">0</p>
            </div>

            {/* Metric Box 2 */}
            <div className="rounded-lg border border-white/15 p-4 bg-black/5 backdrop-blur-md bg-opacity-50">
              <h4 className="text-sm font-medium text-gray-300">Wallet API RPS</h4>
              <p className="text-2xl font-bold text-white">0</p>
            </div>

            {/* Metric Box 3 */}
            <div className="rounded-lg border border-white/15 p-4 bg-black/5 backdrop-blur-md bg-opacity-50">
              <h4 className="text-sm font-medium text-gray-300">Social hook RPS</h4>
              <p className="text-2xl font-bold text-white">0</p>
            </div>

            {/* Metric Box 4 */}
            <div className="rounded-lg border border-white/15 p-4 bg-black/5 backdrop-blur-md bg-opacity-50">
              <h4 className="text-sm font-medium text-gray-300">LLM Hook RPS</h4>
              <p className="text-2xl font-bold text-white">0</p>
            </div>

            {/* Metric Box 5 */}
            <div className="rounded-lg border border-white/15 p-4 bg-black/5 backdrop-blur-md bg-opacity-50">
              <h4 className="text-sm font-medium text-gray-300">Ticket (Pending)</h4>
              <p className="text-2xl font-bold text-white">0</p>
            </div>

            {/* Metric Box 6 */}
            <div className="rounded-lg border border-white/15 p-4 bg-black/5 backdrop-blur-md bg-opacity-50">
              <h4 className="text-sm font-medium text-gray-300">Latency</h4>
              <p className="text-2xl font-bold text-white">0</p>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <Modal isOpen={openModal === 'totalCustomer'} onClose={() => setOpenModal(null)}>
        <TotalCustomerModal />
      </Modal>

      <Modal isOpen={openModal === 'userRegistration'} onClose={() => setOpenModal(null)}>
        <UserRegistrationModal />
      </Modal>

      <Modal isOpen={openModal === 'dailyUsers'} onClose={() => setOpenModal(null)}>
        <DailyUsersModal />
      </Modal>
    </div>
  )
}

export default Page
