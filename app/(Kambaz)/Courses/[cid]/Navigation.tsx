
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = ["Home", "Modules", "Piazza", "Zoom", "Assignments", "Quizzes", "Grades", "People"];

export default function CourseNavigation({ cid }: { cid: string }) {
    const pathname = usePathname();

    return (
        <div id="wd-courses-navigation" className="wd list-group fs-5 rounded-0">
            {links.map((link) => {
                const href = `/Courses/${cid}/${link}`;
                const isActive = pathname === href ||
                    (pathname === `/Courses/${cid}` && link === "Home");

                return (
                    <Link
                        key={link}
                        id={`wd-course-${link.toLowerCase()}-link`}
                        href={href}
                        className={`list-group-item border-0 ${
                            isActive ? "active" : "text-danger"
                        }`}
                    >
                        {link}
                    </Link>
                );
            })}
        </div>
    );
}