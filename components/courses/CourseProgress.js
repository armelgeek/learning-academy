import { cn } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";


const colorByVariant = {
    default: "text-sky-700",
    success: "text-sky-700"
}

const sizeByVariant = {
    default: "text-sm",
    success: "text-xs"
}

const CourseProgress = ({ variant,  value }) => {
    return (
        <div>
            {value < 100 ? (
                <div>
                    <p className={cn("font-medium mt-2 text-sky-700",
                        colorByVariant[variant || "default"],
                        sizeByVariant[variant || "default"],)}>

                        Cours complété à {value} %.

                    </p>
                    <Progress
                        className="h-2"
                        value={value}
                        variant={variant}
                    />
                </div>
            ) : (
                <p className="text-sm text-blue-800 font-semibold">
                    Cours terminé avec succès !
                </p>
            )}
        </div>
    );
}

export default CourseProgress;
