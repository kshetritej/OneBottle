import { useParams } from "@tanstack/react-router"
import { Star, Minus, Plus, Facebook, Twitter, Instagram, ShoppingCart } from "lucide-react";
import { Button } from "../../../components/ui/button";
import { useEffect, useState } from "react";
import Feedbacks from "../../components/product/product-feedbacks";
import ProductSuggestion from "../../components/product/product-suggestion";
import { useGetFeedbacksByProductId, useGetProductById } from "../../../queries/queries";
import { CartItem } from "../user/cart";
import { atom, useRecoilState } from "recoil";
import { toast } from "../../../hooks/use-toast";

export type feedbackType = {
    feedbackId: string;
    comment: string;
    date: string;
    productId: string;
    rating: number;
    user: UserDetails;
};

type UserDetails = {
    userId: string;
    username: string;
    email: string;
};

export function ProductDescription() {
    const productId = useParams({
        select: (params) => [params.productId],
        from: '/product/$productId'
    });

    const product = useGetProductById(productId[0]).data?.data;
    const [quantity, setQuantity] = useState(1);

    const initialCart = JSON.parse(localStorage.getItem('cart') || '[]') as CartItem[];

    const cartListState = atom<CartItem[]>({
        key: 'CartList',
        default: initialCart
    });

    const [cartList, setCartList] = useRecoilState(cartListState);

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

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartList));
    }, [cartList]);


    const feedback = useGetFeedbacksByProductId(productId[0]).data?.data;
    console.log('reviews ... ', feedback)
    return (
        <div>
            <div className="container mx-auto px-4 py-8">
                <div className="grid md:grid-cols-2 gap-8">
                    <div>
                        <img
                            src={product?.imageUrl}
                            alt={product?.name}
                            width={500}
                            height={500}
                            className="w-full h-auto rounded-lg"
                        />
                        {/* <div className="flex mt-4 space-x-2 overflow-x-auto">
                            {product?.thumbnails?.map((thumb, index) => (
                                <img
                                    key={index}
                                    src={thumb}
                                    alt={`${product.name} thumbnail ${index + 1}`}
                                    width={100}
                                    height={100}
                                    className="w-20 h-20 rounded-md object-cover"
                                />
                            ))}
                        </div> */}
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold mb-2">{product?.name}</h1>
                        <div className="flex items-center mb-4">
                            <div className="flex">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        className={`w-5 h-5 ${i < Math.floor(5) ? "text-yellow-400 fill-current" : "text-gray-300"
                                            }`}
                                    />
                                ))}
                            </div>
                            <span className="ml-2 text-sm text-gray-600">
                                {product?.rating}/{product?.feedbacks?.length} Star rating
                            </span>
                        </div>
                        <p className="text-2xl font-bold mb-4">${product?.price}</p>
                        <p className="mb-4">{product?.description}</p>
                        <div className="flex items-center space-x-4 mb-4">
                            <Button
                                variant="outline"
                                size="icon"
                                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                            > <Minus className="h-4 w-4" />
                            </Button>
                            <span>{quantity}</span>
                            <Button
                                variant="outline"
                                size="icon"
                                onClick={() => setQuantity(quantity + 1)}
                            >
                                <Plus className="h-4 w-4" />
                            </Button>
                        </div>
                        <Button className="w-full mb-4"
                            onClick={() => {
                                return addToCart({ productId: product.productId, name: product.name, imageUrl: product.imageUrl, price: product.price, quantity: quantity })
                            }}
                        ><ShoppingCart className="mr-4" /> Add to Cart</Button> <Button variant="secondary" className="w-full mb-4"> Buy Now
                        </Button>
                        <div className="flex space-x-4 mb-4">
                            <span>Share:</span>
                            <div className="rounded-lg bg-gray-300 p-1 ">
                                <Facebook className="w-5 h-5" />
                            </div>
                            <div className="rounded-lg bg-gray-300 p-1 ">
                                <Instagram className="w-5 h-5" />
                            </div>
                            <div className="rounded-lg bg-gray-300 p-1 ">
                                <Twitter className="w-5 h-5" />
                            </div>
                        </div>
                        {/* <Card>
                            <CardContent className="p-4"> */}
                        <h3 className="font-semibold mb-2">Details</h3>
                        <ul className="space-y-1">
                            <li>ABV: {product?.abv}/100mL</li>
                            <li>Volume : {product?.volume} mL</li>
                            <li>Brand : {product?.brand}</li>
                        </ul>
                        {/* </CardContent>
                        </Card> */}
                    </div>
                </div>
                <Feedbacks feedbacks={feedback} />
                <ProductSuggestion />
            </div >
        </div>
    )
}
