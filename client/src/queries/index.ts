import { useQuery } from "@tanstack/react-query";
const baseUrl = import.meta.env.VITE_API_URL as string;

export class Query{
    getProducts = useQuery({
        queryKey: ['products'],
        queryFn: async () => {
            const response = await fetch(`${baseUrl}/product`);
            const data = await response.json();
            return data;
        }
    });
}

