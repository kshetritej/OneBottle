import { useEffect, useState } from 'react'
import { Minus, Plus, ShoppingCart, Trash2 } from 'lucide-react'
import { Button } from "../../../components/ui/button"
import { useNavigate } from '@tanstack/react-router'

export interface CartItem {
    productId: string
    name: string
    price: number
    quantity: number
    imageUrl: string
}

export function Cart() {
    const navigate = useNavigate();
    const savedCart = localStorage.getItem("cart")
    const [cartItems, setCartItems] = useState<CartItem[]>(() => {
        savedCart
        return savedCart ? JSON.parse(savedCart) : []
    })

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cartItems))
    }, [cartItems])

    const updateQuantity = (productId: string, newQuantity: number) => {
        if (newQuantity < 1) return
        setCartItems(prevItems =>
            prevItems.map(item =>
                item.productId === productId ? { ...item, quantity: newQuantity } : item
            )
        )
    }

    const removeItem = (productId: string) => {
        setCartItems(prevItems => prevItems.filter(item => item.productId !== productId))
    }

    const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0)

    return (
        <div className="container mx-auto p-4 max-w-3xl">
            <h1 className="text-2xl font-bold mb-6">Your Cart</h1>
            {cartItems.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <>
                    {cartItems.map(item => (
                        <div key={item.productId} className="flex items-center justify-between border-b py-4">
                            <div className="flex items-center space-x-4">
                                <img
                                    src={item.imageUrl}
                                    alt={item.name}
                                    width={100}
                                    height={100}
                                    className="rounded-md"
                                />
                                <div>
                                    <h2 className="font-semibold">{item.name}</h2>
                                    <p className="text-gray-600">${(item.price / 100).toFixed(2)}</p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-2">
                                <div className="flex items-center border rounded-md">
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                                    >
                                        <Minus className="h-4 w-4" />
                                    </Button>
                                    <span className="mx-2 w-8 text-center">{item.quantity}</span>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                                    >
                                        <Plus className="h-4 w-4" />
                                    </Button>
                                </div>
                                <Button
                                    variant="destructive"
                                    size="icon"
                                    onClick={() => removeItem(item.productId)}
                                >
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    ))}
                    <div className="mt-6 flex justify-between items-center">
                        <h3 className="text-xl font-semibold">Total:</h3>
                        <p className="text-xl">${(totalPrice / 100).toFixed(2)}</p>
                    </div>
                    <Button className="w-full mt-6" size="lg" onClick={() => {
                        console.log(cartItems)
                        navigate({
                            to: "/checkout",
                            replace: true,
                        })
                    }} >
                        <ShoppingCart className="mr-2 h-5 w-5" /> Proceed to Checkout
                    </Button>
                </>
            )}
        </div>
    )
}