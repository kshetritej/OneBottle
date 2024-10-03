import { BellRing, Home, User } from "lucide-react";
import { Cart } from "../ui/user/cart";

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
        label: "profile", path: "/admin/auth",
        icon: <User />,
    },
]