import { Category, Course } from "@prisma/client";
import {Gem, BookCopy} from "lucide-react";
import {db} from "@/lib/db";
import Link from "next/link";
import Image from "next/image";
import {IconBadge} from "@/components/custom/IconBadge";
import CourseProgress from "@/components/courses/CourseProgress";

const CourseCard = async (props) => {
    let level;

    if (props.levelId) {
        level = await db.level.findUnique({
            where: {
                id: props.levelId,
            },
        });
    }

    return (
        <Link
            href={`/courses/${props.id}/overview`}
            className="border rounded-lg cursor-pointer"
        >
            <Image
                src={props.imageUrl}
                alt={props.title}
                width={500}
                height={300}
                className="rounded-t-xl w-[320px] h-[180px] object-cover"
            />
            <div className="px-4 py-3 flex flex-col gap-2">
                <h2 className="text-lg font-bold hover:[#FDAB04]">{props.title}</h2>
                <div className="flex justify-between text-sm font-medium">

                    {level && (
                        <div className="flex gap-2">
                            <Gem size={20} />
                            <p>{level.name}</p>
                        </div>
                    )}
                </div>

                <div className="my-3 flex items-center gap-x-2 text-sm md:text-xs">
                    <div className="flex items-center gap-x-1 text-slate-500">
                        <IconBadge icon={BookCopy} size="sm"/>
                        <span>
                            {props.chaptersLength} Chapters
                        </span>
                    </div>
                </div>
                <div>
                    {props.progress !== null ? (
                        <CourseProgress
                            variant={props.progress === 100 ? "success" : "default"}
                            size="success"
                            value={props.progress}
                        />
                    ) : (
                        <p className="text-md md:text-sm font-medium text-slate-700">
                            {props.price}
                        </p>
                    )}
                </div>
            </div>
        </Link>
    );
};
const CoursesList = ({items}) => {
    return (
        <div>

            <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-4">
                {items.map((item) => (


                    <CourseCard
                        key={item.id}
                        {...item}
                        chaptersLength = {item.sections.length}
                    />
                ))}
            </div>
            {items.length === 0 && (
                <div className="text-center text-sm text-muted-foreground mt-10">
                    Aucun cours trouvé

                </div>

            )}
        </div>
    );
}

export default CoursesList;
