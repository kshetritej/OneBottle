import { createLazyFileRoute } from '@tanstack/react-router'
import { Homepage } from '../ui/pages/homepage'

export const Route = createLazyFileRoute('/')({
  component: () => <>
    <Homepage />
  </>,
})
