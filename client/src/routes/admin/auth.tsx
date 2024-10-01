import { createFileRoute } from '@tanstack/react-router'
import { AdminAuthentication } from '../../ui/admin/auth/admin-authentication'

export const Route = createFileRoute('/admin/auth')({
  component: () => <>
    <AdminAuthentication />
  </>,
})
