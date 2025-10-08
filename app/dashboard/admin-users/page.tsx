'use client'
import { useState } from 'react'
import StatCard from '@/components/StatCard'

const Page = () => {
  const [activeTab, setActiveTab] = useState('Analytics')

  const tabs = ['Analytics', 'Administrative Users', 'Roles and Permission']

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex justify-between items-start mb-12">
        <div>
          <h1 className="text-2xl font-bold text-white">Administrative Management</h1>
          <p className="text-gray-400 text-sm">
            Monitor administrative users, and configure roles and permissions
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="w-full flex gap-10 pb-1 mb-12 border-b border-white/20 text-white/70">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`relative pb-2 transition-colors duration-300 ${
              activeTab === tab ? 'text-orange-500 font-medium' : 'hover:text-white text-white/70'
            }`}
          >
            {tab}
            {activeTab === tab && (
              <span className="absolute bottom-[-6px] left-0 w-full h-[2px] bg-orange-600 rounded-full"></span>
            )}
          </button>
        ))}
      </div>

      {/* 4 Grid Data Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 ">
        <StatCard title="Total Admins" value="78" subtitle="" />
        <StatCard title="Active (24h)" value="12" subtitle="15% of total" />
        <StatCard title="Actions Taken" value="24" subtitle="Last 24hours" />
        <StatCard title="Total roles" value="78" subtitle="" />
      </div>

      {/* Distribution Section */}
      <div className="grid grid-cols-12 justify-center items-start gap-8">
        <div className="bg-transparent text-white border p-4 border-white/15 col-span-7 rounded-xl backdrop-blur-md bg-black/5">
          <h1 className="text-lg ">Role and User Distribution</h1>
          <p className="text-sm">Visual hierarchy of administrative roles and user assignments</p>

          <div className="mt-12 flex items-center flex-col justify-center">
            <img src="/svg/circle.svg" alt="" className="w-[70%]" />
            <div className="flex items-center text-blue-700 justify-center gap-3 mt-6">
              <span className="bg-blue-700 h-[1px] w-6"></span>
              <p className="text-md font-thin">Tech support</p>
            </div>
          </div>
        </div>

        {/* Live Activity Log */}
        <div className="bg-transparent p-4 border border-white/15 col-span-5 rounded-xl bg-black/5 backdrop-blur-md text-white h-full">
          <h1 className="m-4 text-lg font-medium">Live Activity Log</h1>
          <ul className="list-disc ml-8 list-inside space-y-2 text-sm text-gray-300">
            <li>Alex C. updated 'Fraud Analyst' role. 2m ago from 128.1.1.5</li>
            <li>Sam B. froze app user #84321. 15m ago from 204.15.5.1</li>
            <li>David C. exported Q3 transactions. 48m ago from 128.1.1.8</li>
            <li>Maria G. logged in. 1h ago from 98.12.4.2</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Page
