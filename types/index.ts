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
    id: number
    items: CartItem[]
    total: number
    date: string
    paymentMethod: string
}

export interface DashboardStats {
    todaySales: number
    todayOrders: number
    monthSales: number
    monthOrders: number
    yearSales: number
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
        date: string
        sales: number
        orders: number
    }>
}
export interface AppState {
    products: Product[]
    cart: CartItem[]
    orders: Order[]
    activaTab: string
}
