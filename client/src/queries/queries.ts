import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";

const baseUrl = import.meta.env.VITE_API_URL as string;
const queryClient = new QueryClient();

// Hook for fetching all products
export function useGetProducts() {
    return useQuery({
        queryKey: ['products'],
        queryFn: async () => {
            const response = await fetch(`${baseUrl}/product`);
            return response.json();
        }
    });
}

// Hook for fetching a single product by ID
export function useGetProductById(id: string) {
    return useQuery({
        queryKey: ['product', id],
        queryFn: async () => {
            const response = await fetch(`${baseUrl}/product/${id}`);
            return response.json();
        }
    });
}

// Hook for fetching all categories
export function useGetCategories() {
    return useQuery({
        queryKey: ['getCategories'],
        queryFn: async () => {
            const response = await fetch(`${baseUrl}/category`);
            return response.json();
        }
    });
}

// Hook for fetching a single category by ID
export function useGetCategoryById(id: string) {
    return useQuery({
        queryKey: ['category', id],
        queryFn: async () => {
            const response = await fetch(`${baseUrl}/category/${id}`);
            return response.json();
        }
    });
}

// Hook for fetching cart items
export function useGetCartItems() {
    return useQuery({
        queryKey: ['cartItems'],
        queryFn: async () => {
            const response = await fetch(`${baseUrl}/cart`);
            return response.json();
        }
    });
}

// Mutation hook for removing a cart item
export function useRemoveCartItem() {
    return useMutation({
        mutationKey: ['removeCartItem'],
        mutationFn: async (id: string) => {
            const response = await axios.delete(`${baseUrl}/cart?cartId=${id}`);
            return response;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['cartItems'] });
        }
    });
}

// Mutation hook for adding a cart item
export function useAddCartItem() {
    return useMutation({
        mutationKey: ['addCartItem'],
        mutationFn: async (data: any) => {
            const response = await axios.post(`${baseUrl}/cart`, data);
            return response;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['cartItems'] });
        }
    });
}

// Mutation hook for adding a category
export function useAddCategory() {
    return useMutation({
        mutationKey: ['addCategory'],
        mutationFn: async (data: any) => {
            const response = await axios.post(`${baseUrl}/category`, data);
            return response;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['getCategories'] });
        }
    });
}

// Mutation hook for removing a category
export function useRemoveCategory() {
    return useMutation({
        mutationKey: ['deleteCategory'],
        mutationFn: async ({ id }: { id: string }) => {
            return axios.delete(`${baseUrl}/category/${id}`);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['getCategories'] });
        }
    });
}
