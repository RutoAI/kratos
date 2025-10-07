import { XCircleIcon } from '@heroicons/react/24/outline'
import React from 'react'

const page = () => {
  // Channel data
  const channelData = [
    { channel: 'Referral Program', users: '12,450', percentage: '45.2%' },
    { channel: 'Organic Search', users: '8,320', percentage: '30.5%' },
    { channel: 'Paid Socials (Ads)', users: '4,180', percentage: '15.3%' },
    { channel: 'Direct Traffic', users: '2,450', percentage: '9.0%' },
    { channel: 'Other Campaigns', users: '1,200', percentage: '4.4%' },
  ]

  // User data
  const userData = [
    {
      name: 'John Doe',
      avatar: 'https://i.pravatar.cc/150?img=1',
      email: 'john.doe@example.com',
      registrationDate: 'Jan 15, 2025',
      source: 'Referral',
      status: 'Active',
    },
    {
      name: 'Jane Smith',
      avatar: 'https://i.pravatar.cc/150?img=5',
      email: 'jane.smith@example.com',
      registrationDate: 'Jan 14, 2025',
      source: 'Referral',
      status: 'Active',
    },
  ]

  return (
    <div>
      <div className="w-full flex justify-end items-end my-8">
        <XCircleIcon className="text-white text-2xl h-10 " />
      </div>

      {/* graph  */}
      <div className="bg-white/5 w-full rounded-xl p-4 overflow-hidden">
        {/* graph header  */}
        <div className="flex justify-between items-center text-white">
          <div className="flex flex-col">
            <h1>Total Customer Growth</h1>
            <p>Cumulative growth of customer over time</p>
          </div>

          {/* tab  */}
          <div className="flex bg-white/15 rounded-xl gap-2 py-2">
            <span className="p-2 px-5 rounded-xl text-sm">Daily</span>
            <span className="p-2 px-5 rounded-xl text-sm">Weekly</span>
            <span className="p-2 px-5 rounded-xl text-white text-sm bg-orange-500 ">Monthly</span>
            <span className="p-2 px-5 rounded-xl text-sm">Yearly</span>
          </div>
        </div>

        {/* graph line  */}
        <div className="my-8 mt-12 relative">
          <img src="/svg/body.svg" alt="" />
          <img src="/svg/lines.svg" className="absolute top-0 ml-12" alt="" />
        </div>
      </div>

      {/* active grid  */}
      <div className="mt-12  flex gap-8  text-white/80  w-full">
              <div className=" bg-white/5   p-4 text-white/80 rounded-xl w-1/2">
                  {/* heading  */}
                  <h1>Active vs. Total Users</h1>
                  <p className="text-sm font-thin">Today</p>

                  <div className="flex items-center justify-center mb-6">
                      <img src="/svg/pie.svg" alt="" />
                  </div>

                  <div className="flex items-center justify-evenly">
                      <div className="flex items-center gap-2">
                          <span className="w-4 h-4 rounded-full bg-orange-500"></span>
                          <p>Active Users</p>
                      </div>
                      <div className="flex items-center gap-2">
                          <span className="w-4 h-4 items-center rounded-full bg-purple-500"></span>
                          <p>inactive Users</p>
                      </div>
                  </div>
              </div>
              <div className=" bg-white/5   p-4 text-white/80 rounded-xl w-1/2">
                  {/* heading  */}
                  <h1 className='text-lg mb-6'>Regional Activity</h1>

                  <div className="flex justify-between gap-4 pr-10">
                      <div className="">
                          <p className='text-white/45 mb-6'>Top 5 Regions by Active Users</p>

                          <ul>
                              <li className='flex justify-between items-center'>
                                  <p>North America </p>
                                  <p>450,000</p>
                              </li>
                              <li className='flex justify-between items-center'>
                                  <p>North America </p>
                                  <p>450,000</p>
                              </li>
                              <li className='flex justify-between items-center'>
                                  <p>North America </p>
                                  <p>450,000</p>
                              </li>
                              <li className='flex justify-between items-center'>
                                  <p>North America </p>
                                  <p>450,000</p>
                              </li>
                          </ul>
                      </div>
                      <div className="">
                          <p className='text-white/45 mb-6'>Top 5 Regions by Active Users</p>

                          <ul>
                              <li className='flex justify-between items-center'>
                                  <p>North America </p>
                                  <p>450,000</p>
                              </li>
                              <li className='flex justify-between items-center'>
                                  <p>North America </p>
                                  <p>450,000</p>
                              </li>
                              <li className='flex justify-between items-center'>
                                  <p>North America </p>
                                  <p>450,000</p>
                              </li>
                              <li className='flex justify-between items-center'>
                                  <p>North America </p>
                                  <p>450,000</p>
                              </li>
                          </ul>
                      </div>

                      
                  </div>
              </div>
      </div>

      <div className="mt-12 rounded-xl w-full p-4 bg-white/5 text-white/80">
        {/* heading  */}
        <h1 className="font-bold mb-6">Recent Registrations</h1>

        {/* User table  */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-white/10">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium text-white/80">USER</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-white/80">EMAIL</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-white/80">
                  REGISTRATION DATE
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-white/80">SOURCE</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-white/80">STATUS</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-white/80"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {userData.map((user, index) => (
                <tr key={index} className="hover:bg-white/5">
                  <td className="px-6 py-4 text-sm text-white">
                    <div className="flex items-center gap-3">
                      <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full" />
                      <span>{user.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-white">{user.email}</td>
                  <td className="px-6 py-4 text-sm text-white">{user.registrationDate}</td>
                  <td className="px-6 py-4 text-sm text-orange-500">{user.source}</td>
                  <td className="px-6 py-4 text-sm">
                    <span
                      className={`px-3 py-1 rounded-full text-xs ${
                        user.status === 'Active'
                          ? 'bg-green-500/20 text-green-500'
                          : 'bg-yellow-500/20 text-yellow-500'
                      }`}
                    >
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <button className="text-orange-500 hover:text-orange-400 transition-colors">
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default page
