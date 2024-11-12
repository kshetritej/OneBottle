import { createFileRoute } from '@tanstack/react-router'
import { OrderSummary } from '../ui/components/order/order-summary'

export const Route = createFileRoute('/order-summary')({
    component: () => <OrderSummary />,
})
