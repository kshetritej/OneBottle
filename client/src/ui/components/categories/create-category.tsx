import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription } from "../../../components/ui/dialog";
import { DialogHeader } from "../../../components/ui/dialog";
import { Edit, Edit2, PlusCircle } from "lucide-react";
import { Button } from "../../../components/ui/button";
import { useForm } from "react-hook-form";
import { Label } from "../../../components/ui/label";
import { Input } from "../../../components/ui/input";
import { Textarea } from "../../../components/ui/textarea";
import { useAddCategory, useUpdateCategory } from "../../../queries/queries";
import { Category } from "./category-list";

type editProps = {
    mode?: any,
    category?: Category
    open?: boolean
}
export function CreateCategoryModal({ category, mode, open }: editProps) {
    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            name: mode ? category?.name : "",
            description: mode ? category?.description : ""
        }
    });
    const createCategory = useAddCategory();
    const updateCategory = useUpdateCategory();

    function handleFormSubmit(data: any) {
        const catId = category?.categoryId;
        mode ? updateCategory.mutate({ catId, ...data }) :
            createCategory.mutate(data);
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                {
                    mode ? <Button variant={'secondary'} size={'sm'}><Edit2 /></Button> : <Button> Add New <PlusCircle className="ml-2" /></Button>
                }
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{mode ? "Update Category Details" : "Add New Category"}</DialogTitle>
                    <DialogDescription>
                        <form onSubmit={handleSubmit(handleFormSubmit)} className="flex flex-col gap-2">
                            <div className="flex flex-col gap-2">
                                <Label htmlFor="name">Name</Label>
                                <Input {...register("name")} type="text" name="name" />
                            </div>
                            <div className="flex flex-col gap-2">
                                <Label htmlFor="description">Description</Label>
                                <Textarea {...register("description")} name="description" id="description" cols={30} rows={10} />
                            </div>
                            <div className="flex justify-end p-4">
                                <Button>Create</Button>
                            </div>
                        </form>
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>

    )
}