
import { db } from "@/lib/db";
import {auth, redirectToSignIn} from "@clerk/nextjs/server";
import NavBar from "@/components/layout/NavBar";
import SideBar from "@/components/profile/SideBar";
import InitializeProfileBox from "@/components/profile/initializeProfile";


async function HomeLayout({children}) {

    const { userId } = auth();

    if (!userId) {
        return redirectToSignIn();
    }

    let createdProfile = false;

    const userProfile = await db.user.findUnique({
        where : {
            id : userId
        }
    })

    userProfile ? createdProfile = true : createdProfile = false;


    return (
        <div className="h-full">
            <div className="h-[80px] md:pl-56 fixed inset-y-0 w-full z-50">
                <NavBar
                    createdProfile={createdProfile}
                />
            </div>
            <div className="hidden md:flex h-full w-56 flex-col fixed inset-y-0 z-50">
                <SideBar
                    createdProfile={createdProfile}
                />
            </div>
            <main className="md:pl-56 pt-[80px] h-full">
                <InitializeProfileBox
                    isOpen={!createdProfile}
                />
                {children}
            </main>
        </div>
    )
}

export default HomeLayout
