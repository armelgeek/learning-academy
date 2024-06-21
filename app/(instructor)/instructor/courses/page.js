import Topbar from "@/components/layout/Topbar";
import Sidebar from "@/components/layout/Sidebar";
import {auth} from "@clerk/nextjs/server";
import {redirect} from "next/navigation";
import {Button} from "@/components/ui/button";
import Link from "next/link";

export default function CoursePage() {
    const { userId } = auth();

    if(!userId) {
        return redirect('/sign-in');
    }
    return (
        <div className="px-6 py-4">
           <Link href="/instructor/create-course"><Button>Create new course</Button></Link>
        </div>
    );
}
