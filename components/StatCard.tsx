import { StatCardProps } from '@/types'

export default function StatCard({ title, value, subtitle, icon }: StatCardProps) {
  return (
    <div className="p-6 rounded-lg border border-white/15 hover:border-gray-500 transition-colors bg-black/5 backdrop-blur-md">
      <div className="w-full flex justify-between">
        <h3 className="text-sm text-gray-400 mb-2">{title}</h3>
        {icon && <img src={icon} alt="" />}
      </div>
      <p className="text-3xl font-bold text-white mb-1">{value}</p>
      <p className="text-xs text-gray-500">{subtitle}</p>
    </div>
  )
}
