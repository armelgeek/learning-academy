
import { db } from "@/lib/db"

import CreateCourseForm from "@/components/courses/CreateCourseForm";

export default async function CreateCoursePage() {
    const categories = await db.category.findMany({
        orderBy: {
            name: "asc"
        },
        include: {
            subCategories: true
        }
    })

    return (
        <>
           <CreateCourseForm  categories={categories.map((category) => ({
               label: category.name,
               value: category.id,
               subCategories: category.subCategories.map((subcategory) => ({
                   label: subcategory.name,
                   value: subcategory.id
               }))
           }))} />
        </>
    );
}
