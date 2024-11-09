import { useState, useMemo } from "react"

import { Button } from "../../../components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../../../components/ui/card"
import { Checkbox } from "../../../components/ui/checkbox"
import { Input } from "../../../components/ui/input"
import { Separator } from "../../../components/ui/separator"
import { Minus, Plus, ShoppingCart, Trash2, Save } from "lucide-react"

type CartItem = {
    id: number
    name: string
    price: number
    quantity: number
    image: string
    selected: boolean
}

export function Cart() {
    const [cartItems, setCartItems] = useState<CartItem[]>([
        {
            id: 1,
            name: "Manang Valley Premium Sweet White",
            price: 1025,
            quantity: 1,
            image: "/placeholder.svg?height=100&width=100",
            selected: false,
        },
        {
            id: 2,
            name: "New Beer In Town",
            price: 500,
            quantity: 1,
            image: "/placeholder.svg?height=100&width=100",
            selected: false,
        },
    ])

    const updateQuantity = (id: number, newQuantity: number) => {
        setCartItems(
            cartItems.map((item) =>
                item.id === id ? { ...item, quantity: Math.max(1, newQuantity) } : item
            )
        )
    }

    const removeItem = (id: number) => {
        setCartItems(cartItems.filter((item) => item.id !== id))
    }

    const toggleItemSelection = (id: number) => {
        setCartItems(
            cartItems.map((item) =>
                item.id === id ? { ...item, selected: !item.selected } : item
            )
        )
    }

    const selectedItems = useMemo(() => {
        const explicitlySelected = cartItems.filter((item) => item.selected)
        return explicitlySelected.length > 0 ? explicitlySelected : cartItems
    }, [cartItems])

    const subtotal = selectedItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
    const shipping = selectedItems.length > 0 ? 15 : 0
    const tax = subtotal * 0.1
    const total = subtotal + shipping + tax

    const saveCart = () => {
        // Here you would implement the logic to save the selected items to the database
        console.log("Saving selected items to database:", selectedItems)
    }

    const proceedToCheckout = () => {
        // Here you would implement the logic to save the selected items to the database
        // and then redirect to the checkout page
        console.log("Proceeding to checkout with selected items:", selectedItems)
    }

    return (
        <div className="min-h-screen bg-background p-6">
            <div className="mx-auto max-w-6xl space-y-8">
                <div className="space-y-2">
                    <h1 className="text-3xl font-bold">Shopping Cart</h1>
                    <p className="text-muted-foreground">Review and update your cart before checkout</p>
                </div>
                <div className="grid gap-8 lg:grid-cols-[1fr_400px]">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <ShoppingCart className="h-5 w-5" />
                                Cart Items
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            {cartItems.map((item) => (
                                <div key={item.id} className="flex items-center space-x-4">
                                    <Checkbox
                                        id={`select-${item.id}`}
                                        checked={item.selected || selectedItems.length === cartItems.length}
                                        onCheckedChange={() => toggleItemSelection(item.id)}
                                    />
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        width={100}
                                        height={100}
                                        className="rounded-md"
                                    />
                                    <div className="flex-1 space-y-1">
                                        <h3 className="font-medium">{item.name}</h3>
                                        <p className="text-sm text-muted-foreground">${item.price.toFixed(2)}</p>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Button
                                            variant="outline"
                                            size="icon"
                                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                        >
                                            <Minus className="h-4 w-4" />
                                        </Button>
                                        <Input
                                            type="number"
                                            value={item.quantity}
                                            onChange={(e) => updateQuantity(item.id, parseInt(e.target.value, 10))}
                                            className="w-16 text-center"
                                        />
                                        <Button
                                            variant="outline"
                                            size="icon"
                                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                        >
                                            <Plus className="h-4 w-4" />
                                        </Button>
                                    </div>
                                    <Button variant="ghost" size="icon" onClick={() => removeItem(item.id)}>
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Order Summary</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Subtotal</span>
                                    <span>${subtotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Shipping</span>
                                    <span>${shipping.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Tax</span>
                                    <span>${tax.toFixed(2)}</span>
                                </div>
                                <Separator />
                                <div className="flex justify-between font-medium">
                                    <span>Total</span>
                                    <span>${total.toFixed(2)}</span>
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter className="flex flex-col space-y-2">
                            <Button
                                className="w-full"
                                size="lg"
                                onClick={proceedToCheckout}
                                disabled={selectedItems.length === 0}
                            >
                                Proceed to Checkout
                            </Button>
                            <Button
                                className="w-full"
                                variant="outline"
                                size="lg"
                                onClick={saveCart}
                                disabled={selectedItems.length === 0}
                            >
                                <Save className="mr-2 h-4 w-4" />
                                Save Cart
                            </Button>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </div>
    )
}