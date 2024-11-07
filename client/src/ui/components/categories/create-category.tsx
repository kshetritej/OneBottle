import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription } from "../../../components/ui/dialog";
import { DialogHeader } from "../../../components/ui/dialog";
import { PlusCircle, PlusIcon } from "lucide-react";
import { Button } from "../../../components/ui/button";
import { useForm } from "react-hook-form";
import { Label } from "../../../components/ui/label";
import { Input } from "../../../components/ui/input";
import { Textarea } from "../../../components/ui/textarea";
import { useAddCategory, useUpdateCategory } from "../../../queries/queries";
import { useState } from "react";
import { Category } from "./category-list";

type editProps = {
    mode?: any,
    category?: Category
}
export function CreateCategoryModal({ category, mode }: editProps) {
    const { register, handleSubmit } = useForm({
        defaultValues: {
            name: mode ? category?.name : "",
            description: mode ? category?.description : ""
        }
    });
    const createCategory = useAddCategory();
    const updateCategory = useUpdateCategory();
    function handleFormSubmit(data: any) {
        console.log('category id', category?.categoryId)
        const catId = category?.categoryId;
        mode ? updateCategory.mutate({ catId, ...data }) :
            createCategory.mutate(data);
    }
    return (
        <Dialog >
            <DialogTrigger asChild>
                {
                    mode ? <Button variant={'ghost'} size={'sm'}>Edit</Button> : <Button> Add New <PlusCircle className="ml-2" /></Button>
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
                                <Textarea {...register("description")} name="description" id="" cols={30} rows={10}></Textarea>
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