import { useQuery } from "@tanstack/react-query";
const baseUrl = import.meta.env.VITE_API_URL as string;

export class Query {
    getProducts = useQuery({
        queryKey: ['products'],
        queryFn: async () => {
            const response = await fetch(`${baseUrl}/product`);
            const data = await response.json();
            return data;
        }
    });
    getCategories = useQuery({
        queryKey: ["getCategories"],
        queryFn: async () => {
            const response = await fetch(`${baseUrl}/category`);
            const data = await response.json();
            return data;
        }
    })
    getCategoryById(id: string) {
        return useQuery({
            queryKey: ['category', id],
            queryFn: async () => {
                const response = await fetch(`${baseUrl}/category/${id}`);
                const data = await response.json();
                return data;
            }
        });
    }
}

