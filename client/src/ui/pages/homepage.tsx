import { Facebook, Instagram, Twitter } from 'lucide-react'
import { Button } from "../../components/ui/button"
import { Card, CardContent } from "../../components/ui/card"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "../../components/ui/carousel"
import { Input } from "../../components/ui/input"
import { absolute_vodka, carousel1, carousel2, carousel3, tuborg_beer, xamaka_wine } from '../../constants/images'
import ProductCard from '../components/product/product-card'
import { useQuery } from "@tanstack/react-query";

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
    const getProducts = useQuery({
        queryKey: ['products'],
        queryFn: async () => {
            const response = await fetch(`${baseUrl}/product`);
            const data = await response.json();
            return data;
        }
    })
    const { data: spiritCategories } = useQuery({
        queryKey: ["getCategories"],
        queryFn: async () => {
            const response = await fetch(`${baseUrl}/category`);
            const data = await response.json();
            return data;
        }
    })
    const products = getProducts.data;
    console.log("category ", spiritCategories)
    console.log('produts', products)
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
                        {spiritCategories?.map((category: Category) => (
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
                            //todays highlights seciotn
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
            <footer className="bg-gray-900 text-gray-300 py-8 px-4 md:px-8">
                <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Logo and Slogan */}
                    <div className="flex flex-col items-center md:items-start">
                        <img src="/placeholder.svg?height=50&width=150" alt="One Bottle Logo" className="h-12 mb-4" />
                        <p className="text-sm text-center md:text-left">Discover the world's finest bottles at One Bottle. </p>
                        <div className="flex space-x-4 mt-4">
                            <Facebook className="h-5 w-5" />
                            <Instagram className="h-5 w-5" />
                            <Twitter className="h-5 w-5" />
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Our Products</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">FAQs</a></li>
                        </ul>
                    </div>
                    {/* Contact Information */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
                        <address className="not-italic">
                            <p>123 Spirit Street</p>
                            <p>Liquor City, AL 12345</p>
                            <p className="mt-2">Phone: (123) 456-7890</p>
                            <p>Email: info@onebottle.com</p>
                        </address>
                    </div>

                    {/* Newsletter Signup */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Stay Updated</h3>
                        <p className="text-sm mb-4">Subscribe to our newsletter for exclusive offers and bottled news.</p>
                        <form className="flex flex-col space-y-2">
                            <Input
                                type="email"
                                placeholder="Your email address"
                                className="bg-gray-800 border-gray-700 text-white placeholder-gray-400"
                            />
                            <Button type="submit" className="bg-primary hover:bg-primary/90">
                                Subscribe
                            </Button>
                        </form>
                    </div>
                </div>

                {/* Copyright */}
                <div className="mt-8 pt-8 border-t border-gray-800 text-center text-sm">
                    <p>&copy; 2024 Spirit Haven. All rights reserved.</p>
                    <p className="mt-2">
                        <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                        {' | '}
                        <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                    </p>
                </div>
            </footer>
        </div>
    )
}   