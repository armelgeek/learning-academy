'use client';

import Editor from "@/components/editor";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { zodResolver } from "@hookform/resolvers/zod";
import { Contact2, User2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";


const Profile = ({ isOpen }) => {

    const [isDisabled, setIsDisabled] = useState(false);

    const formSchema = z.object({
        name: z.string().min(1, {
            message: "Le nom est trop court"
        }).max(30),
        username: z.string().min(1, {
            message: "Le nom d'utilisateur est trop court"
        }).max(30)
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            username: ""
        }
    })

    const onSubmit = () => {
        // À définir : logique de soumission du formulaire
    }

    return (
        <Dialog open={isOpen}>
            <DialogContent>
                <DialogHeader>
                    <div className="mb-10">

                    </div>
                    <DialogTitle className="flex flex-col">
                        <Contact2 className="mb-3" />
                        Créer un profil
                    </DialogTitle>
                    <DialogDescription>
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
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="flex items-center gap-x-2">
                            <Button type="submit" className="bg-blue-800 mt-4 bottom-0">
                                {"Créer l'utilisateur"}
                            </Button>
                        </div>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}

export default Profile;
