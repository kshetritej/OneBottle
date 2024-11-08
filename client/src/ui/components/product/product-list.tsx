import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "../../../components/ui/table";
import { Query } from "../../../queries";
import { Card } from "../../../components/ui/card";
import { CreateProductModal } from "./create-product";
import { DeleteDialog } from "../delete-dialog";
import { useRemoveProduct } from "../../../queries/queries";

export type Product = {
    productId: string;
    name: string;
    imageUrl: string;
    description: string;
    brand: string;
    volume: number;
    abv: number;
    categoryId?: string;
    price: number;
    stockQuantity: number;
};

export function ProductTable() {
    const products = new Query().getProducts.data as Product[];
    const removeProduct = useRemoveProduct();

    function handleDelete(id: string) {
        removeProduct.mutate({ id });
    }

    return (
        <>
            <Card className="p-4">
                <div className="flex flex-col w-full">
                    <div className="flex justify-between">
                        <h2 className="font-bold text-2xl">Manage Products</h2>
                        <CreateProductModal />
                    </div>
                    <Table>
                        <TableCaption>A list of products in inventory.</TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Brand</TableHead>
                                <TableHead>Volume</TableHead>
                                <TableHead>ABV</TableHead>
                                <TableHead>Price</TableHead>
                                <TableHead>Stock</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {products?.map((product) => (
                                <TableRow key={product.productId}>
                                    <TableCell className="font-medium">{product.name}</TableCell>
                                    <TableCell>{product.brand}</TableCell>
                                    <TableCell>{product.volume} ml</TableCell>
                                    <TableCell>{product.abv}%</TableCell>
                                    <TableCell>${product.price}</TableCell>
                                    <TableCell>{product.stockQuantity}</TableCell>
                                    <TableCell className="flex gap-4">
                                        <CreateProductModal product={product} mode="update" />
                                        <DeleteDialog onDelete={() => handleDelete(product.productId)} />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </Card>
        </>
    );
}
