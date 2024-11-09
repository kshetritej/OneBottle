import { BellRing, Home, User, ShoppingBag } from "lucide-react";

const isLoggedIn = true
export const navigations = [
    {
        label: "Home",
        path: "/",
        icon: <Home />,
    },
    {
        label: "cart",
        // icon: <Cart />,
        icon: <ShoppingBag />,
        path: "/cart",
    },
    {
        label: "notifications", path: "/notifications",
        icon: <BellRing />,
    },
    {
        label: "profile", path: isLoggedIn ? "/me" : "/admin/auth",
        icon: <User />,
    },
]