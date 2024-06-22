import React from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const SectionMenu = ({ course }) => {
    return (
        <div className="z-60 md:hidden">
            <Sheet>
                <SheetTrigger>
                    <Button>Sections</Button>
                </SheetTrigger>
                <SheetContent className="flex flex-col">
                    <Link
                        href={`/courses/${course.id}/overview`}
                        className={`p-3 rounded-lg hover:bg-[#FFF8EB] mt-4`}
                    >
                        Overview
                    </Link>
                    {course.sections.map((section) => (
                        <Link
                            key={section.id}
                            href={`/courses/${course.id}/sections/${section.id}`}
                            className="p-3 rounded-lg hover:bg-[#FFF8EB] mt-4"
                        >
                            {section.title}
                        </Link>
                    ))}
                </SheetContent>
            </Sheet>
        </div>
    );
};

export default SectionMenu;
