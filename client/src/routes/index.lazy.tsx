import { createLazyFileRoute } from '@tanstack/react-router'
import { LandingPageLayout } from '../ui/landing-page/LandingPageLayout'

export const Route = createLazyFileRoute('/')({
  component: () => <>
    <LandingPageLayout />
  </>,
})
