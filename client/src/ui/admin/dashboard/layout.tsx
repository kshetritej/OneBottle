import { SidebarInset, SidebarProvider, SidebarTrigger } from "../../../components/ui/sidebar"
import { AppSidebar } from "../../../components/app-sidebar"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="max-h-[100vh] ">
        <SidebarTrigger />
        <main className="max-h-[100vh] w-full">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
