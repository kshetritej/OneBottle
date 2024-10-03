import { createFileRoute } from '@tanstack/react-router'
import NotificationsPage from '../ui/user/notification'

export const Route = createFileRoute('/notifications')({
    component: () => <>
        <NotificationsPage />
    </>,
})
