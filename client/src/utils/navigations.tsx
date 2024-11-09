import { BellRing, Home, User } from "lucide-react";
import { Cart } from "../ui/pages/user/cart";

const isLoggedIn = true
export const navigations = [
    {
        label: "Home",
        path: "/",
        icon: <Home />,
    },
    {
        label: "cart",
        icon: <Cart />,
        // icon: <ShoppingCart />,
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