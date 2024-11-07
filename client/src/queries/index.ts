import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
const baseUrl = import.meta.env.VITE_API_URL as string;


export class Query {
    queryClient = new QueryClient();
    getProducts = useQuery({
        queryKey: ['products'],
        queryFn: async () => {
            const response = await fetch(`${baseUrl}/product`);
            const data = await response.json();
            return data;
        }
    });

    getProductById(id: string) {
        return useQuery({
            queryKey: ['product', id],
            queryFn: async () => {
                const response = await fetch(`${baseUrl}/product/${id}`);
                const data = await response.json();
                return data;
            }
        });
    }

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

    getCartItems = useQuery({
        queryKey: ['cartItems'],
        queryFn: async () => {
            const response = await fetch(`${baseUrl}/cart`);
            const data = await response.json();
            return data;
        }
    })
    removeCartItem = useMutation({
        mutationKey: ['removeCartItem'],
        mutationFn: async (id: string) => {
            const response = await axios.delete(`${baseUrl}/cart?cartId=${id}`);
            return response;
        },
        onSuccess: () => {
            this.queryClient.invalidateQueries({ queryKey: ['cartItems'] });
        }
    })
    addCartItem = useMutation({
        mutationKey: ['addCartItem'],
        mutationFn: async (data: any) => {
            const response = await axios.post(`${baseUrl}/cart`, data);
            return response;
        },
        onSuccess: () => {
            this.queryClient.invalidateQueries({ queryKey: ['cartItems'] });
        }
    })

    addCategory = useMutation({
        mutationKey: ['addCategory'],
        mutationFn: async (data: any) => {
            const response = await axios.post(`${baseUrl}/category`, data);
            return response;
        },
        onSuccess: () => {
            this.queryClient.invalidateQueries({ queryKey: ['getCategories'] });
        }
    })
    removeCategory = useMutation({
        mutationKey: ['deleteCategory'],
        mutationFn: async ({ id }: any) => axios.delete(`${baseUrl}/category/${id}`),
        onSuccess: () => {
            this.queryClient.invalidateQueries({ queryKey: ['getCategories'] });
        }
    })
}

