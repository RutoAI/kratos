import StatCard from '@/components/StatCard'

const Page = () => {
 

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex justify-between items-start mb-12">
        <div>
          <h1 className="text-2xl font-bold text-white">Administrative Management</h1>
          <p className="text-gray-400 text-sm">Monitor administrative users, and configure roles and permissions</p>
        </div>
        
      </div>

          {/* tab  */}
          <div className="w-full gap-10 pb-3 mb-12 border-b flex text-white/70 border-white/20">
              <span className='text-orange-500 '>Analytics</span>
              <span>Administrative Users</span>
              <span>Roles and Permission</span>
          </div>

      {/* 4 Grid Data Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 ">
        <StatCard
          title="Total Admins"
          value="78"
          subtitle=""
        />
        <StatCard
          title="Active (24h)"
          value="12"
          subtitle="15% of total"
        />
        <StatCard
          title="Actions Taken"
          value="24"
          subtitle="Last 24hours"
        />
        <StatCard
          title="Total roles"
          value="78"
          subtitle=""
        />
      </div>

    </div>
  )
}

export default Page
