
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import NavBarRoutes from "@/components/layout/NavBarRoutes";
import MobileSideBar from "@/components/profile/MobileSideBar";
const NavBar = async ({createdProfile}) => {
    const { userId } = auth();
    let username = ""

    if(userId) {
        const user = await db.user.findUnique({
            where : {
                id : userId
            }
        })

        username = user?.name || ""
    }

    return (
        <div className="p-4 border-b h-full flex items-center bg-white shadow-sm">
            <MobileSideBar createdProfile = { createdProfile } />

            <NavBarRoutes username = {username} />
        </div>
    );
}

export default NavBar;
