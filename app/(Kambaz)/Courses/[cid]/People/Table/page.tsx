"use client";

import React from "react";
import { useParams } from "next/navigation";
import * as db from "@/app/(Kambaz)/Database";
import { Table } from "react-bootstrap";
import { FaUserCircle } from "react-icons/fa";

type User = {
    _id: string;
    firstName: string;
    lastName: string;
    loginId: string;
    section: string;
    role: string;
    lastActivity: string;
    totalActivity: string;
};

type Enrollment = {
    _id: string;
    user: string;
    course: string;
};

export default function PeopleTable() {
    const { cid } = useParams();
    const { users, enrollments } = db;

    return (
        <div id="wd-people-table">
            <Table striped hover>
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Login ID</th>
                    <th>Section</th>
                    <th>Role</th>
                    <th>Last Activity</th>
                    <th>Total Activity</th>
                </tr>
                </thead>
                <tbody>
                {users
                    .filter((usr) =>
                        enrollments.some((enrollment) =>
                            (enrollment as Enrollment).user === (usr as User)._id &&
                            (enrollment as Enrollment).course === cid
                        )
                    )
                    .map((user) => {
                        const typedUser = user as User;
                        return (
                            <tr key={typedUser._id}>
                                <td className="wd-full-name text-nowrap align-middle">
                                    <FaUserCircle className="me-2 fs-1 text-secondary" />
                                    <span className="wd-first-name">{typedUser.firstName}</span>{" "}
                                    <span className="wd-last-name">{typedUser.lastName}</span>
                                </td>
                                <td className="wd-login-id align-middle">{typedUser.loginId}</td>
                                <td className="wd-section align-middle">{typedUser.section}</td>
                                <td className="wd-role align-middle">{typedUser.role}</td>
                                <td className="wd-last-activity align-middle">{typedUser.lastActivity}</td>
                                <td className="wd-total-activity align-middle">{typedUser.totalActivity}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </Table>
        </div>
    );
}