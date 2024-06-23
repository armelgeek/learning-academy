import NavBarRoutes from "@/components/layout/NavBarRoutes";
import CourseMobileSideBar from "@/components/courses/CourseMobileSideBar";

const CourseNavBar = ({ course, progressCount }) => {
    return (
        <div className="p-4 border-b h-full flex items-center bg-white shadow-sm">
            <CourseMobileSideBar
                course = {course}
                progressCount = {progressCount}
            />
            <NavBarRoutes username=""/>
        </div>
    );
}

export default CourseNavBar;
