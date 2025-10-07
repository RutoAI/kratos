export interface Transaction {
  id: string
  type: string
  asset: string
  amount: string
  gateway: string
  status: string
  time: string
}

export interface TransactionTableProps {
  transactions: Transaction[]
  title?: string
  subtitle?: string
  showMoreButton?: boolean
}

export interface StatCardProps {
  title: string
  value: string | number
  subtitle: string
  icon?: string
}
