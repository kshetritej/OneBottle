import { Outlet } from '@tanstack/react-router'
import { Navbar } from '../landing-page/navbar'
export const AdminLayout = () => {
    return (
        <>
            <Navbar />
            <Outlet />
        </>
    )
}

