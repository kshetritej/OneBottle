import { useState } from 'react'
import { User, Package, MapPin, CreditCard, Settings, LogOut, History, NotepadText } from 'lucide-react'
import { Button } from "../../../components/ui/button"
import { Input } from "../../../components/ui/input"
import { Label } from "../../../components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../../components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "../../../components/ui/avatar"

// Mock data
// const user = {
//     name: "Jagga Daku",
//     email: "jd@example.com",
//     avatar: "/placeholder.svg?height=100&width=100",
// }
const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : [];

const orders = [
    { id: "ORD001", date: "2024-03-01", total: 129.99, status: "Delivered" },
    { id: "ORD002", date: "2024-02-15", total: 79.50, status: "Processing" },
    { id: "ORD003", date: "2024-01-30", total: 199.99, status: "Shipped" },
]

const addresses = [
    { id: 1, type: "Home", address: "123 Main St, Anytown, AN 12345" },
    { id: 2, type: "Work", address: "456 Office Blvd, Workville, WK 67890" },
]

export default function Profile() {
    const [activeTab, setActiveTab] = useState("personal-info")

    return (
        <div className="container mx-auto p-4 max-w-4xl">
            <div className="flex flex-col md:flex-row gap-6">
                {/* Sidebar */}
                <aside className="w-full md:w-64">
                    <Card>
                        <CardHeader>
                            <div className="flex items-center space-x-4">
                                <Avatar className="w-16 h-16">
                                    <AvatarImage src={user?.avatar} alt={user?.username} />
                                    <AvatarFallback>{user?.username.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                                </Avatar>
                                <div>
                                    <CardTitle>{user?.username}</CardTitle>
                                    <CardDescription>{user?.email}</CardDescription>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <nav className="space-y-2">
                                <Button variant="ghost" className="w-full justify-start" onClick={() => setActiveTab("personal-info")}>
                                    <User className="mr-2 h-4 w-4" /> Personal Info
                                </Button>
                                <Button variant="ghost" className="w-full justify-start" onClick={() => setActiveTab("orders")}>
                                    <History className="mr-2 h-4 w-4" />Purchase History
                                </Button>
                                <Button variant="ghost" className="w-full justify-start" onClick={() => setActiveTab("orders")}>
                                    <NotepadText className="mr-2 h-4 w-4" /> My Reviews
                                </Button>
                                <Button variant="ghost" className="w-full justify-start" onClick={() => setActiveTab("addresses")}>
                                    <MapPin className="mr-2 h-4 w-4" /> Addresses
                                </Button>
                                <Button variant="ghost" className="w-full justify-start" onClick={() => setActiveTab("payment")}>
                                    <CreditCard className="mr-2 h-4 w-4" /> Payment Methods
                                </Button>
                                <Button variant="ghost" className="w-full justify-start" onClick={() => setActiveTab("settings")}>
                                    <Settings className="mr-2 h-4 w-4" /> Account Settings
                                </Button>
                            </nav>
                        </CardContent>
                        <CardFooter>
                            <Button variant="outline" className="w-full">
                                <LogOut className="mr-2 h-4 w-4" /> Log Out
                            </Button>
                        </CardFooter>
                    </Card>
                </aside>

                {/* Main Content */}
                <main className="flex-1">
                    <Tabs value={activeTab} onValueChange={setActiveTab}>
                        <TabsContent value="personal-info">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Personal Information</CardTitle>
                                    <CardDescription>Update your personal details here.</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="full-name">Full Name</Label>
                                        <Input id="full-name" defaultValue={user?.username} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="email">Email</Label>
                                        <Input id="email" type="email" defaultValue={user?.email} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="phone">Phone Number</Label>
                                        <Input id="phone" type="tel" placeholder="Enter your phone number" />
                                    </div>
                                </CardContent>
                                <CardFooter>
                                    <Button>Save Changes</Button>
                                </CardFooter>
                            </Card>
                        </TabsContent>

                        <TabsContent value="orders">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Order History</CardTitle>
                                    <CardDescription>View your past orders and their status.</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        {orders.map((order) => (
                                            <div key={order.id} className="flex justify-between items-center border-b pb-2">
                                                <div>
                                                    <p className="font-medium">{order.id}</p>
                                                    <p className="text-sm text-gray-500">{order.date}</p>
                                                </div>
                                                <div className="text-right">
                                                    <p className="font-medium">${order.total.toFixed(2)}</p>
                                                    <p className="text-sm text-gray-500">{order.status}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="addresses">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Saved Addresses</CardTitle>
                                    <CardDescription>Manage your delivery addresses.</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        {addresses.map((address) => (
                                            <div key={address.id} className="flex justify-between items-center border-b pb-2">
                                                <div>
                                                    <p className="font-medium">{address.type}</p>
                                                    <p className="text-sm text-gray-500">{address.address}</p>
                                                </div>
                                                <Button variant="outline" size="sm">Edit</Button>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                                <CardFooter>
                                    <Button>Add New Address</Button>
                                </CardFooter>
                            </Card>
                        </TabsContent>

                        <TabsContent value="payment">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Payment Methods</CardTitle>
                                    <CardDescription>Manage your payment options.</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <p>Your payment methods will be displayed here.</p>
                                </CardContent>
                                <CardFooter>
                                    <Button>Add Payment Method</Button>
                                </CardFooter>
                            </Card>
                        </TabsContent>

                        <TabsContent value="settings">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Account Settings</CardTitle>
                                    <CardDescription>Manage your account preferences.</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="font-medium">Email Notifications</p>
                                            <p className="text-sm text-gray-500">Receive emails about your orders and account</p>
                                        </div>
                                        <Button variant="outline">Manage</Button>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="font-medium">Password</p>
                                            <p className="text-sm text-gray-500">Change your account password</p>
                                        </div>
                                        <Button variant="outline">Update</Button>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="font-medium">Two-Factor Authentication</p>
                                            <p className="text-sm text-gray-500">Add an extra layer of security to your account</p>
                                        </div>
                                        <Button variant="outline">Enable</Button>
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>
                    </Tabs>
                </main>
            </div>
        </div>
    )
}