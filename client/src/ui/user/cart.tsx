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
import { useEffect, useState } from "react"
import { ScrollArea } from "@radix-ui/react-scroll-area"
import { Checkbox } from "../../components/ui/checkbox"
import { Query } from "../../queries"

type Product = {
    productId: string;
    name: string;
    imageUrl: string;
    description: string;
    rating: number;
    brand: string;
    volume: number;
    abv: number;
    categoryId: string;
    price: number;
};

// Type for Cart
type Cart = {
    cartId: string;
    userId: string;
    productId: string;
    product: Product;
    quantity: number;
    totalPrice: number;
};
export const Cart = () => {
    const existingCarts = new Query().getCartItems.data as Cart[]
    const [cartItems, setCartItems] = useState<Cart[]>(existingCarts)
    const [selectedItems, setSelectedItems] = useState<string[]>([])
    const deleteButton = document.getElementById('deleteBtn');
    console.log(existingCarts, ":carts")

    useEffect(() => {
        if (selectedItems.length == 0) {
            deleteButton?.setAttribute('disabled', '')
        }
    }, [selectedItems])
    const handleQuantityChange = (id: string, change: number) => {
        setCartItems(items=>
            items?.map(item =>
                item?.cartId=== id ? { ...item, quantity: Math.max(1, item.quantity + change) } : item
            )
        )
    }

    const handleSelectItem = (id: string) => {
        setSelectedItems(prev =>
            prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
        )
    }

    const handleDeleteSelected = () => {
        setCartItems(items => items?.filter(item => !selectedItems.includes(item.cartId)))
        setSelectedItems([])
    }

    const totalPrice = cartItems
        ?.filter(item => selectedItems.includes(item.cartId))
        ?.reduce((sum, item) => sum + item.totalPrice* item.quantity, 0)
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
                            {existingCarts?.map(item => (
                                <div key={item?.cartId} className="flex items-center space-x-4 py-2 border-b last:border-b-0">
                                    <Checkbox
                                        checked={selectedItems.includes(item.cartId)}
                                        onCheckedChange={() => handleSelectItem(item.cartId)}
                                    />
                                    <img src={item.product.imageUrl} alt={item.product.name} className="w-20 h-20 object-cover rounded" />
                                    <div className="flex-grow">
                                        <h3 className="font-medium">{item.product.name}</h3>
                                        <p className="text-sm text-gray-500">${item.product.price.toFixed(2)}</p>
                                        <div className="flex items-center mt-2">
                                            <Button
                                                variant="outline"
                                                size="icon"
                                                className="h-8 w-8"
                                                onClick={() => handleQuantityChange(item.productId, -1)}
                                            >
                                                <Minus className="h-4 w-4" />
                                            </Button>
                                            <span className="mx-2 min-w-[2ch] text-center">{item.quantity}</span>
                                            <Button
                                                variant="outline"
                                                size="icon"
                                                className="h-8 w-8"
                                                onClick={() => handleQuantityChange(item.productId, 1)}
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
                        <span className="font-semibold">${totalPrice?.toFixed(2)}</span>
                    </div>
                    <Button>Checkout</Button>
                    <DrawerClose>
                        <Button id="deleteBtn" className="w-full" variant="destructive" >Delete</Button>
                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>

    )
}

