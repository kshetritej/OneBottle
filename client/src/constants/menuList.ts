import { WineIcon, Shapes, Users2, LayoutDashboardIcon, ShoppingCartIcon, MessageCircleWarning } from "lucide-react";

export const menuItems = [
  {
    title: "Dashboard",
    url: "/admin/dashboard",
    icon: LayoutDashboardIcon,
  },
  // {
  //   title: "Inbox",
  //   url: "/admin/inbox",
  //   icon: Inbox,
  // },
  {
    title: "Categories",
    url: "/admin/categories",
    icon: Shapes,
  },
  {
    title: "Products",
    url: "/admin/products",
    icon: WineIcon,
  },
  {
    title: "Orders",
    url: "/admin/orders",
    icon: ShoppingCartIcon,
  },
  {
    title: "Users",
    url: "/admin/users",
    icon: Users2,
  },
  {
    title: "Reviews",
    url: "/admin/reviews",
    icon: MessageCircleWarning,
  },
]