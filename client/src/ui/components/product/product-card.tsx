import { Star, ShoppingCart } from 'lucide-react'
import { Button } from "../../../components/ui/button"
import { Card, CardContent, CardFooter } from "../../../components/ui/card"
import { Badge } from '../../../components/ui/badge'
import { productCardPropsTypes } from '../../../types/product'
import { useGetCategoryById } from '../../../queries/queries'
import { atom, useRecoilState } from "recoil"
import { useEffect } from 'react'
import { Link } from '@tanstack/react-router'
import { toast } from '../../../hooks/use-toast'

// Define the structure for a cart item
type CartItem = {
    productId: string,
    name: string,
    imageUrl: string,
    price: number,
    quantity: number
}

export default function ProductCard({ product }: { product: productCardPropsTypes }) {
    const category = useGetCategoryById(product?.categoryId).data?.data?.name;

    // Load the initial cart from local storage or default to an empty array
    const initialCart = JSON.parse(localStorage.getItem('cart') || '[]') as CartItem[];

    // Atom for the cart list, using Recoil state
    const cartListState = atom<CartItem[]>({
        key: 'CartList',
        default: initialCart
    });

    const [cartList, setCartList] = useRecoilState(cartListState);

    // Add to Cart function
    function addToCart(newItem: CartItem) {
        const existingProduct = cartList.find(item => item.productId === newItem.productId);

        if (existingProduct) {
            toast({
                title: 'Product already in cart',
                variant: "warning"
            });
        } else {
            const updatedCart = [...cartList, newItem];
            setCartList(updatedCart);
            toast({
                title: 'Product added to cart',
                variant: "success"
            });
        }
    }

    // Save cart to local storage whenever the cart list changes
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartList));
    }, [cartList]);

    return (
        <>
            <Card className="w-full max-w-sm mx-auto overflow-hidden">
                <CardContent className="p-4">
                    <Link key={product.productId} to={`/product/${product.productId}`}>
                        <div className="relative">
                            <img
                                src={product?.imageUrl}
                                alt={product?.name}
                                className="w-full h-48 object-cover sm:h-48" />
                            <Badge className="absolute top-2 right-2 bg-primary text-primary-foreground">{category}</Badge>
                        </div>
                        <h3 className="text-lg font-semibold mb-1 sm:text-xl">{product?.name}</h3>
                        <div className="flex items-center mb-2">
                            {[...Array(5)].map((_, i) => (
                                <Star key={i} className={`w-4 h-4 sm:w-5 sm:h-5 ${i < 4 ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
                            ))}
                            <span className="ml-2 text-xs text-gray-600 sm:text-sm">(42)</span>
                        </div>
                        <p className="text-sm text-gray-600 mb-3 line-clamp-2 sm:text-base">
                            {product?.description}
                        </p>
                    </Link>
                    <div className="flex justify-between">
                        <Link key={product.productId} to={`/product/${product.productId}`}>
                            <div className='flex items-center'>
                                <span className="text-2xl font-bold sm:text-3xl">${product?.price}</span>
                                <span className="ml-2 text-sm text-gray-500 line-through">${'69.69'}</span>
                            </div>
                        </Link>
                        <Button size="sm" className="sm:hidden mt-2"
                            onClick={() => addToCart({ productId: product.productId, name: product.name, imageUrl: product.imageUrl, price: product.price, quantity: 1 })}>
                            <ShoppingCart className="h-4 w-4" />
                        </Button>
                    </div>
                </CardContent>
                <CardFooter className="p-4 pt-0 hidden sm:block">
                    <Button className="w-full"
                        onClick={() => addToCart({ productId: product.productId, name: product.name, imageUrl: product.imageUrl, price: product.price, quantity: 1 })}>
                        <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
                    </Button>
                </CardFooter>
            </Card>
        </>
    )
}
