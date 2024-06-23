'use client';

import { UserButton } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { CoffeeIcon, Link2, LogOut } from "lucide-react";
import Link from "next/link";
import SearchInput from "@/components/custom/SearchInput";

const NavBarRoutes = ({ username  }) => {

    const pathname = usePathname();
    const router = useRouter();

    const isTeacherPage = pathname?.startsWith('/teacher');
    const isPlayerPage = pathname?.includes('/section');
    const isSearchPage = pathname?.includes("/search");

    return (
        <>
            {!isTeacherPage && !isPlayerPage && !isSearchPage && (
                <h2>
                    <div>
                        <h1 className="sm:flex items-start font-semibold text-base  ml-4 sm:text-base md:text-xl lg:text-xl">
                            🎉 Bienvenue de retour <p className="sm:ml-2  text-blue-800 "> {username || ""} </p> ! 🎉
                        </h1>
                    </div>
                </h2>
            )}

            {isSearchPage && (
                <div className="hidden md:block">
                    <SearchInput />
                </div>
            )}

            <div className="flex gap-x-2 ml-auto">
                {isTeacherPage || isPlayerPage ? (
                    <Link href="/">
                        <Button size="sm" variant="ghost">
                            <LogOut className="h-4 w-4 mr-2"/>
                            Déconnexion
                        </Button>
                    </Link>
                ) : (
                    <Link href="/teacher/courses">
                        <Button size="sm" variant="ghost">
                            <CoffeeIcon className="h-4 w-4 mr-2" />
                            Devenir enseignant
                        </Button>
                    </Link>
                )}
                <UserButton
                    afterSignOutUrl="/"
                />
            </div>
        </>
    );
}

export default NavBarRoutes;
