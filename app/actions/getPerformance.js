import { db } from "@/lib/db";
import { Course, Purchase } from "@prisma/client";

const groupByCourse = (purchases) => {
    const grouped = {};

    purchases.forEach((purchase) => {
        const courseTitle = purchase.course.title;
        if (!grouped[courseTitle]) {
            grouped[courseTitle] = { total: 0, count: 0 };
        }
        grouped[courseTitle].total += purchase.course.price;
        grouped[courseTitle].count += 1;
    });

    return grouped;
};

export const getPerformance = async (userId) => {
    try {
        const purchases = await db.purchase.findMany({
            where: { course: { instructorId: userId } },
            include: { course: true },
        });

        const groupedEarnings = groupByCourse(purchases);

        const data = Object.entries(groupedEarnings).map(
            ([courseTitle, { total, count }]) => ({
                name: courseTitle,
                total,
                count,
            })
        );

        const totalRevenue = data.reduce((acc, current) => acc + current.total, 0);
        const totalSales = purchases.length

        return {
            data,
            totalRevenue,
            totalSales,
        };
    } catch (err) {
        console.log("[getPerformance]", err);
        return {
            data: [],
            totalRevenue: 0,
            totalSales: 0,
        };
    }
};
