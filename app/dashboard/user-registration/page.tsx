import { XCircleIcon } from '@heroicons/react/24/outline'
import React from 'react'

const page = () => {
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

      <div className="mt-12 bg-white/5 p-4 text-white/80 rounded-xl w-full">
        {/* heading  */}
        <h1 className="font-bold">User Acquisition Channel</h1>
        <p className="text-sm font-thin">user source</p>

        {/* channel section  */}
        <div className="flex gap-4 w-full mt-10">
          <div className="flex flex-col items-center justify-center w-[25%]">
            <img src="/svg/pie.svg" alt="" className="mb-3" />
            <p className="text-sm">Referral</p>
            <p className="text-sm">Organic</p>
            <p className="text-sm">Google</p>
          </div>
          {/* Table  */}
          <div className=" flex-1">
            <table className="w-full">
              <thead className="border-b ">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-medium text-white/80">CHANNEL</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-white/80">USERS</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-white/80">
                    PERCENTAGE
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                <tr className="hover:bg-white/5">
                  <td className="px-6 py-4 text-sm text-white">Referral Program</td>
                  <td className="px-6 py-4 text-sm text-orange-500">12,450</td>
                  <td className="px-6 py-4 text-sm text-white">45.2%</td>
                </tr>
                <tr className="hover:bg-white/5">
                  <td className="px-6 py-4 text-sm text-white">Organic Search</td>
                  <td className="px-6 py-4 text-sm text-orange-500">8,320</td>
                  <td className="px-6 py-4 text-sm text-white">30.5%</td>
                </tr>
                <tr className="hover:bg-white/5">
                  <td className="px-6 py-4 text-sm text-white">Paid Socials (Ads)</td>
                  <td className="px-6 py-4 text-sm text-orange-500">4,180</td>
                  <td className="px-6 py-4 text-sm text-white">15.3%</td>
                </tr>
                <tr className="hover:bg-white/5">
                  <td className="px-6 py-4 text-sm text-white">Direct Traffic</td>
                  <td className="px-6 py-4 text-sm text-orange-500">2,450</td>
                  <td className="px-6 py-4 text-sm text-white">9.0%</td>
                </tr>
                <tr className="hover:bg-white/5">
                  <td className="px-6 py-4 text-sm text-white">Other Campaigns</td>
                  <td className="px-6 py-4 text-sm text-orange-500">1,200</td>
                  <td className="px-6 py-4 text-sm text-white">4.4%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default page
