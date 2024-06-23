'use client';

import { BarChart3, Compass, Layout, List, MailIcon, Settings2Icon } from "lucide-react";
import Image from "next/image";
import SideBarItem from "./SideBarItem";
import { usePathname } from "next/navigation";
import Settings from "./Settings";
import { useState } from "react";
const guestRoutes = [
    {
        icon: Layout,
        label: 'Tableau de bord',
        href: "/"
    },
    {
        icon: Compass,
        label: "Explorer",
        href: "/search"
    },
    {
        icon: MailIcon,
        label: "Messages",
        href: `/chat`
    }
];

const teacherRoutes = [
    {
        icon: List,
        label: 'Cours',
        href: "/teacher/courses"
    },
    {
        icon: BarChart3,
        label: "Analytiques",
        href: "/teacher/analytics"
    },
    {
        icon: MailIcon,
        label: "Messages",
        href: `/chat`
    }
];




const SideBarRoutes = ({ name, username, userId }) => {

    const pathname = usePathname();

    const isTeacherPage = pathname?.includes('/teacher');
    const [isOpen, setIsOpen] = useState(false);

    const routes = isTeacherPage ? teacherRoutes : guestRoutes
    return (
        <div>
            <div className="flex flex-col w-full">
                {routes.map((route) => (
                    <SideBarItem
                        key={route.href}
                        icon={route.icon}
                        label={route.label}
                        href={route.href}
                    />
                ))}
                <Settings
                    icon={Settings2Icon}
                    label="Paramètres"
                    name = {name}
                    username = {username} />
            </div>


        </div>
    );
}

export default SideBarRoutes;
