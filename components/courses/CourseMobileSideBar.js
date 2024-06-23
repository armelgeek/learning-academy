import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import CourseSideBar from "@/components/courses/CourseSidebar";

const CourseMobileSideBar = ({ course,  progressCount }) => {
    return (
        <div>
            <Sheet>
                <SheetTrigger className="md:hidden pr-4 hover:opacity-75 transition">
                    <Menu />
                </SheetTrigger>
                <SheetContent>
                    <CourseSideBar
                        course={course}
                        progressCount={progressCount}
                    />
                </SheetContent>
            </Sheet>
        </div>
    );
}

export default CourseMobileSideBar;
