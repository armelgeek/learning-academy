import {db} from "@/lib/db";

export const getProgress = async (
    userId,
    courseId,
)=> {
    try {
        const publishedSections = await db.section.findMany({
            where: {
                courseId: courseId,
                isPublished: true,
            },
            select: {
                id: true,
            }
        });
        const publishedSectionIds = publishedSections.map((section) => section.id);

        const validCompletedSections = await db.progress.count({
            where: {
                studentId: userId,
                sectionId: {
                    in: publishedSectionIds,
                },
                isCompleted: true,
            }
        });

        return (validCompletedSections / publishedSectionIds.length) * 100;
    } catch (error) {
        console.log("[GET_PROGRESS]", error);
        return 0;
    }
}
