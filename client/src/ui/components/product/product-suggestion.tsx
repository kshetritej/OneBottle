import { productCardPropsTypes } from "../../../types/product"
import { useGetProducts } from "../../../queries/queries";
import { Card, CardContent } from "../../../components/ui/card";
import { Link } from "@tanstack/react-router";


export default function ProductSuggestion() {
    const products = useGetProducts().data;
    const suggestedProducts = products?.data?.slice(0, 3);
    return (
        <div className="container  mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">You may also like</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                {suggestedProducts?.map((item: productCardPropsTypes) => (
                    <Link key={item.productId} to={`/product/${item.productId}`}>
                        <Card key={item.productId}>
                            <CardContent className="p-4">
                                    <div className="mx-auto sm:size-[250px] size-[100px] overflow-hidden rounded-lg flex flex-col items-center">
                                        <img src={item.imageUrl} alt={item.name} className="w-full h-full object-fit mb-2 rounded" />
                                    </div>
                                <h3 className="font-semibold">{item.name}</h3>
                                <p className="text-orange-500 py-4 text-sm font-black">${item.price.toFixed(2)}</p>
                            </CardContent>
                        </Card>
                    </Link>
                ))}
            </div>
        </div>
    )
}