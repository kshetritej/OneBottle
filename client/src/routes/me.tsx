import { createFileRoute } from '@tanstack/react-router'
import Profile from '../ui/user/profile'

export const Route = createFileRoute('/me')({
  component: () => <>
    <Profile />
  </>,
})
