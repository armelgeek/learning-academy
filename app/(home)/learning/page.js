import {db} from "@/lib/db"
import {auth} from "@clerk/nextjs/server"
import {redirect} from "next/navigation"
import {getProgress} from "@/app/actions/getProgress";
import CoursesList from "@/components/courses/CourseList";
import InfoCard from "@/components/custom/InfoCard";
import { CheckCheckIcon, Clock } from 'lucide-react';

const LearningPage = async () => {
    const { userId } = auth()

    if (!userId) {
        return redirect('/sign-in')
    }

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
    const coursesInProgress = courses.filter((course) => course.progress !== 100)

    return (
        <div className="px-4 py-6 md:mt-5 md:px-10 xl:px-16">
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
    )
}

export default LearningPage
