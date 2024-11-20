import { SidebarInset, SidebarProvider, SidebarTrigger } from "../../../components/ui/sidebar"
import { AppSidebar } from "../../../components/app-sidebar"
import { Navigate } from "@tanstack/react-router";

export default function Layout({ children }: { children: React.ReactNode }) {

  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const isAdmin = user.isAdmin;

  if (!isAdmin) {
    return <Navigate to="/admin/auth" />;
  }
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="w-full my-3">
        <SidebarTrigger />
        <main className="p-4 max-h-[90vh] w-full">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
