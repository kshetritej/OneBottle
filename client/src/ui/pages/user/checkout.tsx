import { Banknote, CreditCard, Package } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card"
import { RadioGroup, RadioGroupItem } from "../../../components/ui/radio-group"
import { Label } from "../../../components/ui/label"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "../../../components/ui/select"
import { Button } from "../../../components/ui/button"
import { Input } from "../../../components/ui/input"
import { Separator } from "../../../components/ui/separator"
import { useState } from "react"

export default function Checkout() {
    const [cashOnDelivery, setCashOnDelivery] = useState(true)
    return (
        <div className="min-h-screen bg-background p-6">
            <div className="mx-auto max-w-6xl space-y-8">
                <div className="space-y-2">
                    <h1 className="text-3xl font-bold">Checkout</h1>
                    <p className="text-muted-foreground">Complete your purchase</p>
                </div>
                <div className="grid gap-8 lg:grid-cols-[1fr_400px]">
                    <div className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Package className="h-5 w-5" />
                                    Shipping Information
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="first-name">First name</Label>
                                        <Input id="first-name" placeholder="Enter your first name" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="last-name">Last name</Label>
                                        <Input id="last-name" placeholder="Enter your last name" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input id="email" placeholder="Enter your email" type="email" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="phone">Phone</Label>
                                    <Input id="phone" placeholder="Enter your phone number" type="tel" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="address">Address</Label>
                                    <Input id="address" placeholder="Enter your street address" />
                                </div>
                                <div className="grid grid-cols-3 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="city">City</Label>
                                        <Input id="city" placeholder="City" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="state">State</Label>
                                        <Select>
                                            <SelectTrigger id="state">
                                                <SelectValue placeholder="Select state" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="ny">New York</SelectItem>
                                                <SelectItem value="ca">California</SelectItem>
                                                <SelectItem value="tx">Texas</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="zip">ZIP Code</Label>
                                        <Input id="zip" placeholder="ZIP Code" />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <CreditCard className="h-5 w-5" />
                                    Payment Method
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <RadioGroup defaultValue="card" onValueChange={() => setCashOnDelivery(!cashOnDelivery)} className="grid grid-cols-3 gap-4">
                                    <Label
                                        htmlFor="card"
                                        className="flex cursor-pointer flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary"
                                    >
                                        <RadioGroupItem value="card" id="card" className="sr-only" />
                                        <CreditCard className="mb-3 h-6 w-6" />
                                        Credit Card
                                    </Label>
                                    <Label
                                        htmlFor="cod"
                                        className="flex cursor-pointer flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary"
                                    >
                                        <RadioGroupItem value="cod" id="cod" className="sr-only" />
                                        <Banknote className="mb-3 h-6 w-6" />
                                        Cash on Delivery
                                    </Label>
                                </RadioGroup>
                                {cashOnDelivery &&
                                    <>
                                        <div className="space-y-4">
                                            <div className="space-y-2">
                                                <Label htmlFor="card-number">Card number</Label>
                                                <Input id="card-number" placeholder="Card number" />
                                            </div>
                                            <div className="grid grid-cols-3 gap-4">
                                                <div className="space-y-2">
                                                    <Label htmlFor="month">Expiry Month</Label>
                                                    <Select>
                                                        <SelectTrigger id="month">
                                                            <SelectValue placeholder="Month" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectItem value="1">January</SelectItem>
                                                            <SelectItem value="2">February</SelectItem>
                                                            <SelectItem value="3">March</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                </div>
                                                <div className="space-y-2">
                                                    <Label htmlFor="year">Expiry Year</Label>
                                                    <Select>
                                                        <SelectTrigger id="year">
                                                            <SelectValue placeholder="Year" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectItem value="2024">2024</SelectItem>
                                                            <SelectItem value="2025">2025</SelectItem>
                                                            <SelectItem value="2026">2026</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                </div>
                                                <div className="space-y-2">
                                                    <Label htmlFor="cvv">CVV</Label>
                                                    <Input id="cvv" placeholder="CVV" />
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                }
                            </CardContent>
                        </Card>
                    </div>
                    <Card>
                        <CardHeader>
                            <CardTitle>Order Summary</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Manang Valley Premium Sweet White</span>
                                    <span>$1025.00</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">New Beer In Town</span>
                                    <span>$500.00</span>
                                </div>
                                <Separator />
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Subtotal</span>
                                    <span>$1525.00</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Shipping</span>
                                    <span>$15.00</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Tax</span>
                                    <span>$152.50</span>
                                </div>
                                <Separator />
                                <div className="flex justify-between font-medium">
                                    <span>Total</span>
                                    <span>$1692.50</span>
                                </div>
                            </div>
                            <Button className="w-full" size="lg">
                                Place Order
                            </Button>
                            <p className="text-center text-sm text-muted-foreground">
                                By placing this order you agree to our Terms of Service and Privacy Policy
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}