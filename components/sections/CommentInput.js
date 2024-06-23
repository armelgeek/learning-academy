'use client';
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState} from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import z from "zod";
const CommentInput = ({ sectionId, courseId }) => {

    const formSchema = z.object({
        content: z.string().min(1, {
            message: "Le commentaire est trop court"
        })
    })

    const form = useForm({
        resolver : zodResolver(formSchema),
        defaultValues : {
            content : ""
        }
    })
    const { isSubmitting, isValid } = form.formState;
    const onSubmit = async (values) => {
        try {
            console.log(values)
            await axios.post(`/api/courses/${courseId}/sections/${sectionId}/comments`, values)
            toast.success("Commentaire ajouté avec succès");

        } catch {
            toast.error("Quelque chose a mal tourné lors de l'ajout du commentaire");
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
                <FormField
                    control = {form.control}
                    name="content"
                    render = {({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input
                                    placeholder="Vos remarques/questions sur le chapitre."
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="flex items-center gap-x-2">
                    <Button type="submit" disabled={!isValid || isSubmitting} >
                        Enregistrer les modifications
                    </Button>
                </div>
            </form>
        </Form>
    );
}

export default CommentInput;
