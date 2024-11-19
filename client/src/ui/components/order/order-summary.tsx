import { Button } from '../../../components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../components/ui/tabs'
import { useCancelOrder, useCreateNotification, useGetOrderById, useGetProductById, useGetProducts } from '../../../queries/queries'
import { useParams } from '@tanstack/react-router'
import { ProductResponse } from '../../../types/product'
import { Card } from '../../../components/ui/card'
import { renderStatus } from '../../../utils/renderStatus'

export function OrderSummary() {
  const allProducts = useGetProducts().data?.data;
  const orderId = useParams({
    select: (params) => [params.orderId],
    from: '/order-summary/$orderId'
  });

  const { data: order } = useGetOrderById(orderId[0]);
  const { data: product } = useGetProductById(order?.productId && order?.productId[0]);
  const thumbnailProduct: ProductResponse = product?.data;
  //@ts-ignore
  const userId = JSON.parse(localStorage.getItem("user"))?.userId;

  const cancelOrder = useCancelOrder();
  const createNotification = useCreateNotification();
  const orderedItems = allProducts?.filter((prod: ProductResponse) =>
    order?.productId?.includes(prod?.productId)
  );


  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      {thumbnailProduct && <div className="flex items-start justify-between">
        <div className="flex gap-4">
          <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden">
            <img
              src={thumbnailProduct?.imageUrl}
              alt={thumbnailProduct?.name}
              width={64}
              height={64}
              className="object-cover"
            />
          </div>
          <div>
            <h1 className="text-xl font-semibold">Order {order?.orderId.split("-")[0].toUpperCase()}</h1>
            <div className="grid grid-cols-2 gap-x-8 gap-y-2 mt-2 text-sm">
              <div>
                <div className="text-gray-500">Order Date</div>
                <div>{new Date(order.orderDate).toLocaleDateString()}</div>
              </div>
              <div>
                <div className="text-gray-500">Total Price</div>
                <div>$ {order.totalPrice}</div>
              </div>
            </div>
          </div>
        </div>
        <
        >
          {renderStatus(order.orderStatus)}
        </>
      </div>
      }

      <div className="flex gap-2">
        <Button variant="default">View Invoice</Button>
        {/* <Button variant="outline">Track Order</Button> */}
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
                  <div className="font-medium">{order?.orderStatus}</div>
                  <div className="text-sm text-gray-500">{new Date(order?.orderDate).toLocaleDateString()}</div>
                  <div className="mt-1 text-sm">
                    <div>Your order is  {order?.orderStatus.toUpperCase()}.</div>

                  </div>
                </div>
              </div>
              {
                order?.orderStatus == "processing" &&
                <Button variant="link" className="text-red-600" onClick={() => {
                  cancelOrder.mutate(orderId[0])
                  createNotification.mutate({
                    notificationType: 1,
                    notificationContext: 0,
                    notificationTitle: "Order Status Update",
                    notificationContent: `Your order ${"ORD" + orderId[0].split("-")[0]}  is CANCELLED.`,
                    userId: userId,
                  })
                }}
                >
                  Cancel Order
                </Button>
              }
            </div>
          </div>
        </TabsContent>
        <TabsContent value="details">
          <div className="mt-4 space-y-4">
            <h3 className="font-semibold">Product Details</h3>
            <div className='flex flex-col gap-4 '>
              {orderedItems?.map((item: ProductResponse) =>
                <Card className='flex gap-4 p-4'>
                  <img src={item.imageUrl} alt={item.name} className='size-24 rounded-lg' />
                  <div>
                    <p>Name: {item.name}</p>
                    <p>Price: {item.price}</p>
                  </div>
                </Card>
              )}
            </div>
          </div>
        </TabsContent>
        <TabsContent value="shipping">
          <div className="mt-4 space-y-4">
            <h3 className="font-semibold">Shipping Information</h3>
            {/* <p>Shipping method: {orderStatus.shippingMethod}</p> */}
            <p>Estimated delivery: {new Date(order?.orderDate).toLocaleDateString() + " +3 Days"}</p>
            <p>Tracking number: {order?.trackingNumber || 'Not available yet'}</p>
          </div>
        </TabsContent>
        <TabsContent value="payment">
          <div className="mt-4 space-y-4">
            <h3 className="font-semibold">Payment Details</h3>
            <p>Payment method: {order?.paymentMethod || "Cash on Delivery"}</p>
            <p>Total charged: ${order?.totalPrice}</p>
            <p>Payment status: {order?.paymentStatus || "Pending"}</p>
          </div>
        </TabsContent>
      </Tabs>
    </div >
  )

}