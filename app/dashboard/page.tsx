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
        </div>
      </div>

      {/* 4 Grid Data Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="p-6 rounded-lg border border-white/15 hover:border-gray-500 transition-colors bg-white/5 backdrop-blur-md">
          <h3 className="text-sm text-gray-400 mb-2">Total Users</h3>
          <p className="text-3xl font-bold text-white mb-1">0</p>
          <p className="text-xs text-gray-500">New user today: 0</p>
        </div>

        <div className="p-6 rounded-lg border border-white/15 hover:border-gray-500 bg-white/5 backdrop-blur-md transition-colors">
          <h3 className="text-sm text-gray-400 mb-2">Total Transaction</h3>
          <p className="text-3xl font-bold text-white mb-1">0</p>
          <p className="text-xs text-gray-500">New transaction today: 0</p>
        </div>

        <div className="p-6 rounded-lg border bg-white/5 backdrop-blur-md border-white/15 hover:border-gray-500 transition-colors">
          <h3 className="text-sm text-gray-400 mb-2">Total Received (blockchain)</h3>
          <p className="text-3xl font-bold text-white mb-1">0</p>
          <p className="text-xs text-gray-500">Received today: 0</p>
        </div>

        <div className="p-6 rounded-lg border bg-white/5 backdrop-blur-md border-white/15 hover:border-gray-500 transition-colors">
          <h3 className="text-sm text-gray-400 mb-2">Total Sent (blockchain)</h3>
          <p className="text-3xl font-bold text-white mb-1">0</p>
          <p className="text-xs text-gray-500">Sent today: 0</p>
        </div>
      </div>

      {/* 8+4 Grid Layout */}
      <div className="grid grid-cols-12 gap-6 ">
        {/* Transaction Graph - 8 columns */}
        <div className="col-span-8 rounded-lg border border-white/15 bg-white/5 backdrop-blur-md">
          <div className="p-6">
            <div className="h-64  rounded border border-white/15 flex items-center justify-center">
              <img
                src="/images/Transactions.png"
                alt="Transaction Graph"
                className="max-h-full max-w-full object-contain"
              />
            </div>
          </div>

          {/* Bottom 2 cards in 4+4 layout */}
          <div className="grid grid-cols-2 gap-4 p-6 pt-0">
            <div className=" p-4 rounded-lg border border-white/15">
              <h4 className="text-sm text-gray-400 mb-1">Transaction</h4>
              <p className="text-2xl font-bold text-white">0</p>
            </div>
            <div className=" p-4 rounded-lg border border-white/15 ">
              <h4 className="text-sm text-gray-400 mb-1">Transferred by LLM</h4>
              <p className="text-2xl font-bold text-white">1,000.00 USDT</p>
            </div>
          </div>
        </div>

        {/* Active Tokens - 4 columns */}
        <div className="col-span-4 rounded-lg border border-white/15 p-6 bg-white/5 backdrop-blur-md">
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
      <div className="rounded-lg border border-white/15">
        <div className="flex justify-between items-center p-4 border-b border-white/15">
          <div className="">
            <h3 className="text-md  text-white/70">Recent Transactions</h3>
            <p className="text-lg  text-white/90 ">Last 20 transactions</p>
          </div>
          <button className="text-white text-md font-medium">Show more</button>
        </div>
        <div className="overflow-x-auto bg-white/3 backdrop-blur-md px-6 flex items-center w-full justify-center">
          <table className="w-full border-separate border-spacing-y-4">
            <thead className=" mt-5">
              <tr>
                <th className="px-6 py-3 text-left text-lg  text-white/75">id</th>
                <th className="px-6 py-3 text-left text-lg  text-white/75">type</th>
                <th className="px-6 py-3 text-left text-lg  text-white/75">asset</th>
                <th className="px-6 py-3 text-left text-lg  text-white/75">amount</th>
                <th className="px-6 py-3 text-left text-lg  text-white/75">gateway</th>
                <th className="px-6 py-3 text-left text-lg  text-white/75">status</th>
                <th className="px-6 py-3 text-left text-lg  text-white/75">time</th>
              </tr>
            </thead>
            <tbody className="">
              {[
                {
                  id: '#983232848477',
                  type: 'send',
                  asset: 'Bitcoin',
                  amount: '0.0075',
                  gateway: 'onchain',
                  status: 'Pending',
                  time: '18/02/2025 XY:XX UTC 5+',
                },
                {
                  id: '#983232848477',
                  type: 'send',
                  asset: 'Bitcoin',
                  amount: '0.0075',
                  gateway: 'onchain',
                  status: 'Pending',
                  time: '18/02/2025 XY:XX UTC 5+',
                },
                {
                  id: '#983232848477',
                  type: 'send',
                  asset: 'Bitcoin',
                  amount: '0.0075',
                  gateway: 'onchain',
                  status: 'pending',
                  time: '18/02/2025 XY:XX UTC 5+',
                },
                {
                  id: '#983232848477',
                  type: 'send',
                  asset: 'Bitcoin',
                  amount: '0.0075',
                  gateway: 'onchain',
                  status: 'pending',
                  time: '18/02/2025 XY:XX UTC 5+',
                },
                {
                  id: '#983232848477',
                  type: 'send',
                  asset: 'Bitcoin',
                  amount: '0.0075',
                  gateway: 'onchain',
                  status: 'pending',
                  time: '18/02/2025 XY:XX UTC 5+',
                },
              ].map((transaction, index) => (
                <tr key={index} className="bg-white/15 mb-2  ">
                  <td className="px-6 py-2 text-sm text-white">{transaction.id}</td>
                  <td className="px-6 py-2 text-sm text-white">{transaction.type}</td>
                  <td className="px-6 py-2 text-sm font-medium text-white">
                    <div className="flex items-center space-x-2">
                      <img
                        src={`/images/nohat_bg_removed_2896e6b4 1.png`}
                        alt={transaction.asset}
                        className="h-5 w-5"
                      />
                      <div className="flex flex-col">
                        <span>{transaction.asset}</span>
                        <span className="text-xs text-gray-400">btcERC20</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-2 text-sm text-white">{transaction.amount}</td>
                  <td className="px-6 py-2 text-sm text-white">{transaction.gateway}</td>
                  <td className="px-6 py-2 text-sm">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        transaction.status === 'Completed'
                          ? ' text-orange-400'
                          : transaction.status === 'Pending'
                            ? 'text-orange-400'
                            : ' text-orange-400'
                      }`}
                    >
                      {transaction.status}
                    </span>
                  </td>
                  <td className="px-6 py-2 text-sm text-gray-400">{transaction.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Final Empty 8+4 Grid Layout */}
      <div className="grid grid-cols-12 gap-6">
        <div className="h-full col-span-8 rounded-xl border border-white/15 overflow-x-auto">
          <div className="w-full p-4 text-white/75 bg-white/3 backdrop-blur-md">
            <p>Security -- Active Support Login</p>
          </div>
          <table className="w-full text-sm text-left">
            <thead className="">
              <tr>
                <th className="px-6 py-3 text-sm font-medium text-gray-300 ">id</th>
                <th className="px-6 py-3 text-sm font-medium text-gray-300 ">roles</th>
                <th className="px-6 py-3 text-sm font-medium text-gray-300 ">username</th>
                <th className="px-6 py-3 text-sm font-medium text-gray-300 ">last login</th>
                <th className="px-6 py-3 text-sm font-medium text-gray-300 ">location</th>
                <th className="px-6 py-3 text-sm font-medium text-gray-300 ">device</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">{/* Empty rows */}</tbody>
          </table>
        </div>

        <div className="col-span-4 rounded-lg border bg-white/3 backdrop-blur-md border-white/15 p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Operational Metrics</h3>

          <div className="grid grid-cols-2 gap-4">
            {/* Metric Box 1 */}
            <div className="rounded-lg border border-white/15 p-4 bg-white/5 backdrop-blur-md bg-opacity-50">
              <h4 className="text-sm font-medium text-gray-300">Backend API RPS</h4>
              <p className="text-2xl font-bold text-white">0</p>
            </div>

            {/* Metric Box 2 */}
            <div className="rounded-lg border border-white/15 p-4 bg-white/5 backdrop-blur-md  bg-opacity-50">
              <h4 className="text-sm font-medium text-gray-300">Wallet API RPS</h4>
              <p className="text-2xl font-bold text-white">0</p>
            </div>

            {/* Metric Box 3 */}
            <div className="rounded-lg border border-white/15 p-4  bg-white/5 backdrop-blur-md  bg-opacity-50">
              <h4 className="text-sm font-medium text-gray-300">Social hook RPS</h4>
              <p className="text-2xl font-bold text-white">0</p>
            </div>

            {/* Metric Box 4 */}
            <div className="rounded-lg border border-white/15 p-4  bg-white/5 backdrop-blur-md  bg-opacity-50">
              <h4 className="text-sm font-medium text-gray-300">LLM Hook RPS</h4>
              <p className="text-2xl font-bold text-white">0</p>
            </div>

            {/* Metric Box 5 */}
            <div className="rounded-lg border border-white/15 p-4  bg-white/5 backdrop-blur-md  bg-opacity-50">
              <h4 className="text-sm font-medium text-gray-300">Ticket (Pending)</h4>
              <p className="text-2xl font-bold text-white">0</p>
            </div>

            {/* Metric Box 6 */}
            <div className="rounded-lg border border-white/15 p-4 bg-white/5 backdrop-blur-md  bg-opacity-50">
              <h4 className="text-sm font-medium text-gray-300">Latency</h4>
              <p className="text-2xl font-bold text-white">0</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Overview
