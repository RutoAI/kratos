import { TransactionTableProps } from '@/types'

export default function TransactionTable({
  transactions,
  title = 'Recent Transactions',
  subtitle = 'Last 20 transactions',
  showMoreButton = true,
}: TransactionTableProps) {
  return (
    <div className="rounded-lg border border-white/15">
      <div className="flex justify-between items-center p-4 border-b border-white/15">
        <div className="">
          <h3 className="text-md  text-white/70">{title}</h3>
          <p className="text-lg  text-white/90 ">{subtitle}</p>
        </div>
        {showMoreButton && <button className="text-white text-md font-medium">Show more</button>}
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
            {transactions.map((transaction, index) => (
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
  )
}
