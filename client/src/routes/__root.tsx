import { createRootRoute } from '@tanstack/react-router'
import { DefaultLayout } from '../ui/layout/DefaultLayout'

export const Route = createRootRoute({
    component: () => (
        <>
        <DefaultLayout/>
        </>
    ),
})