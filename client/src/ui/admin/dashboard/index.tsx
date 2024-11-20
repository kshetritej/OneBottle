import Layout from "./layout";
import { ShoppingCart, DollarSign, Package, AlertCircle, ChevronRight } from 'lucide-react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../../../components/ui/card"
import { Button } from "../../../components/ui/button"
import { ScrollArea } from "../../../components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "../../../components/ui/avatar"
import { Bar, BarChart } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "../../../components/ui/chart"
import { renderStatus } from "../../../utils/renderStatus";


export function Dashboard() {
    // Mock API response data
    const dashboardData = {
        metrics: [
            { id: 1, title: "Total Sales", value: "$12,345", change: "+18%", icon: DollarSign },
            { id: 2, title: "Orders", value: "258", change: "+23", icon: ShoppingCart },
            { id: 3, title: "Inventory", value: "1,234", change: "86 low stock", icon: Package },
            { id: 4, title: "Alerts", value: "5", change: "3 urgent", icon: AlertCircle },
        ],
        recentOrders: [
            { id: "1234", customer: { name: "John Doe", avatar: "/avatars/john-doe.png" }, total: "$89.99", status: "Shipped" },
            { id: "1235", customer: { name: "Sarah Smith", avatar: "/avatars/sarah-smith.png" }, total: "$156.50", status: "Processing" },
            { id: "1236", customer: { name: "Mike Johnson", avatar: "/avatars/mike-johnson.png" }, total: "$49.99", status: "Delivered" },
            { id: "1237", customer: { name: "Emily Brown", avatar: "/avatars/emily-brown.png" }, total: "$123.45", status: "Pending" },
            { id: "1238", customer: { name: "Alex Wilson", avatar: "/avatars/alex-wilson.png" }, total: "$78.50", status: "Shipped" },
        ],
        productStock: [
            { name: "Vodka", stock: 150 },
            { name: "Whiskey", stock: 120 },
            { name: "Gin", stock: 90 },
            { name: "Rum", stock: 80 },
            { name: "Tequila", stock: 60 },
            { name: "Wine", stock: 200 },
            { name: "Beer", stock: 300 },
        ]
    }

    return (
        <Layout>
            <ScrollArea className="h-screen">
                <div className="flex flex-col space-y-6 p-4">
                    <div className="space-y-2">
                        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
                        <p className="text-muted-foreground">Welcome back, Admin</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        {dashboardData.metrics.map((metric) => (
                            <Card key={metric.id}>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
                                    <metric.icon className="h-4 w-4 text-muted-foreground" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">{metric.value}</div>
                                    <p className="text-xs text-muted-foreground">{metric.change}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    <Card>
                        <CardHeader>
                            <CardTitle>Product Stock Levels</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ChartContainer
                                config={{
                                    stock: {
                                        label: "Stock",
                                        color: "hsl(var(--chart-1))",
                                    },
                                }}
                                className="h-[200px]"
                            >
                                <BarChart data={dashboardData.productStock}>
                                    <Bar dataKey="stock" fill="var(--color-stock)" />
                                    <ChartTooltip content={<ChartTooltipContent />} />
                                </BarChart>
                            </ChartContainer>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Recent Orders</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-8">
                                {dashboardData.recentOrders.map((order) => (
                                    <div key={order.id} className="flex items-center">
                                        <Avatar className="h-9 w-9">
                                            <AvatarImage src={order.customer.avatar} alt={order.customer.name} />
                                            <AvatarFallback>{order.customer.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                                        </Avatar>
                                        <div className="ml-4 space-y-1">
                                            <p className="text-sm font-medium leading-none">{order.customer.name}</p>
                                            <p className="text-sm text-muted-foreground">Order #{order.id}</p>
                                        </div>
                                        <div className="ml-auto font-medium">
                                            {order.total}
                                        </div>
                                        <div
                                            className="text-xs ml-2">
                                            {renderStatus(order.status.toLowerCase())}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button variant="ghost" className="w-full">
                                View All Orders
                                <ChevronRight className="ml-2 h-4 w-4" />
                            </Button>
                        </CardFooter>
                    </Card>

                    <Button>Add New Product</Button>
                </div>
            </ScrollArea>
        </Layout>
    )
}
