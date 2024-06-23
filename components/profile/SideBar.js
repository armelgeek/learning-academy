import SideBarRoutes from "./SideBarRoutes";

import {getUserProfile} from "@/app/actions/getUserProfile";
import {auth, redirectToSignIn} from "@clerk/nextjs/server";


const SideBar = async ({ createdProfile  }) => {

    const { userId } = auth();

    if(!userId) {
        return redirectToSignIn();
    }

    const { name , username } = createdProfile ? await getUserProfile() : { name: "", username: "" };

    return (
        <div>
            <div className="flex w-full">
                    <SideBarRoutes
                        name={name}
                        username={username}
                        userId={userId}
                    />
            </div>
        </div>
    );
}

export default SideBar;
