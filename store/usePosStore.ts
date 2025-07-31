import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Product, CartItem, Order, AppState } from '@/types'

interface PosState extends AppState {
    // Actions
    addToCart: (product: Product) => void
    updateCartQuantity: (productId: string, change: number) => void
    removeFromCart: (productId: string) => void
    clearCart: () => void
    checkout: (paymentMethod: string, customerName?: string, discount?: number) => Order | null
    addProduct: (productData: Omit<Product, "id" | "createdAt" | "updatedAt">) => void
    updateProduct: (id: string, updates: Partial<Product>) => void
    deleteProduct: (id: string) => void
    setActiveTab: (tab: string) => void

    // Computed
    getTotalAmount: () => number
}

export const usePosStore = create<PosState>()(
    persist(
        (set, get) => ({
            products: [],
            cart: [],
            orders: [],
            activeTab: 'pos',
            user: null,

            addToCart: (product: Product) => {
                const { cart, products } = get()
                const existingItem = cart.find((item) => item.id === product.id)

                if (existingItem) {
                    if (existingItem.quantity < product.stock) {
                        set({
                            cart: cart.map((item) =>
                                item.id === product.id
                                    ? { ...item, quantity: item.quantity + 1 }
                                    : item
                            ),
                        })
                    }
                } else {
                    if (product.stock > 0) {
                        set({
                            cart: [...cart, { ...product, quantity: 1 }],
                        })
                    }
                }
            },

            updateCartQuantity: (productId: string, change: number) => {
                const { cart, products } = get()
                const product = products.find((p) => p.id === productId)
                if (!product) return

                set({
                    cart: cart
                        .map((item) => {
                            if (item.id === productId) {
                                const newQuantity = item.quantity + change
                                if (newQuantity <= 0) return null
                                if (newQuantity > product.stock) return item
                                return { ...item, quantity: newQuantity }
                            }
                            return item
                        })
                        .filter(Boolean) as CartItem[],
                })
            },

            removeFromCart: (productId: string) => {
                const { cart } = get()
                set({
                    cart: cart.filter((item) => item.id !== productId),
                })
            },

            clearCart: () => {
                set({ cart: [] })
            },

            checkout: (paymentMethod: string, customerName?: string, discount?: number) => {
                const { cart, orders } = get()
                if (cart.length === 0) return null

                const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
                const finalTotal = discount ? total - discount : total

                const newOrder: Order = {
                    id: Date.now().toString(),
                    items: [...cart],
                    total: finalTotal,
                    date: new Date().toISOString(),
                    paymentMethod,
                    customerName,
                    discount,
                }

                set({
                    orders: [newOrder, ...orders],
                    cart: [],
                })

                return newOrder
            },

            addProduct: (productData: Omit<Product, "id" | "createdAt" | "updatedAt">) => {
                const { products } = get()
                const newProduct: Product = {
                    ...productData,
                    id: Date.now().toString(),
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString(),
                }

                set({
                    products: [...products, newProduct],
                })
            },

            updateProduct: (id: string, updates: Partial<Product>) => {
                const { products } = get()
                set({
                    products: products.map((p) =>
                        p.id === id
                            ? { ...p, ...updates, updatedAt: new Date().toISOString() }
                            : p
                    ),
                })
            },

            deleteProduct: (id: string) => {
                const { products } = get()
                set({
                    products: products.filter((p) => p.id !== id),
                })
            },

            setActiveTab: (tab: string) => {
                set({ activeTab: tab })
            },

            getTotalAmount: () => {
                const { cart } = get()
                return cart.reduce((total, item) => total + item.price * item.quantity, 0)
            },
        }),
        {
            name: 'pos-storage',
        }
    )
)