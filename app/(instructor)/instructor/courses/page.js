import Topbar from "@/components/layout/Topbar";
import Sidebar from "@/components/layout/Sidebar";
import {auth} from "@clerk/nextjs/server";
import {redirect} from "next/navigation";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {DataTable} from "@/components/custom/DataTable";
import { columns } from "@/components/courses/Columns";
import {db} from "@/lib/db";
export default async function CoursePage() {
    const { userId } = auth();

    if (!userId) {
        return redirect("/sign-in");
    }

    const courses = await db.course.findMany({
        where: {
            instructorId: userId,
        },
        orderBy: {
            createdAt: "desc",
        },
    });
    return (
        <div className="px-6 py-4">
            <Link href="/instructor/create-course"><Button>Create new course</Button></Link>
            <div className="mt-5">
                <DataTable columns={columns} data={courses}/>
            </div>
        </div>
    );
}
