import { Button } from "../../../components/ui/button"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "../../../components/ui/carousel"
import { Footer } from './footer'
import { Product, productCardPropsTypes } from '../../../types/product'
import ProductCard from '../../components/product/product-card'
import { useGetCategories, useGetProducts } from "../../../queries/queries"
import { carousel1, carousel2, carousel3 } from "../../../constants/images"
import OfferCard from "./offer-card"
import { useNavigate } from "@tanstack/react-router"
import { Card, CardContent } from "../../../components/ui/card"

export type Category = {
    categoryId: string;
    name: string;
    description: string
}

const carouselItems = [
    { id: 1, image: carousel1, alt: 'Carousel Item 1' },
    { id: 2, image: carousel2, alt: 'Carousel Item 2' },
    { id: 3, image: carousel3, alt: 'Carousel Item 3' },
]

export function Homepage() {
    const navigate = useNavigate();
    const { data: products } = useGetProducts();
    const { data: categories } = useGetCategories();

    return (
        <div className=" flex flex-col min-h-screen">
            <main className="container mx-auto flex-grow">
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
                        {categories && categories?.data?.map((category: Category) => (
                            <Button key={category.categoryId} variant="outline" className="h-24 flex flex-col items-center justify-center"
                                onClick={
                                    () => navigate({
                                        to: `/product/category/${category.categoryId}`,
                                    })
                                }>
                                <span>{category.name}</span>
                            </Button>
                        ))}
                    </div>
                </section>

                <section className="p-4">
                    <h2 className="text-xl font-bold mb-4">Today's Highlights</h2>
                    <div className="grid gap-4  sm:grid-cols-3 lg:grid-cols-4">
                        {
                            products?.data?.map((product: productCardPropsTypes) => (
                                <ProductCard product={product} />
                            ))
                        }
                    </div>
                    <div className="flex justify-centerm-2">
                        <Button onClick={
                            () => navigate({
                                to: "/product/explore",
                            },
                            )
                        }
                            className="w-full mx-4 mt-8" variant={'secondary'}>Shop More</Button>
                    </div>
                </section>

                <section className="p-4">
                    <h2 className="text-xl font-bold mb-4">Best Sellers</h2>
                    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                        {products && products.data?.map((item: Product) => (
                            <Card key={item.productId}>
                                <CardContent className="p-4">
                                    <img src={item.imageUrl} alt={item.name} className="w-full h-32 object-cover mb-2 rounded" />
                                    <h3 className="font-semibold">{item.name}</h3>
                                    <p className="text-sm text-gray-600">${item.price.toFixed(2)}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </section>

                <section className="p-4">
                    <OfferCard />
                </section>
            </main>
            <Footer />
        </div >
    )
}   