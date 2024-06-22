import { db } from "@/lib/db"

const getCoursesByCategory = async (categoryId) => {
    const whereClause = {
        ...(categoryId ? { categoryId, isPublished: true } : { isPublished: true }),
    }
    const courses = await db.course.findMany({
        where: whereClause,
        include: {
            category: true,
            subCategory: true,
            level: true,
            sections: {
                where: {
                    isPublished: true,
                }
            },
        },
        orderBy: {
            createdAt: "desc",
        },
    })

    return courses
}

export default getCoursesByCategory
