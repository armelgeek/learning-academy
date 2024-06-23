
import { LucideIcon } from "lucide-react";
import {IconBadge} from "@/components/custom/IconBadge";

const InfoCard = ({icon:Icon,label,numberOfItems,variant}) => {
    return (
        <div className="border rounded-md flex items-center gap-x-2 p-3">
            <IconBadge
                variant={variant}
                icon={Icon}
            />
            <div>
                <p className="font-medium">
                    {label}
                </p>
                <p className="text-gray-500 text-sm">
                    {numberOfItems} {numberOfItems === 1 ? "cours se trouve" : "cours se trouvent"} en votre possession
                </p>
            </div>
        </div>
    );
}

export default InfoCard;
