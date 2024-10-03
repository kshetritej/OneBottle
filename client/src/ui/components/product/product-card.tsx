import { Star, ShoppingCart } from 'lucide-react'
import { Button } from "../../../components/ui/button"
import {
  Card,
  CardContent,
  CardFooter
} from "../../../components/ui/card"
import { Badge } from '../../../components/ui/badge'
import { productCardPropsTypes } from '../../../types/product'
export default function ProductCard({ image, name, price }: productCardPropsTypes) {
  return (
    <Card className="w-full max-w-sm mx-auto overflow-hidden">
      <div className="relative">
        <img
          src={image}
          alt={name}
          className="w-full h-48 object-cover sm:h-48 "
        />
        <Badge className="absolute top-2 right-2 bg-primary text-primary-foreground">New</Badge>
      </div>
      <CardContent className="p-4">
        <h3 className="text-lg font-semibold mb-1 sm:text-xl">{name}</h3>
        <div className="flex items-center mb-2">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className={`w-4 h-4 sm:w-5 sm:h-5 ${i < 4 ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
          ))}
          <span className="ml-2 text-xs text-gray-600 sm:text-sm">(42)</span>
        </div>
        <p className="text-sm text-gray-600 mb-3 line-clamp-2 sm:text-base">Smooth and peaty with hints of vanilla and oak. A true Scottish classic.</p>
        <div className="flex  justify-between">
          <div className='flex items-center '>
            <span className="text-2xl font-bold sm:text-3xl">${price}</span>
            <span className="ml-2 text-sm text-gray-500 line-through">${'69.69'}</span>
          </div>
          <Button size="sm" className="sm:hidden mt-2">
            <ShoppingCart className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 hidden sm:block">
        <Button className="w-full">
          <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
        </Button>
      </CardFooter>
    </Card>
  )
}
