import { useState } from 'react'
import { MoreHorizontal, ChevronRight, ChevronLeft, Badge } from "lucide-react"
import { Button } from '../../../components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../components/ui/tabs'

// Mock data to simulate backend response
const mockOrders = [
  {
    id: "FRL1001",
    productName: "Frances Lawson",
    quantity: 1,
    price: 10000, // in cents
    orderDate: "2023-11-09T20:21:18Z",
    status: "Processing",
    imageUrl: "/placeholder.svg?height=64&width=64",
    shippingMethod: "Standard Shipping",
    estimatedDelivery: "3-5 business days",
    trackingNumber: null,
    paymentMethod: "Credit Card (ending in 1234)",
    paymentStatus: "Completed",
  },
  {
    id: "JDS2002",
    productName: "John Doe Shirt",
    quantity: 2,
    price: 5000, // in cents
    orderDate: "2023-11-08T15:30:00Z",
    status: "Shipped",
    imageUrl: "/placeholder.svg?height=64&width=64",
    shippingMethod: "Express Shipping",
    estimatedDelivery: "1-2 business days",
    trackingNumber: "EXPR1234567890",
    paymentMethod: "PayPal",
    paymentStatus: "Completed",
  }
]

export function OrderSummary() {
  const [currentOrderIndex, setCurrentOrderIndex] = useState(0)
  const currentOrder = mockOrders[currentOrderIndex]

  const formatPrice = (price: number) => {
    return `$${(price / 100).toFixed(2)}`
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString()
  }

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <div className="flex items-start justify-between">
        <div className="flex gap-4">
          <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden">
            <img
              src={currentOrder.imageUrl}
              alt={currentOrder.productName}
              width={64}
              height={64}
              className="object-cover"
            />
          </div>
          <div>
            <h1 className="text-xl font-semibold">Order #{currentOrder.id}</h1>
            <div className="grid grid-cols-2 gap-x-8 gap-y-2 mt-2 text-sm">
              <div>
                <div className="text-gray-500">Item</div>
                <div>{currentOrder.productName}</div>
              </div>
              <div>
                <div className="text-gray-500">Quantity</div>
                <div>{currentOrder.quantity}</div>
              </div>
              <div>
                <div className="text-gray-500">Order Date</div>
                <div>{formatDate(currentOrder.orderDate)}</div>
              </div>
              <div>
                <div className="text-gray-500">Total Price</div>
                <div>{formatPrice(currentOrder.price * currentOrder.quantity)}</div>
              </div>
            </div>
          </div>
        </div>
        <Badge 
          className={`${
            currentOrder.status === 'Processing' 
              ? 'bg-orange-100 text-orange-800' 
              : 'bg-green-100 text-green-800'
          } hover:bg-opacity-80`}
        >
          {currentOrder.status}
        </Badge>
      </div>

      <div className="flex gap-2">
        <Button variant="default">View Invoice</Button>
        <Button variant="outline">Track Order</Button>
        <Button variant="ghost" size="icon">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </div>

      <Tabs defaultValue="history" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="history">Order History</TabsTrigger>
          <TabsTrigger value="details">Item Details</TabsTrigger>
          <TabsTrigger value="shipping">Shipping</TabsTrigger>
          <TabsTrigger value="payment">Payment</TabsTrigger>
        </TabsList>
        <TabsContent value="history" className="mt-6">
          <div className="space-y-6">
            <div className="flex justify-between items-start">
              <div className="flex gap-4">
                <div className="w-2 h-2 mt-2 rounded-full bg-green-500" />
                <div>
                  <div className="font-medium">{currentOrder.status}</div>
                  <div className="text-sm text-gray-500">{formatDate(currentOrder.orderDate)}</div>
                  <div className="mt-1 text-sm">
                    <div>Your order has been {currentOrder.status.toLowerCase()} and is being processed.</div>
                  </div>
                </div>
              </div>
              <Button variant="link" className="text-green-600">
                See Details
              </Button>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="details">
          <div className="mt-4 space-y-4">
            <h3 className="font-semibold">Product Details</h3>
            <p>Name: {currentOrder.productName}</p>
            <p>Price: {formatPrice(currentOrder.price)}</p>
            <p>Quantity: {currentOrder.quantity}</p>
            <p>Description: High-quality product with excellent features.</p>
          </div>
        </TabsContent>
        <TabsContent value="shipping">
          <div className="mt-4 space-y-4">
            <h3 className="font-semibold">Shipping Information</h3>
            <p>Shipping method: {currentOrder.shippingMethod}</p>
            <p>Estimated delivery: {currentOrder.estimatedDelivery}</p>
            <p>Tracking number: {currentOrder.trackingNumber || 'Not available yet'}</p>
          </div>
        </TabsContent>
        <TabsContent value="payment">
          <div className="mt-4 space-y-4">
            <h3 className="font-semibold">Payment Details</h3>
            <p>Payment method: {currentOrder.paymentMethod}</p>
            <p>Total charged: {formatPrice(currentOrder.price * currentOrder.quantity)}</p>
            <p>Payment status: {currentOrder.paymentStatus}</p>
          </div>
        </TabsContent>
      </Tabs>

      <div className="flex justify-between items-center pt-4 border-t">
        <div className="text-sm text-gray-500">Order {currentOrderIndex + 1} of {mockOrders.length}</div>
        <div className="flex gap-2">
          <Button 
            variant="ghost" 
            className="text-sm" 
            onClick={() => setCurrentOrderIndex(prev => Math.max(0, prev - 1))}
            disabled={currentOrderIndex === 0}
          >
            <ChevronLeft className="mr-2 h-4 w-4" />
            Previous order
          </Button>
          <Button 
            variant="ghost" 
            className="text-sm"
            onClick={() => setCurrentOrderIndex(prev => Math.min(mockOrders.length - 1, prev + 1))}
            disabled={currentOrderIndex === mockOrders.length - 1}
          >
            Next order
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}