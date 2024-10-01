import { createRootRoute } from '@tanstack/react-router'
import { AdminLayout } from '../ui/admin/admin-layout'

export const Route = createRootRoute({
    component: () => (
        <>
            <AdminLayout />
        </>
    ),
})