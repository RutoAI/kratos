const Overview = () => {
  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold text-white">System Overview</h1>
          <p className="text-gray-400 text-sm">Real-time overview</p>
        </div>
        <div className="flex items-center space-x-3">
          <div className="text-right">
            <p className="text-xl font-semibold text-white">0 USDT</p>
            <p className="text-gray-400 text-sm">Reserved money</p>
          </div>
          <button className="px-4 py-2 text-sm bg-transparent border border-gray-50 text-white rounded-lg hover:bg-orange-700 transition-colors">
           Refresh
          </button>
        </div>
      </div>

      {/* 4 Grid Data Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="p-6 rounded-lg border border-gray-600 hover:border-gray-500 transition-colors" style={{ backgroundColor: 'rgba(255, 255, 255, 0.02)' }}>
          <h3 className="text-sm text-gray-400 mb-2">Total Users</h3>
          <p className="text-3xl font-bold text-white mb-1">0</p>
          <p className="text-xs text-gray-500">New user today: 0</p>
        </div>

        <div className="p-6 rounded-lg border border-gray-600 hover:border-gray-500 transition-colors" style={{ backgroundColor: 'rgba(255, 255, 255, 0.02)' }}>
          <h3 className="text-sm text-gray-400 mb-2">Total Transaction</h3>
          <p className="text-3xl font-bold text-white mb-1">0</p>
          <p className="text-xs text-gray-500">New transaction today: 0</p>
        </div>

        <div className="p-6 rounded-lg border border-gray-600 hover:border-gray-500 transition-colors" style={{ backgroundColor: 'rgba(255, 255, 255, 0.02)' }}>
          <h3 className="text-sm text-gray-400 mb-2">Total Received (blockchain)</h3>
          <p className="text-3xl font-bold text-white mb-1">0</p>
          <p className="text-xs text-gray-500">Received today: 0</p>
        </div>

        <div className="p-6 rounded-lg border border-gray-600 hover:border-gray-500 transition-colors" style={{ backgroundColor: 'rgba(255, 255, 255, 0.02)' }}>
          <h3 className="text-sm text-gray-400 mb-2">Total Sent (blockchain)</h3>
          <p className="text-3xl font-bold text-white mb-1">0</p>
          <p className="text-xs text-gray-500">Sent today: 0</p>
        </div>
      </div>

      {/* 8+4 Grid Layout */}
      <div className="grid grid-cols-12 gap-6">
        {/* Transaction Graph - 8 columns */}
        <div className="col-span-8 rounded-lg border border-gray-600" style={{ backgroundColor: 'rgba(255, 255, 255, 0.02)' }}>
          <div className="p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Transaction Graph</h3>
            <div className="h-64 bg-gray-800 rounded border border-gray-700 flex items-center justify-center">
              <span className="text-gray-400">Transaction Chart Placeholder</span>
            </div>
          </div>

          {/* Bottom 2 cards in 4+4 layout */}
          <div className="grid grid-cols-2 gap-4 p-6 pt-0">
            <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
              <h4 className="text-sm text-gray-400 mb-1">Transaction</h4>
              <p className="text-2xl font-bold text-white">0</p>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
              <h4 className="text-sm text-gray-400 mb-1">Transferred by LLM</h4>
              <p className="text-2xl font-bold text-white">1,000.00 USDT</p>
            </div>
          </div>
        </div>

        {/* Active Tokens - 4 columns */}
        <div className="col-span-4 rounded-lg border border-gray-600 p-6" style={{ backgroundColor: 'rgba(255, 255, 255, 0.02)' }}>
          <h3 className="text-lg font-semibold text-white mb-4">Active Tokens</h3>
          <div className="space-y-4">
            {[
              { name: 'Bitcoin (WTBC)', network: 'Ethereum blockchain', status: 'Active', type: 'ERC-20' },
              { name: 'Ethereum (WTBC)', network: 'Ethereum blockchain', status: 'Active', type: 'ERC-20' },
              { name: 'Tether (WTBC)', network: 'Ethereum blockchain', status: 'Active', type: 'ERC-20' },
              { name: 'Binance (WTBC)', network: 'BSC blockchain', status: 'Active', type: 'ERC-20' },
              { name: 'Cardano (WTBC)', network: 'Cardano blockchain', status: 'Active', type: 'ERC-20' },
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
      <div className="rounded-lg border border-gray-600" style={{ backgroundColor: 'rgba(255, 255, 255, 0.02)' }}>
        <div className="flex justify-between items-center p-6 border-b border-gray-600">
          <h3 className="text-lg font-semibold text-white">Transaction Table</h3>
          <button className="text-orange-500 hover:text-orange-400 text-sm font-medium">
            Show more
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-800">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">Asset</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">Gateway</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">Time</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-600">
              {[
                {
                  id: 'TXN001',
                  type: 'Deposit',
                  asset: 'BTC',
                  amount: '0.00512',
                  gateway: 'Blockchain',
                  status: 'Completed',
                  time: '2024-01-15 14:32:21'
                },
                {
                  id: 'TXN002',
                  type: 'Withdrawal',
                  asset: 'ETH',
                  amount: '2.45',
                  gateway: 'Blockchain',
                  status: 'Pending',
                  time: '2024-01-15 13:28:45'
                },
                {
                  id: 'TXN003',
                  type: 'Transfer',
                  asset: 'USDT',
                  amount: '1,250.00',
                  gateway: 'Internal',
                  status: 'Completed',
                  time: '2024-01-15 12:15:33'
                },
                {
                  id: 'TXN004',
                  type: 'Deposit',
                  asset: 'BNB',
                  amount: '15.78',
                  gateway: 'Blockchain',
                  status: 'Failed',
                  time: '2024-01-15 11:42:18'
                },
                {
                  id: 'TXN005',
                  type: 'Withdrawal',
                  asset: 'ADA',
                  amount: '500.00',
                  gateway: 'Blockchain',
                  status: 'Completed',
                  time: '2024-01-15 10:22:07'
                }
              ].map((transaction, index) => (
                <tr key={index} className="hover:bg-gray-800">
                  <td className="px-6 py-4 text-sm text-white">{transaction.id}</td>
                  <td className="px-6 py-4 text-sm text-white">{transaction.type}</td>
                  <td className="px-6 py-4 text-sm font-medium text-white">{transaction.asset}</td>
                  <td className="px-6 py-4 text-sm text-white">{transaction.amount}</td>
                  <td className="px-6 py-4 text-sm text-white">{transaction.gateway}</td>
                  <td className="px-6 py-4 text-sm">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      transaction.status === 'Completed' ? 'bg-green-100 text-green-800' :
                      transaction.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {transaction.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-400">{transaction.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Final Empty 8+4 Grid Layout */}
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-8 rounded-lg border border-gray-600 p-6 h-32" style={{ backgroundColor: 'rgba(255, 255, 255, 0.02)' }}>
          <div className="h-full rounded border-2 border-dashed border-gray-600 flex items-center justify-center">
            <span className="text-gray-400">Empty Section</span>
          </div>
        </div>
        <div className="col-span-4 rounded-lg border border-gray-600 p-6 h-32" style={{ backgroundColor: 'rgba(255, 255, 255, 0.02)' }}>
          <div className="h-full rounded border-2 border-dashed border-gray-600 flex items-center justify-center">
            <span className="text-gray-400">Empty Section</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Overview