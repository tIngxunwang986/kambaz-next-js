"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Nav, NavItem, NavLink } from "react-bootstrap";
import { useSelector } from "react-redux";
import type { RootState } from "../store";

export default function AccountNavigation() {
    const { currentUser } = useSelector(
        (state: RootState) => state.accountReducer
    );
    const pathname = usePathname();

    return (
        <Nav
            variant="pills"
            className="flex-column"
            id="wd-account-navigation"
        >
            {!currentUser && (
                <>
                    <NavItem>
                        <NavLink
                            as={Link}
                            href={"/Account/Signin"}
                            active={pathname.endsWith("Signin")}
                            id="wd-account-signin-link"
                        >
                            Signin
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            as={Link}
                            href={"/Account/Signup"}
                            active={pathname.endsWith("Signup")}
                            id="wd-account-signup-link"
                        >
                            Signup
                        </NavLink>
                    </NavItem>
                </>
            )}

            {currentUser && (
                <NavItem>
                    <NavLink
                        as={Link}
                        href={"/Account/Profile"}
                        active={pathname.endsWith("Profile")}
                        id="wd-account-profile-link"
                    >
                        Profile
                    </NavLink>
                </NavItem>
            )}

            {currentUser && currentUser.role === "ADMIN" && (
                <NavItem>
                    <NavLink
                        as={Link}
                        href={"/Account/Users"}
                        active={pathname.endsWith("Users")}
                        id="wd-account-users-link"
                    >
                        Users
                    </NavLink>
                </NavItem>
            )}
        </Nav>
    );
}