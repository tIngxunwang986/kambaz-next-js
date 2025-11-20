"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import { AiOutlineDashboard } from "react-icons/ai";
import { IoCalendarOutline } from "react-icons/io5";
import { LiaBookSolid, LiaCogSolid } from "react-icons/lia";
import { FaInbox, FaRegCircleUser } from "react-icons/fa6";

export default function KambazNavigation() {
    const pathname = usePathname();
    const isActive = (path: string) => pathname.includes(path);

    const links = [
        {
            label: "Dashboard",
            path: "/Dashboard",
            icon: AiOutlineDashboard,
            id: "wd-dashboard-link"
        },
        {
            label: "Courses",
            path: "/Dashboard",
            icon: LiaBookSolid,
            id: "wd-course-link"
        },
        {
            label: "Calendar",
            path: "/Calendar",
            icon: IoCalendarOutline,
            id: "wd-calendar-link"
        },
        {
            label: "Inbox",
            path: "/Inbox",
            icon: FaInbox,
            id: "wd-inbox-link"
        },
        {
            label: "Labs",
            path: "/Labs",
            icon: LiaCogSolid,
            id: "wd-labs-link"
        },
    ];

    return (
        <ListGroup
            id="wd-kambaz-navigation"
            className="rounded-0 position-fixed bottom-0 top-0 d-none d-md-block bg-black z-2"
            style={{ width: 120 }}
        >
            <ListGroupItem
                className="bg-black border-0 text-center"
                as="a"
                href="https://www.northeastern.edu/"
                target="_blank"
                rel="noopener noreferrer"
                id="wd-neu-link"
            >
                <img src="/images/NEU.png" alt="Northeastern University" width={75} />
            </ListGroupItem>

            <ListGroupItem className={isActive("/Account") ? "border-0 bg-white text-center" : "border-0 bg-black text-center"}>
                <Link
                    href="/Account"
                    id="wd-account-link"
                    className={isActive("/Account") ? "text-danger text-decoration-none" : "text-white text-decoration-none"}
                >
                    <FaRegCircleUser className={`fs-1 ${isActive("/Account") ? "text-danger" : "text-white"}`} />
                    <br />Account
                </Link>
            </ListGroupItem>

            {links.map((link) => {
                const Icon = link.icon;
                const active = isActive(link.path === "/Dashboard" && link.label === "Courses" ? "/Courses" : link.path);

                return (
                    <ListGroupItem
                        key={link.id}
                        className={active ? "border-0 bg-white text-center" : "border-0 bg-black text-center"}
                    >
                        <Link
                            href={link.path}
                            id={link.id}
                            className={active ? "text-danger text-decoration-none" : "text-white text-decoration-none"}
                        >
                            <Icon className={`fs-1 ${active ? "text-danger" : "text-white"}`} />
                            <br />{link.label}
                        </Link>
                    </ListGroupItem>
                );
            })}
        </ListGroup>
    );
}