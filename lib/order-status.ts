// Status pesanan: PENDING -> PAID -> SHIPPED -> COMPLETED, atau CANCELLED.
export const ORDER_STATUSES = ['PENDING', 'PAID', 'SHIPPED', 'COMPLETED', 'CANCELLED'] as const
export type OrderStatus = (typeof ORDER_STATUSES)[number]

export const orderStatusLabels: Record<OrderStatus, string> = {
  PENDING: 'Menunggu bayar',
  PAID: 'Dibayar',
  SHIPPED: 'Dikirim',
  COMPLETED: 'Selesai',
  CANCELLED: 'Dibatalkan',
}

// Perpindahan status yang boleh dilakukan admin.
export const allowedTransitions: Record<OrderStatus, OrderStatus[]> = {
  PENDING: ['PAID', 'CANCELLED'],
  PAID: ['SHIPPED', 'CANCELLED'],
  SHIPPED: ['COMPLETED'],
  COMPLETED: [],
  CANCELLED: [],
}

export const isOrderStatus = (value: unknown): value is OrderStatus => ORDER_STATUSES.includes(value as OrderStatus)

export const statusLabel = (status: string) => (isOrderStatus(status) ? orderStatusLabels[status] : status)

export const formatDateTime = (value: Date | string) =>
  new Date(value).toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short', timeZone: 'Asia/Jakarta' })
