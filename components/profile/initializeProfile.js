'use client';

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { zodResolver } from "@hookform/resolvers/zod"
import axios from "axios"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import z from "zod"
import { Contact2 } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { Label } from "@/components/ui/label"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { DialogTrigger } from "@radix-ui/react-dialog";

const InitializeProfileBox = ({ isOpen }) => {

    const [isLoading, setIsLoading] = useState(false)

    const formSchema = z.object({
        name: z.string().min(1, {
            message: "Le nom est trop court"
        }).max(30),
        username: z.string().min(1, {
            message: "Le nom d'utilisateur est trop court"
        }).max(30),

    })

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            username: ""
        }
    })

    const { isSubmitting, isValid } = form.formState;

    const router = useRouter();

    const onSubmit = async (values) => {
        try {
            setIsLoading(true);
            await axios.post("/api/profile", values)
            toast.success("Utilisateur créé avec succès");
            router.refresh();

        } catch (error) {
            console.error("Erreur lors de la création de l'utilisateur :", error);
            toast.error("Erreur lors de la création de l'utilisateur");
        } finally {
            setIsLoading(false);
            isOpen = false;
        }
    }

    return (
        <Dialog open={isOpen}  aria-controls="radix-:R1mcq:">
            <DialogContent aria-controls="radix-:R1mcq:">
                <DialogHeader>
                    <div className="mb-10">
                        Logo
                    </div>
                    <DialogTitle className="flex flex-col mb-3" aria-controls="radix-:R1mcq:">
                        <Contact2 className="mb-3" />
                        Créer un profil
                    </DialogTitle>
                    <DialogDescription className="mt-3" aria-controls="radix-:R1mcq:">
                        {"Créez votre profil pour commencer à apprendre. Votre nom et votre nom d'utilisateur seront visibles par les autres utilisateurs."}
                    </DialogDescription>
                </DialogHeader>
                <Label>
                    Nom
                </Label>
                <Separator className="bg-slate-800 w-[30px] text-bold" />
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem className="mt-4 mb-6">
                                    <FormControl>
                                        <Input
                                            placeholder="Entrez votre nom..."
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Label >
                            {"Nom d'utilisateur"}
                        </Label>
                        <Separator className="bg-slate-800 w-[45px] mt-3 text-bold" />
                        <FormField
                            control={form.control}
                            name="username"
                            render={({ field }) => (
                                <FormItem className="mt-8">
                                    <FormControl>
                                        <Input
                                            placeholder="Entrez votre nom d'utilisateur..."
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="flex items-center gap-x-2">
                            <DialogTrigger>
                                <Button type="submit" className="bg-blue-800 mt-4 bottom-0" aria-controls="radix-:R1mcq:" disabled={!isValid || isSubmitting}>
                                    {"Créer l'utilisateur"}
                                </Button>
                            </DialogTrigger>
                        </div>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}

export default InitializeProfileBox;
