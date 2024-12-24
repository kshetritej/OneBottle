import { BellRing, Home, User, ShoppingBag, ShoppingCart, Flame, Heart } from "lucide-react";

const isLoggedIn = true
export const navigations = [
    {
        label: "Home",
        path: "/",
        icon: <Home />,
        isActive: true ,
        
    },
    {
        label: "Trending",
        path: "/trending",
        icon: <Flame/>,
        isActive: false,
    },
    {
        label: "cart",
        // icon: <Cart />,
        icon: <ShoppingCart/>,
        path: "/cart",
        isActive: false,
    },
    {
        label: "Wishlist",
        // icon: <Cart />,
        icon: <Heart/>,
        path: "/wishlist",
        isActive: false,
    },

]


export const navigationsGroupSecond= [
    {
        label: "notifications", path: "/notifications",
        icon: <BellRing />,
        isActive: false,
    },
    {
        label: "profile", path: isLoggedIn ? "/me" : "/admin/auth",
        icon: <User />,
        isActive: false,
    },
]