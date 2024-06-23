
import {db} from "@/lib/db"
import {auth} from "@clerk/nextjs/server"
import {redirect} from "next/navigation"
import { BarChart3, Compass, Layout, List, MailIcon, Settings2Icon } from "lucide-react";
import {getProgress} from "@/app/actions/getProgress";
import CoursesList from "@/components/courses/CourseList";
import InfoCard from "@/components/custom/InfoCard";
import { CheckCheckIcon, Clock } from 'lucide-react';
import {getUserProfile} from "@/app/actions/getUserProfile";

const guestRoutes = [
    {
        icon: Layout,
        label: 'Tableau de bord',
        href: "/"
    },
    {
        icon: Compass,
        label: "Explorer...",
        href: "/search"
    },
    {
        icon: MailIcon,
        label: "Messages",
        href: `/chat`
    }
];

const teacherRoutes = [
    {
        icon: List,
        label: 'Cours',
        href: "/teacher/courses"
    },
    {
        icon: BarChart3,
        label: "Analytics",
        href: "/teacher/analytics"
    },
    {
        icon: MailIcon,
        label: "Messages",
        href: `/chat`
    }
];

const LearningPage = async () => {
    const { userId } = auth()

    if (!userId) {
        return redirect('/sign-in')
    }
    let createdProfile = false;

    const userProfile = await db.user.findUnique({
        where : {
            id : userId
        }
    })
    userProfile ? createdProfile = true : createdProfile = false;

    const { name , username } = createdProfile ? await getUserProfile() : { name: "", username: "" };


    const purchasedCourses = await db.purchase.findMany({
        where : {
            customerId: userId
        }, select : {
            course : {
                include : {
                    category : true,
                    sections : {
                        where : {
                            isPublished : true
                        }
                    }
                }
            }
        }
    });

    const courses = purchasedCourses.map((purchase) => purchase.course);

    for(let course of courses) {
        course["progress"] = await getProgress(userId, course.id);
    }

    const completedCourses = courses.filter((course) => course.progress === 100);
    const coursesInProgress = courses.filter((course) => (course.progress ?? 0) < 100)


    return (
        <div className="px-4 py-6 md:mt-5 md:px-10 xl:px-16">
            <div className="flex flex-row gap-2">
                <div className="w-[250px]">

                </div>
                <div className="">
                    <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                        <InfoCard
                            icon={Clock}
                            label="Pas encore terminé"
                            numberOfItems={coursesInProgress.length}
                        />

                        <InfoCard
                            icon={CheckCheckIcon}
                            label="Cours terminés"
                            numberOfItems={completedCourses.length}
                            variant='success'
                        />

                    </div>
                    <h1 className="text-2xl font-bold">
                        Your courses
                    </h1>
                    <div className="flex flex-wrap gap-7 mt-7">
                        <CoursesList items={[...coursesInProgress, ...completedCourses]}/>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default LearningPage
