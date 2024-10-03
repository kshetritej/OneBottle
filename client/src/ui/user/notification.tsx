import  { useState } from 'react'
import { Bell, Gift, Package, ShoppingCart } from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs"
import { Card, CardContent } from "../../components/ui/card"
import { Badge } from "../../components/ui/badge"
import { Button } from "../../components/ui/button"

// Mock data for notifications
const personalNotifications = [
    { id: 1, type: 'order', title: 'Order Shipped', message: 'Your order #1234 has been shipped.', date: '2024-03-10', icon: <Package className="h-5 w-5" /> },
    { id: 2, type: 'wishlist', title: 'Item Back in Stock', message: 'The Glenlivet 12 Year Old is back in stock!', date: '2024-03-09', icon: <ShoppingCart className="h-5 w-5" /> },
    { id: 3, type: 'order', title: 'Order Delivered', message: 'Your order #1233 has been delivered.', date: '2024-03-08', icon: <Package className="h-5 w-5" /> },
]

const promotionalNotifications = [
    { id: 1, title: 'Weekend Sale!', message: 'Enjoy 20% off on all whiskeys this weekend.', date: '2024-03-10', icon: <Gift className="h-5 w-5" /> },
    { id: 2, title: 'New Arrival', message: 'Discover our latest collection of craft beers.', date: '2024-03-09', icon: <Bell className="h-5 w-5" /> },
    { id: 3, title: 'Limited Time Offer', message: 'Buy any two wines and get one free!', date: '2024-03-08', icon: <Gift className="h-5 w-5" /> },
]

export default function NotificationsPage() {
    const [activeTab, setActiveTab] = useState("personal")

    const renderNotification = (notification:any) => (
        <Card key={notification.id} className="mb-4">
            <CardContent className="flex items-start p-4">
                <div className="mr-4 mt-1">
                    {notification.icon}
                </div>
                <div className="flex-1">
                    <h3 className="font-semibold">{notification.title}</h3>
                    <p className="text-sm text-gray-600">{notification.message}</p>
                    <p className="text-xs text-gray-400 mt-1">{notification.date}</p>
                </div>
                {notification.type === 'wishlist' && (
                    <Button size="sm" className="ml-2">View</Button>
                )}
            </CardContent>
        </Card>
    )

    return (
        <div className="container mx-auto p-4 max-w-2xl">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Notifications</h1>
                <Badge variant="secondary">
                    {personalNotifications.length + promotionalNotifications.length} New
                </Badge>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-4">
                    <TabsTrigger value="personal">Personal</TabsTrigger>
                    <TabsTrigger value="promotional">Promotional</TabsTrigger>
                </TabsList>
                <TabsContent value="personal">
                    {personalNotifications.length > 0 ? (
                        personalNotifications.map(renderNotification)
                    ) : (
                        <p className="text-center text-gray-500">No personal notifications</p>
                    )}
                </TabsContent>
                <TabsContent value="promotional">
                    {promotionalNotifications.length > 0 ? (
                        promotionalNotifications.map(renderNotification)
                    ) : (
                        <p className="text-center text-gray-500">No promotional notifications</p>
                    )}
                </TabsContent>
            </Tabs>
        </div>
    )
}