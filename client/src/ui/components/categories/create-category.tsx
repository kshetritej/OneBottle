import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription } from "../../../components/ui/dialog";
import { DialogHeader } from "../../../components/ui/dialog";
import { PlusIcon } from "lucide-react";
import { Button } from "../../../components/ui/button";
import { useForm } from "react-hook-form";
import { Label } from "../../../components/ui/label";
import { Input } from "../../../components/ui/input";
import { Textarea } from "../../../components/ui/textarea";
import { Query } from "../../../queries";

export function CreateCategoryModal() {
    const { register, handleSubmit } = useForm();
    const createCategory = new Query().addCategory;
    function handleFormSubmit(data: any) {
        createCategory.mutate(data);
    }
    return (
        <Dialog >
            <DialogTrigger asChild>
                <Button>
                    Add new Category <PlusIcon />
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add New Category</DialogTitle>
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