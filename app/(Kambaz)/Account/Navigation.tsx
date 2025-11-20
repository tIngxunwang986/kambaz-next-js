"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "../store";

export default function AccountNavigation() {
    const { currentUser } = useSelector((state: RootState) => state.accountReducer);
    const links = currentUser ? ["Profile"] : ["Signin", "Signup"];
    const pathname = usePathname();

    return (
        <div id="wd-account-navigation">
            {links.map((link) => (
                <div key={link}>
                    <Link
                        href={`/Account/${link}`}
                        id={`wd-account-${link.toLowerCase()}-link`}
                        className={pathname.endsWith(link.toLowerCase()) ? "active" : ""}
                    >
                        {link}
                    </Link>
                    <br/>
                </div>
            ))}
        </div>
    );
}