import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import SideBar from "./SideBar";

const MobileSideBar= ({ createdProfile }) => {
    return (
        <Sheet>
            <SheetTrigger className="md:hidden pr-4 hover:opacity-75 transition" aria-controls="radix-:R2mrcq:" >
                <Menu />
            </SheetTrigger>
            <SheetContent side="left" className="p-0 bg-white">
                <SideBar createdProfile = {createdProfile} />
            </SheetContent>
        </Sheet>


    );
}

export default MobileSideBar;
