import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import CourseSideBarItem from "@/components/courses/CourseSidebarItem";
import CourseProgress from "@/components/courses/CourseProgress";

const CourseSideBar = async ({ course,progressCount }) => {

    const { userId } = auth();

    if(!userId) {
        return redirect("/")
    }

    const purchased = await db.purchase.findMany({
        where :{
            customerId: userId,
            courseId : course.id
        }
    })



    return (
        <div className="h-full border-r flex flex-col overflow-y-auto shadow-sm">
            <div className="p-8 flex flex-col border-b">
                <h1 className="font-semibold">
                    {course.title}
                </h1>
                {!purchased && (
                    <div className="mt-10">
                        <CourseProgress
                            variant = "success"
                            size="default"
                            value = {progressCount}
                        />
                    </div>
                )}
            </div>
            <div className="flex flex-col w-full">
                {course.sections.map((section) => (
                    <CourseSideBarItem
                        key={section.id}
                        id={section.id}
                        label={section.title}
                        isCompleted={!!section.progress?.[0]?.isCompleted}
                        courseId={course.id}
                        isLocked={!section.isFree && !purchased}
                    />
                ))}
            </div>
        </div>
    );
}

export default CourseSideBar;
