"use client";

import Link from "next/link";
import { redirect } from "next/navigation";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { setCurrentUser } from "../reducer";
import * as client from "../client";
import type { CredentialsType } from "../client";

export default function Signup() {
    const [user, setUser] = useState<CredentialsType>({
        username: "",
        password: "",
    });

    const dispatch = useDispatch();

    const signup = async () => {
        const currentUser = await client.signup(user);
        if (!currentUser) return;
        dispatch(setCurrentUser(currentUser));
        redirect("/Account/Profile");
    };

    return (
        <div
            id="wd-signup-screen"
            className="d-flex justify-content-center align-items-center"
            style={{ minHeight: "70vh" }}
        >
            <div style={{ width: "350px" }}>
                <h3>Sign Up</h3>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Control
                            id="wd-username"
                            type="text"
                            placeholder="username"
                            value={user.username}
                            onChange={(e) =>
                                setUser({ ...user, username: e.target.value })
                            }
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Control
                            id="wd-password"
                            type="password"
                            placeholder="password"
                            value={user.password}
                            onChange={(e) =>
                                setUser({ ...user, password: e.target.value })
                            }
                        />
                    </Form.Group>

                    <Button
                        onClick={signup}
                        id="wd-signup-btn"
                        className="btn btn-primary w-100"
                    >
                        Sign Up
                    </Button>

                    <div className="mt-2">
                        <Link
                            href="/Account/Signin"
                            className="text-decoration-none"
                            id="wd-signin-link"
                        >
                            Sign in
                        </Link>
                    </div>
                </Form>
            </div>
        </div>
    );
}