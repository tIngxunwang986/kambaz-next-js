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
                    <FaRegCircleUser className="fs-1 text-white" />
                    <br />Account
                </Link>
            </ListGroupItem>

            <ListGroupItem className={isActive("/Dashboard") ? "border-0 bg-white text-center" : "border-0 bg-black text-center"}>
                <Link
                    href="/Dashboard"
                    id="wd-dashboard-link"
                    className={isActive("/Dashboard") ? "text-danger text-decoration-none" : "text-white text-decoration-none"}
                >
                    <AiOutlineDashboard className="fs-1 text-danger" />
                    <br />Dashboard
                </Link>
            </ListGroupItem>

            <ListGroupItem className={isActive("/Courses") ? "border-0 bg-white text-center" : "border-0 bg-black text-center"}>
                <Link
                    href="/Courses"
                    id="wd-course-link"
                    className={isActive("/Courses") ? "text-danger text-decoration-none" : "text-white text-decoration-none"}
                >
                    <LiaBookSolid className="fs-1 text-danger" />
                    <br />Courses
                </Link>
            </ListGroupItem>

            <ListGroupItem className={isActive("/Calendar") ? "border-0 bg-white text-center" : "border-0 bg-black text-center"}>
                <Link
                    href="/Calendar"
                    id="wd-calendar-link"
                    className={isActive("/Calendar") ? "text-danger text-decoration-none" : "text-white text-decoration-none"}
                >
                    <IoCalendarOutline className="fs-1 text-danger" />
                    <br />Calendar
                </Link>
            </ListGroupItem>

            <ListGroupItem className={isActive("/Inbox") ? "border-0 bg-white text-center" : "border-0 bg-black text-center"}>
                <Link
                    href="/Inbox"
                    id="wd-inbox-link"
                    className={isActive("/Inbox") ? "text-danger text-decoration-none" : "text-white text-decoration-none"}
                >
                    <FaInbox className="fs-1 text-danger" />
                    <br />Inbox
                </Link>
            </ListGroupItem>

            <ListGroupItem className={isActive("/Labs") ? "border-0 bg-white text-center" : "border-0 bg-black text-center"}>
                <Link
                    href="/Labs"
                    id="wd-labs-link"
                    className={isActive("/Labs") ? "text-danger text-decoration-none" : "text-white text-decoration-none"}
                >
                    <LiaCogSolid className="fs-1 text-danger" />
                    <br />Labs
                </Link>
            </ListGroupItem>
        </ListGroup>
    );
}