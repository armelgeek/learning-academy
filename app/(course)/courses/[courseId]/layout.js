
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import {getProgress} from "@/app/actions/getProgress";
import CourseNavBar from "@/components/courses/CourseNavBar";
import CourseSideBar from "@/components/courses/CourseSidebar";

const CourseDetailsLayout = async ({ children, params }) => {
    const { userId } = auth();

    if (!userId) {
        return redirect("/sign-in");
    }

    const course = await db.course.findUnique({
        where: {
            id: params.courseId,
        },
        include: {
            sections: {
                where: {
                    isPublished: true,
                },
                orderBy: {
                    position: "asc",
                },
            },
        },
    });

    if (!course) {
        return redirect("/");
    }

    const progressCount = await getProgress(userId, course.id);

    return (
        <div className="h-full">
            <div className="h-[80px] md:pl-80 fixed inset-y-0 w-full z-50">
                <CourseNavBar
                    course={course}
                    progressCount={progressCount}
                />
            </div>
            <div className="hidden md:flex h-full w-80 flex-col fixed inset-y-0 z-50">
                <CourseSideBar
                    course={course}
                    progressCount={progressCount}
                />
            </div>
            <main className="md:pl-80 pt-[80px] h-full">
                {children}
            </main>
        </div>
    );
};

export default CourseDetailsLayout;
