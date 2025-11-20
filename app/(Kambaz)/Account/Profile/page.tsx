"use client";

import { redirect } from "next/dist/client/components/navigation";
import { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentUser } from "../reducer";
import { RootState } from "../../store";
import { Form, Button } from "react-bootstrap";
import * as client from "../client";
import { UserType } from "../client";

export default function Profile() {
    const [profile, setProfile] = useState<UserType>({});
    const dispatch = useDispatch();
    const { currentUser } = useSelector((state: RootState) => state.accountReducer);

    const fetchProfile = useCallback(() => {
        if (!currentUser) return redirect("/Account/Signin");
        setProfile(currentUser);
    }, [currentUser]);

    const updateProfile = async () => {
        const updatedProfile = await client.updateUser(profile);
        dispatch(setCurrentUser(updatedProfile));
    };

    const signout = async () => {
        await client.signout();
        dispatch(setCurrentUser(null));
        redirect("/Account/Signin");
    };

    useEffect(() => {
        fetchProfile();
    }, [fetchProfile]);

    return (
        <div
            id="wd-profile-screen"
            className="d-flex justify-content-center align-items-center"
            style={{ minHeight: "70vh" }}
        >
            <div style={{ width: "400px" }}>
                <h3>Profile</h3>
                {profile && (
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Control
                                id="wd-username"
                                type="text"
                                defaultValue={profile.username}
                                placeholder="username"
                                onChange={(e) => setProfile({ ...profile, username: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Control
                                id="wd-password"
                                type="password"
                                defaultValue={profile.password}
                                placeholder="password"
                                onChange={(e) => setProfile({ ...profile, password: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Control
                                id="wd-firstname"
                                type="text"
                                defaultValue={profile.firstName}
                                placeholder="First Name"
                                onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Control
                                id="wd-lastname"
                                type="text"
                                defaultValue={profile.lastName}
                                placeholder="Last Name"
                                onChange={(e) => setProfile({ ...profile, lastName: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Control
                                id="wd-dob"
                                type="date"
                                defaultValue={profile.dob}
                                onChange={(e) => setProfile({ ...profile, dob: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Control
                                id="wd-email"
                                type="email"
                                defaultValue={profile.email}
                                placeholder="email"
                                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Select
                                id="wd-role"
                                value={profile.role || "USER"}
                                onChange={(e) => setProfile({ ...profile, role: e.target.value })}
                            >
                                <option value="USER">User</option>
                                <option value="ADMIN">Admin</option>
                                <option value="FACULTY">Faculty</option>
                                <option value="STUDENT">Student</option>
                            </Form.Select>
                        </Form.Group>

                        <Button
                            onClick={updateProfile}
                            className="btn btn-primary w-100 mb-2"
                        >
                            Update
                        </Button>

                        <Button
                            id="wd-signout-btn"
                            onClick={signout}
                            className="btn btn-danger w-100"
                        >
                            Sign Out
                        </Button>
                    </Form>
                )}
            </div>
        </div>
    );
}