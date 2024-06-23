'use client';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { LucideIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import z from "zod";

const Settings = ({ icon: Icon, label }) => {

    const pathname = usePathname();
 
    const formSchema = z.object({
        name: z.string().min(1, {
            message: "Le nom est trop court"
        }),
        username: z.string().min(1, {
            message: "Le nom d'utilisateur est trop court"
        })
    });

    const form = useForm({
        resolver : zodResolver(formSchema),
        defaultValues : {
            name : "",
            username : "",
        }
    })



    const onClick = () => {
        console.log(pathname)

    }

    return (
        <div className="grid grid-cols-2 gap-2">

            <Sheet>
                <SheetTrigger asChild>
                    <button
                        type="button"
                        onClick={onClick}
                        className={cn(`
                        flex items-center gap-x-2 text-slate-500 text-sm font-[500] pl-6 transition-all hover:text-slate-600 hover:bg-slate-300/20`
                        )} >
                        <div className="flex items-center gap-x-2 py-4">
                            <Icon
                                size={22}
                                className={cn(`text-slate-500`,)} />

                            {label}
                        </div>
                        <div className={cn(`ml-auto opacity-0 border-2 border-sky-700 h-full transition-all`,)} />
                    </button>
                </SheetTrigger>
                <SheetContent side="left">
                    <SheetHeader>
                        <SheetTitle>Modifier le profil</SheetTitle>
                        <SheetDescription>
                            {"Modifie ton nom et ton nom d'utilisateur. Les changements seront visibles par les autres."}
                        </SheetDescription>
                    </SheetHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">
                                Name
                            </Label>
                            <Input id="name" value="Armel Wanes" className="col-span-3" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="username" className="text-right text-sm">
                                Username
                            </Label>
                            <Input id="username" value="@armelwanes" className="col-span-3" />
                        </div>
                    </div>
                    <SheetFooter>
                        <SheetClose asChild>
                            <Button type="submit" className="bg-blue-900 hover:bg-blue-900/80">Enregistrer les modifications</Button>
                        </SheetClose>
                    </SheetFooter>
                </SheetContent>
            </Sheet>

        </div>
    )
}

export default Settings;
