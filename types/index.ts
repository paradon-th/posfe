export interface User {
    id: string
    name: string
    email: string
    role: 'admin' | 'cashier'
    createdAt: string
    updatedAt: string
}

export interface Product {
    id: string
    name: string
    price: number
    category: string
    image: string
    stock: number
    createdAt?: string
    updatedAt?: string
}

export interface CartItem extends Product {
    quantity: number
}

export interface Order {
    id: string
    items: CartItem[]
    total: number
    date: string
    paymentMethod: string
    customerName?: string
    discount?: number
    cashierId?: string
}

export interface DashboardStats {
    todaySales: number
    monthSales: number
    yearSales: number
    todayOrders: number
    monthOrders: number
    totalProducts: number
    lowStockProducts: number
    topSellingProducts: Array<{
        product: Product
        totalSold: number
        revenue: number
    }>
    salesByCategory: Array<{
        category: string
        total: number
        count: number
    }>
    dailySales: Array<{
        date: string
        sales: number
        orders: number
    }>
    monthlySales: Array<{
        month: string
        sales: number
        orders: number
    }>
}

export interface AppState {
    products: Product[]
    cart: CartItem[]
    orders: Order[]
    activeTab: string
    user: User | null
}