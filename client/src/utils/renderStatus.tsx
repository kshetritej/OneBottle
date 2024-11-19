export function renderStatus(status: string) {
    switch (status) {
        case "processing":
            return <span className="text-white border-2 border-yellow-500 py-1 px-2 rounded-2xl  ">Processing</span>
        case "shipped":
            return <span className="text-white border-2 border-orange-500 py-1 px-2 rounded-2xl  ">Shipped</span>
        case "delivered":
            return <span className="text-white border-2 border-green-500 py-1 px-2 rounded-2xl  ">Delivered</span>
        default:
            return <span className="text-white border-2 border-red-500 py-1 px-2 rounded-2xl  ">Cancelled</span>
    }
}