import { useState } from 'react'
import { Bell, GiftIcon } from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../components/ui/tabs"
import { Card, CardContent } from "../../../components/ui/card"
import { Badge } from "../../../components/ui/badge"
import { useGetAllNotifications,  useGetPromotionalNotifications } from '../../../queries/queries'

// Mock data for notifications
export default function NotificationsPage() {
    //@ts-ignore
    const userId = JSON.parse(localStorage.getItem('user')).userId
    //@ts-ignore
    const notices = useGetAllNotifications().data?.data;
    const personalNotifications = notices?.filter(notice => notice.userId === userId);

    const promotionalNotifications = useGetPromotionalNotifications().data?.data
    const [activeTab, setActiveTab] = useState("personal")

    const renderNotification = (notification: any) => (
        <Card key={notification.id} className="mb-4">
            <CardContent className="flex items-start p-4">
                <div className="mr-4 mt-1">
                    {notification.notificationType !== 0 ? <Bell /> : <GiftIcon />}
                </div>
                <div className="flex-1">
                    <h3 className="font-semibold">{notification.notificationTitle}</h3>
                    <p className="text-sm text-gray-600">{notification?.notificationContent}</p>
                    <p className="text-xs text-gray-400 mt-1">{new Date(notification.notificationDate).toLocaleDateString()}</p>
                </div>
            </CardContent>
        </Card>
    )

    return (
        <div className="container mx-auto p-4 max-w-2xl">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Notifications</h1>
                <Badge variant="secondary">
                    {personalNotifications?.length + promotionalNotifications?.length} New
                </Badge>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-4">
                    <TabsTrigger value="personal">Personal</TabsTrigger>
                    <TabsTrigger value="promotional">Promotional</TabsTrigger>
                </TabsList>
                <TabsContent value="personal">
                    {personalNotifications?.length > 0 ? (
                        personalNotifications.map(renderNotification)
                    ) : (
                        <p className="text-center text-gray-500">No personal notifications</p>
                    )}
                </TabsContent>
                <TabsContent value="promotional">
                    {promotionalNotifications?.length > 0 ? (
                        promotionalNotifications?.map(renderNotification)
                    ) : (
                        <p className="text-center text-gray-500">No promotional notifications</p>
                    )}
                </TabsContent>
            </Tabs>
        </div>
    )
}