"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import PeopleTable from "./PeopleTable";
import * as client from "../../client";
import type { UserType } from "@/app/(Kambaz)/Account/client";

export default function People() {
    const { cid } = useParams();
    const [users, setUsers] = useState<UserType[]>([]);

    const fetchUsers = async () => {
        if (!cid) return;
        const usersFromServer = await client.findUsersForCourse(cid as string);
        setUsers(usersFromServer);
    };

    useEffect(() => {
        fetchUsers();
    }, [cid]);

    return (
        <div>
            <h3>People</h3>
            <PeopleTable users={users} fetchUsers={fetchUsers} />
        </div>
    );
}