'use client'

export default function TotalCustomerModal() {
  return (
    <div>
      {/* graph  */}
      <div className="bg-black/5 w-full rounded-xl p-4 overflow-hidden">
        {/* graph header  */}
        <div className="flex justify-between items-center text-white">
          <div className="flex flex-col">
            <h1>Total Customer Growth</h1>
            <p>Cumulative growth of customer over time</p>
          </div>

          {/* tab  */}
          <div className="flex bg-black/15 rounded-xl gap-2 py-2">
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

      {/* Region  */}
      <div className="bg-black/5 w-full rounded-xl p-4 mt-12 text-white/80">
        {/* Heading  */}
        <div className="flex flex-col">
          <h1>Customers By Region</h1>
          <p>Geographic distribution of the customer base</p>
        </div>

        {/* region  */}
        <div className="flex items-start mt-8 gap-10 ">
          <img src="/svg/map.svg" alt="" />
          <div className="flex flex-col items-start  w-full">
            {/* heading  */}
            <h1 className="font-bold mb-2">Top Regions</h1>
            <div className="flex items-center justify-between w-[60%] mb-1">
              <p className="text-md font-thin">North America</p>
              <p className="text-md text-orange-600">18,240</p>
            </div>
            <div className="flex items-center justify-between w-[60%] mb-1">
              <p className="text-md font-thin">Europe</p>
              <p className="text-md text-orange-600">12,240</p>
            </div>
            <div className="flex items-center justify-between w-[60%] mb-1">
              <p className="text-md font-thin">Asia</p>
              <p className="text-md text-orange-600">18,240</p>
            </div>
            <div className="flex items-center justify-between w-[60%] mb-1">
              <p className="text-md font-thin">South America</p>
              <p className="text-md text-orange-600">18,240</p>
            </div>
            <div className="flex items-center justify-between w-[60%] mb-1">
              <p className="text-md font-thin">Australia</p>
              <p className="text-md text-orange-600">18,240</p>
            </div>
            <div className="flex items-center justify-between w-[60%]">
              <p className="text-md font-thin">Africa</p>
              <p className="text-md text-orange-600">18,240</p>
            </div>
          </div>
        </div>
      </div>

      {/* Analytics  */}
      <div className="bg-black/5 w-full rounded-xl p-4 mt-12 text-white/80">
        {/* Heading  */}
        <div className="flex flex-col">
          <h1>Browser Analytics</h1>
          <p>Active user engagement and trends by browser</p>
        </div>

        {/* analytics cards  */}
        <div className="w-full flex items-center justify-between mt-8">
          <div className="rounded-lg bg-black/10 p-3 px-16 flex flex-col items-center justify-center">
            <p className="text-white/55 text-sm">Most Used</p>
            <h1>Google Chrome</h1>
          </div>
          <div className="rounded-lg bg-black/10 p-3 px-16 flex flex-col items-center justify-center">
            <p className="text-white/55 text-sm">Highest Engagement</p>
            <h1>Google Chrome</h1>
          </div>
          <div className="rounded-lg bg-black/10 p-3 px-16 flex flex-col items-center justify-center">
            <p className="text-white/55 text-sm">Fastes Growing (Wow)</p>
            <h1>Google Chrome</h1>
          </div>
        </div>

        {/* analytics row  */}
        <div className="mt-10">
          <div className="w-full  px-8 flex items-center justify-between text-white/80 bg-black/10 rounded-lg p-3">
            <div className="flex gap-12 items-center ml-6 flex-1">
              <h1 className="min-w-[150px]">Google Chrome </h1>
              <div className="flex-1 bg-black/20 rounded-full h-2 max-w-[300px] overflow-hidden">
                <div className="bg-blue-500 h-full rounded-full w-[60%]"></div>
              </div>
            </div>

            <div className="flex flex-col ml-8">
              <p className="text-white text-md"> 985,430 Users</p>
              <p className="text-green-500 text-xs text-right">71.5%</p>
            </div>
          </div>
        </div>
        {/* analytics row  */}
        <div className="mt-5">
          <div className="w-full  px-8 flex items-center justify-between text-white/80 bg-black/10 rounded-lg p-3">
            <div className="flex gap-12 items-center ml-6 flex-1">
              <h1 className="min-w-[150px]">Google Chrome </h1>
              <div className="flex-1 bg-black/20 rounded-full h-2 max-w-[300px] overflow-hidden">
                <div className="bg-blue-500 h-full rounded-full w-[60%]"></div>
              </div>
            </div>

            <div className="flex flex-col ml-8">
              <p className="text-white text-md"> 985,430 Users</p>
              <p className="text-green-500 text-xs text-right">71.5%</p>
            </div>
          </div>
        </div>
        {/* analytics row  */}
        <div className="mt-5">
          <div className="w-full  px-8 flex items-center justify-between text-white/80 bg-black/10 rounded-lg p-3">
            <div className="flex gap-12 items-center ml-6 flex-1">
              <h1 className="min-w-[150px]">Google Chrome </h1>
              <div className="flex-1 bg-black/20 rounded-full h-2 max-w-[300px] overflow-hidden">
                <div className="bg-blue-500 h-full rounded-full w-[60%]"></div>
              </div>
            </div>

            <div className="flex flex-col ml-8">
              <p className="text-white text-md"> 985,430 Users</p>
              <p className="text-green-500 text-xs text-right">71.5%</p>
            </div>
          </div>
        </div>
        {/* analytics row  */}
        <div className="mt-5">
          <div className="w-full  px-8 flex items-center justify-between text-white/80 bg-black/10 rounded-lg p-3">
            <div className="flex gap-12 items-center ml-6 flex-1">
              <h1 className="min-w-[150px]">Google Chrome </h1>
              <div className="flex-1 bg-black/20 rounded-full h-2 max-w-[300px] overflow-hidden">
                <div className="bg-blue-500 h-full rounded-full w-[60%]"></div>
              </div>
            </div>

            <div className="flex flex-col ml-8">
              <p className="text-white text-md"> 985,430 Users</p>
              <p className="text-green-500 text-xs text-right">71.5%</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
