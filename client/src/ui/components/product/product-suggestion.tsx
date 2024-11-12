import { Star } from "lucide-react";
import { Card, CardContent } from "../../../components/ui/card"
import { productCardPropsTypes } from "../../../types/product"
import { useGetProducts } from "../../../queries/queries";


export default function ProductSuggestion() {
    const products = useGetProducts().data;
    const suggestedProducts = products?.data?.slice(0, 3);
    return (
        <div className="w-full  mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">You may also like</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {suggestedProducts?.map((product: productCardPropsTypes) => (
                    <Card key={product?.productId}>
                        <CardContent className="p-4">
                            <div className="aspect-square relative mb-4">
                                <img
                                    src={product?.imageUrl}
                                    alt={product?.name}
                                    className="rounded-md"
                                />
                            </div>
                            <h3 className="font-semibold mb-2">{product?.name}</h3>
                            <p className="text-lg font-bold mb-2">${product?.price}</p>
                            <div className="flex items-center">
                                <div className="flex mr-1">
                                    {[...Array(5)].map((_, i) => (
                                        <Star
                                            key={i}
                                            className={`w-4 h-4 ${i < Math.floor(product?.rating)
                                                ? "text-yellow-400 fill-current"
                                                : "text-gray-300"
                                                }`}
                                        />
                                    ))}
                                </div>
                                <span className="text-sm text-gray-600">
                                    {product?.feedbacks} ({product?.rating}/5)
                                </span>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
}