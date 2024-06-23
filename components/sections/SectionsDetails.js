"use client";
import toast from "react-hot-toast";
import { useState } from "react";
import axios from "axios";
import { File, Loader2, Lock } from "lucide-react";

import { Button } from "@/components/ui/button";
import ReadText from "@/components/custom/ReadText";
import MuxPlayer from "@mux/mux-player-react";
import Link from "next/link";
import ProgressButton from "./ProgressButton";
import SectionMenu from "../layout/SectionMenu";
import {useConfettiStore} from "@/hooks/use-confetti-store";
import {useRouter} from "next/navigation";


const SectionsDetails =  ({
                              course,
                              section,
                              purchase,
                              muxData,
                              resources,
                              progress,
                              nextSection
}) => {
    const router = useRouter();
    const confetti = useConfettiStore();
    const [isLoading, setIsLoading] = useState(false);
    const isLocked = !purchase && !section.isFree;
    const completeOnEnd = !!purchase && !progress?.isCompleted;

    const buyCourse = async () => {
        try {
            setIsLoading(true);
            const response = await axios.post(`/api/courses/${course.id}/checkout`);
            window.location.assign(response.data.url);
        } catch (err) {
            console.log("Failed to chechout course", err);
            toast.error("Something went wrong!");
        } finally {
            setIsLoading(false);
        }
    };

    const onEnd = async () => {

            try {
                if (completeOnEnd) {
                    await axios.post(`/api/courses/${course.id}/sections/${section.id}/progress`, { isCompleted: true });
                }

            } catch {
                toast.error("Something went wrong.");
            }

            if (!section.id) {
                confetti.onOpen();
                toast.success("Course successfully completed");
            } else {
                toast.success("Chapter successfully completed");
            }

            router.refresh();
            if (section.id) {
                router.push(`/courses/${course.id}/sections/${section.id}`);
            }
        }

    return (
        <div className="px-6 py-4 flex flex-col gap-5">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                <h1 className="text-2xl font-bold max-md:mb-4">{section.title}</h1>

                <div className="flex gap-4">
                    <SectionMenu course={course} />
                    {!purchase ? (
                        <Button onClick={buyCourse}>
                            {isLoading ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                                <p>Buy this course</p>
                            )}
                        </Button>
                    ) : (
                        <ProgressButton
                            courseId={course.id}
                            sectionId={section.id}
                            nextSection={nextSection?.id}
                            isCompleted={!!progress?.isCompleted}
                        />
                    )}
                </div>
            </div>

            <ReadText value={section.description || ""} />

            {isLocked ? (
                <div className="px-10 flex flex-col gap-5 items-center bg-[#FFF8EB]">
                    <Lock className="h-8 w-8" />
                    <p className="text-sm font-bold">
                        Video for this section is locked!. Please buy the course to access
                    </p>
                </div>
            ) : (
                <MuxPlayer
                    playbackId={muxData?.playbackId || ""}
                    className="md:max-w-[600px]"
                    onEnded={onEnd}
                    autoPlay
                />
            )}

            <div>
                <h2 className="text-xl font-bold mb-5">Resources</h2>
                {resources.map((resource) => (
                    <Link
                        key={resource.id}
                        href={resource.fileUrl}
                        target="_blank"
                        className="flex items-center bg-[#FFF8EB] rounded-lg text-sm font-medium p-3"
                    >
                        <File className="h-4 w-4 mr-4" />
                        {resource.name}
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default SectionsDetails;
