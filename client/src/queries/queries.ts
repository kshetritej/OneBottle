import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "../hooks/use-toast";

const baseUrl = import.meta.env.VITE_API_URL as string;

export function useGetProducts() {
    return useQuery({
        queryKey: ['products'],
        queryFn: async () => {
            const response = await axios.get(`${baseUrl}/product`);
            return response;
        }
    });
}

export function useGetProductById(id: string) {
    return useQuery({
        queryKey: ['product', id],
        queryFn: async () => {
            const response = await axios.get(`${baseUrl}/product/${id}`);
            return response;
        }
    });
}

export function useGetCategories() {
    return useQuery({
        queryKey: ['getCategories'],
        queryFn: async () => {
            const response = await axios.get(`${baseUrl}/category`);
            return response;
        }
    });
}

export function useGetCategoryById(id: string) {
    return useQuery({
        queryKey: ['category', id],
        queryFn: async () => {
            const response = await axios.get(`${baseUrl}/category/${id}`);
            return response;
        }
    });
}

export function useGetCartItems() {
    return useQuery({
        queryKey: ['cartItems'],
        queryFn: async () => {
            const response = await axios.get(`${baseUrl}/cart`);
            return response;
        }
    });
}

export function useAddProduct() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: ['addProduct'],
        mutationFn: async (data: any) => {
            const response = await axios.post(`${baseUrl}/product`, data);
            return response;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['products'] });
            toast({
                title: "Product added successfully",
                variant: "success",
            });
        }
    });
}

export function useUpdateProduct() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: ['updateProduct'],
        mutationFn: async (data: any) => {
            const response = await axios.put(`${baseUrl}/product/${data.productId}`, data);
            return response;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['products'] });
            toast({
                title: "Product updated successfully",
                variant: "success",
            });
        }
    });
}

export const useRemoveProduct = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: ['removeProduct'],
        mutationFn: async ({ id }: { id: string }) => {
            const response = await axios.delete(`${baseUrl}/product/${id}`);
            return response;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['products'] });
            toast({
                title: "Product deleted successfully",
                variant: "success",
            });
        }
    });
};
export function useRemoveCartItem() {
    const queryClient = useQueryClient(); // Use queryClient hook

    return useMutation({
        mutationKey: ['removeCartItem'],
        mutationFn: async (id: string) => {
            const response = await axios.delete(`${baseUrl}/cart?cartId=${id}`);
            return response;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['cartItems'] }); // Invalidate the cart items query
            toast({
                title: "Cart item removed successfully",
                variant: "success",
            });
        },
        onError: (error) => {
            toast({
                title: "Failed to remove cart item",
                description: `Error: ${error.message || 'Unknown error'}`,
                variant: "destructive",
            });
        }
    });
}

export function useAddCartItem() {
    const queryClient = useQueryClient(); // Use queryClient hook

    return useMutation({
        mutationKey: ['addCartItem'],
        mutationFn: async (data: any) => {
            const response = await axios.post(`${baseUrl}/cart`, data);
            return response;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['cartItems'] }); // Invalidate the cart items query
            toast({
                title: "Cart item added successfully",
                variant: "success",
            });
        },
        onError: (error) => {
            toast({
                title: "Failed to add cart item",
                description: `Error: ${error.message || 'Unknown error'}`,
                variant: "destructive",
            });
        }
    });
}

export function useAddCategory() {
    const queryClient = useQueryClient(); // Use queryClient hook

    return useMutation({
        mutationKey: ['addCategory'],
        mutationFn: async (data: any) => {
            const response = await axios.post(`${baseUrl}/category`, data);
            return response;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['getCategories'] }); // Invalidate the categories query
            toast({
                title: "Category added successfully",
                variant: "success",
            });
        },
        onError: (error) => {
            toast({
                title: "Failed to add category",
                description: `Error: ${error.message || 'Unknown error'}`,
                variant: "destructive",
            });
        },
    });
}

export function useRemoveCategory() {
    const queryClient = useQueryClient(); // Use queryClient hook

    return useMutation({
        mutationKey: ['deleteCategory'],
        mutationFn: async ({ id }: { id: string }) => {
            const response = await axios.delete(`${baseUrl}/category/${id}`);
            return response;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['getCategories'] }); // Invalidate the categories query
            toast({
                title: "Category deleted successfully",
                description: "The category has been removed from the list.",
                variant: "success",
            });
        },
        onError: (error) => {
            toast({
                title: "Failed to delete category",
                description: `Error: ${error.message || 'Unknown error'}`,
                variant: "destructive",
            });
        }
    });
}

export function useUpdateCategory() {
    const queryClient = useQueryClient(); // Use queryClient hook

    return useMutation({
        mutationKey: ['updateCategory'],
        mutationFn: async (data: any) => {
            const response = await axios.put(`${baseUrl}/category/${data.catId}`, data);
            return response;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['getCategories'] }); // Invalidate the categories query
            toast({
                title: "Category updated successfully",
                variant: "success",
            });
        },
        onError: (error) => {
            toast({
                title: "Failed to update category",
                description: `Error: ${error.message || 'Unknown error'}`,
                variant: "destructive",
            });
        }
    });
}
