import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "../../components/ui/drawer"
import { Button } from "../../components/ui/button"
import { Minus, Plus, ShoppingCart } from "lucide-react"
import { useState } from "react"
import { ScrollArea } from "@radix-ui/react-scroll-area"
import { Checkbox } from "../../components/ui/checkbox"

interface CartItem {
    id: string
    name: string
    price: number
    quantity: number
    image: string
}

export const Cart = () => {
    const [cartItems, setCartItems] = useState<CartItem[]>([
        { id: '1', name: 'Highland Mist Whiskey', price: 59.99, quantity: 1, image: '/placeholder.svg?height=80&width=80' },
        { id: '2', name: 'Lowland Breeze Gin', price: 45.99, quantity: 2, image: '/placeholder.svg?height=80&width=80' },
        { id: '3', name: 'Speyside Nectar', price: 79.99, quantity: 1, image: '/placeholder.svg?height=80&width=80' },
        { id: '4', name: 'Speyside Nectar', price: 79.99, quantity: 1, image: '/placeholder.svg?height=80&width=80' },
        { id: '5', name: 'Speyside Nectar', price: 79.99, quantity: 1, image: '/placeholder.svg?height=80&width=80' },
        { id: '6', name: 'Speyside Nectar', price: 79.99, quantity: 1, image: '/placeholder.svg?height=80&width=80' },
    ])
    const [selectedItems, setSelectedItems] = useState<string[]>([])

    const handleQuantityChange = (id: string, change: number) => {
        setCartItems(items =>
            items.map(item =>
                item.id === id ? { ...item, quantity: Math.max(1, item.quantity + change) } : item
            )
        )
    }

    const handleSelectItem = (id: string) => {
        setSelectedItems(prev =>
            prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
        )
    }

    const handleDeleteSelected = () => {
        setCartItems(items => items.filter(item => !selectedItems.includes(item.id)))
        setSelectedItems([])
    }

    const totalPrice = cartItems
        .filter(item => selectedItems.includes(item.id))
        .reduce((sum, item) => sum + item.price * item.quantity, 0)
    return (
        <Drawer>
            <DrawerTrigger><ShoppingCart /></DrawerTrigger>
            <DrawerContent>
                <DrawerHeader className="text-left">
                    <DrawerTitle>My Cart</DrawerTitle>
                    <DrawerDescription>Delete or proceed for checkout.</DrawerDescription>
                </DrawerHeader>
                <div className="items">
                    <ScrollArea className="flex-grow max-h-[400px] overflow-auto">
                        <div className="p-4 space-y-4">
                            {cartItems.map(item => (
                                <div key={item.id} className="flex items-center space-x-4 py-2 border-b last:border-b-0">
                                    <Checkbox
                                        checked={selectedItems.includes(item.id)}
                                        onCheckedChange={() => handleSelectItem(item.id)}
                                    />
                                    <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded" />
                                    <div className="flex-grow">
                                        <h3 className="font-medium">{item.name}</h3>
                                        <p className="text-sm text-gray-500">${item.price.toFixed(2)}</p>
                                        <div className="flex items-center mt-2">
                                            <Button
                                                variant="outline"
                                                size="icon"
                                                className="h-8 w-8"
                                                onClick={() => handleQuantityChange(item.id, -1)}
                                            >
                                                <Minus className="h-4 w-4" />
                                            </Button>
                                            <span className="mx-2 min-w-[2ch] text-center">{item.quantity}</span>
                                            <Button
                                                variant="outline"
                                                size="icon"
                                                className="h-8 w-8"
                                                onClick={() => handleQuantityChange(item.id, 1)}
                                            >
                                                <Plus className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </ScrollArea>
                </div>
                <DrawerFooter>
                    <div className="flex justify-between items-center mb-4">
                        <span className="font-semibold">Total (Selected):</span>
                        <span className="font-semibold">${totalPrice.toFixed(2)}</span>
                    </div>
                    <Button>Checkout</Button>
                    <DrawerClose>
                        <Button className="w-full" variant="destructive" disabled>Delete</Button>
                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>

    )
}

