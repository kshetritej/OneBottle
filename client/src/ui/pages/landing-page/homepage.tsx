import { Facebook, Instagram, Twitter } from 'lucide-react'
import { Button } from "../../../components/ui/button"
import { Card, CardContent } from "../../../components/ui/card"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "../../../components/ui/carousel"
import { Input } from "../../../components/ui/input"
import { absolute_vodka, carousel1, carousel2, carousel3, tuborg_beer, xamaka_wine } from '../../../constants/images'
import { useQuery } from "@tanstack/react-query";
import { Query } from '../../../queries'
import { Footer } from './footer'
import { productCardPropsTypes } from '../../../types/product'
import ProductCard from '../../components/product/product-card'
import { Link } from '@tanstack/react-router'

type Category = {
    id: number;
    name: string;
    description: string
}
// Mock data arrays
const carouselItems = [
    { id: 1, image: carousel1, alt: 'Carousel Item 1' },
    { id: 2, image: carousel2, alt: 'Carousel Item 2' },
    { id: 3, image: carousel3, alt: 'Carousel Item 3' },
]
const baseUrl = import.meta.env.VITE_API_URL as string;

export function Homepage() {
    const products = new Query().getProducts.data;
    const categories = new Query().getCategories.data;

    return (
        <div className="flex flex-col min-h-screen">
            <main className="flex-grow">
                <section className="p-4">
                    <Carousel className='bg-red-500 rounded-sm'>
                        <CarouselContent>
                            {carouselItems.map((item) => (
                                <CarouselItem key={item.id}>
                                    <img src={item.image} alt={item.alt} className="w-full h-48 object-cover rounded-lg" />
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        <div className='absolute left-16 bottom-8'>
                            <CarouselPrevious />
                            <CarouselNext />
                        </div>
                    </Carousel>
                </section>

                <section className="p-4">

                    <h2 className="text-xl font-bold mb-4">Shop by Spirit</h2>
                    <div className="grid grid-cols-3 gap-4">
                        {categories?.map((category: Category) => (
                            <Button key={category.id} variant="outline" className="h-24 flex flex-col items-center justify-center">
                                <span>{category.name}</span>
                            </Button>
                        ))}
                    </div>
                </section>

                <section className="p-4">
                    <h2 className="text-xl font-bold mb-4">Today's Highlights</h2>
                    <div className="grid  gap-4 sm:grid-cols-3">
                        {
                            products?.map((product: productCardPropsTypes) => (
                                <Link key={product.productId} to={`/product/${product.productId}`}>
                                    <ProductCard product={product} />
                                </Link>
                            ))
                        }
                    </div>
                </section>

                <section className="p-4">
                    <h2 className="text-xl font-bold mb-4">Shop by Brand</h2>
                    {/* <div className="grid grid-cols-3 gap-4">
                        {brandItems.map((brand) => (
                            <Button key={brand.id} variant="outline" className="h-24 flex flex-col items-center justify-center">
                                <img src={brand.image} alt={brand.name} className="w-16 h-16 mb-2" />
                                <span className="text-xs">{brand.name}</span>
                            </Button>
                        ))}
                    </div> */}
                </section>

                <section className="p-4">
                    <h2 className="text-xl font-bold mb-4">Best Sellers</h2>
                    {/* <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                        {bestSellers.map((item) => (
                            <Card key={item.id}>
                                <CardContent className="p-4">
                                    <img src={item.image} alt={item.name} className="w-full h-32 object-cover mb-2 rounded" />
                                    <h3 className="font-semibold">{item.name}</h3>
                                    <p className="text-sm text-gray-600">${item.price.toFixed(2)}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div> */}
                </section>

                <section className="p-4">
                    <Card>
                        <CardContent className="p-4">
                            <h2 className="text-lg font-semibold mb-2">Special Offer</h2>
                            <p className="text-sm text-gray-600">Get 10% off on your first order! Use code: WELCOME10</p>
                        </CardContent>
                    </Card>
                </section>
            </main>
            <Footer />
        </div >
    )
}   