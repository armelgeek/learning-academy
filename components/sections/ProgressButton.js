"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

import { Button } from "@/components/ui/button";
import { CheckCircle, Loader2 } from "lucide-react";
import {useConfettiStore} from "@/hooks/use-confetti-store";


const ProgressButton = ({ courseId, sectionId, nextSection , isCompleted }) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const confetti = useConfettiStore();
    const onClick = async () => {
        try {
            setIsLoading(true);
            await axios.post(`/api/courses/${courseId}/sections/${sectionId}/progress`, {
                isCompleted: !isCompleted,
            });

            router.refresh();
            if(!nextSection && !isCompleted) {
                confetti.onOpen();
                toast.success("Progress updated!");
            } else if(isCompleted){
                router.push(`/courses/${courseId}/sections/${sectionId}`)
            }
            else if (nextSection) {
                router.push(`/courses/${courseId}/sections/${nextSection}`)
            }
        } catch (err) {
            console.log("Failed to update progress", err);
            toast.error("Something went wrong!");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Button variant={isCompleted ? "complete" : "default"} onClick={onClick}>
            {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
            ) : isCompleted ? (
                <div className="flex items-center">
                    <CheckCircle className="h-4 w-4 mr-2" />
                    <span>Completed</span>
                </div>
            ) : (
                "Mark as complete"
            )}
        </Button>
    );
};

export default ProgressButton;
