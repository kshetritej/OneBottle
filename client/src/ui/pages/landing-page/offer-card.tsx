import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card"

export default function OfferCard() {
    const [isHovered, setIsHovered] = useState(false)

    return (
        <Card
            className="w-full max-w-md bg-black border-zinc-800 transition-all duration-300 cursor-pointer"
            style={{
                transform: isHovered ? 'translateY(-5px)' : 'translateY(0)',
                boxShadow: isHovered ? '0 10px 15px -3px rgba(255, 255, 255, 0.1)' : 'none'
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <CardHeader>
                <CardTitle className="text-white">Special Offer</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-zinc-400">
                    Get 10% off on your first order! Use code:{' '}
                    <span
                        className="text-zinc-300 transition-colors duration-300"
                        style={{ color: isHovered ? '#ffffff' : '' }}
                    >
                        WELCOME10
                    </span>
                </p>
            </CardContent>
        </Card>
    )
}