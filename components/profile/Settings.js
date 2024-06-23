
import { Button } from "@/components/ui/button";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {usePathname, useRouter} from "next/navigation";
import { FormProvider, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import z from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {useState} from "react";
import axios from "axios";

const SHEET_SIDES = ["top", "right", "bottom", "left"];

const Settings = ({icon: Icon,  label, name, username  }) => {
    const pathname = usePathname();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const onClick = () => {
        console.log("Cliqué!!!");
    }

    const formSchema = z.object({
        name: z.string().min(1, {
            message: "Le nom est trop court"
        }),
        username: z.string().min(1, {
            message: "Le nom d'utilisateur est trop court"
        })
    });

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: name || "",
            username: username || "",
        }
    });
    const methods = useForm();

    const { isSubmitting, isValid } = form.formState;

    const onSubmit = async (values) => {
        try {
            setIsLoading(true);
            await axios.patch("/api/profile", values);
            toast.success("Profil modifié avec succès");
            router.refresh();
        } catch(err){
                console.log(err);
            toast.error("Une erreur s'est produite");
        } finally {
            setIsLoading(false);
        }


    }

    return (
        <div className="grid grid-cols-2 gap-2">
            <Sheet>
                <SheetTrigger asChild aria-controls="radix-:Rl6rcq:">
                    <button
                        type="button"
                        onClick={onClick}>
                        Modifier
                    </button>
                </SheetTrigger>
                <SheetContent>
                    <SheetHeader>
                        <SheetTitle>{label}</SheetTitle>
                        <SheetDescription>
                            {"Modifiez votre nom et votre nom d'utilisateur. Les modifications seront visibles pour les autres."}
                        </SheetDescription>
                    </SheetHeader>
                    <FormProvider {...methods}>
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
                            <Label>
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
                            <SheetFooter>
                                <SheetClose asChild>
                                    <Button type="submit" className="bg-blue-900 hover:bg-blue-900/80 mt-4" aria-controls="radix-:Rl6rcq:"
                                            disabled={!isValid || isSubmitting}>
                                        Sauvegarder les modifications
                                    </Button>
                                </SheetClose>
                            </SheetFooter>
                        </form>
                    </FormProvider>
                </SheetContent>
            </Sheet>
        </div>
    );
}

export default Settings;
