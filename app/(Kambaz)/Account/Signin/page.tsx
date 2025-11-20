"use client";

import Link from "next/link";
import { redirect } from "next/navigation";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { setCurrentUser } from "../reducer";
import * as client from "../client";
import type { CredentialsType } from "../client";

export default function Signin() {
    const [credentials, setCredentials] = useState<CredentialsType>({
        username: "",
        password: "",
    });

    const dispatch = useDispatch();

    const signin = async () => {
        const user = await client.signin(credentials);
        if (!user) return;
        dispatch(setCurrentUser(user));
        redirect("/Dashboard");
    };

    return (
        <div
            id="wd-signin-screen"
            className="d-flex justify-content-center align-items-center"
            style={{ minHeight: "70vh" }}
        >
            <div style={{ width: "350px" }}>
                <h3>Sign In</h3>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Control
                            id="wd-username"
                            type="text"
                            placeholder="username"
                            value={credentials.username}
                            onChange={(e) =>
                                setCredentials({ ...credentials, username: e.target.value })
                            }
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Control
                            id="wd-password"
                            type="password"
                            placeholder="password"
                            value={credentials.password}
                            onChange={(e) =>
                                setCredentials({ ...credentials, password: e.target.value })
                            }
                        />
                    </Form.Group>

                    <Button
                        onClick={signin}
                        id="wd-signin-btn"
                        className="btn btn-primary w-100"
                    >
                        Sign In
                    </Button>

                    <div className="mt-2">
                        <Link
                            href="/Account/Signup"
                            className="text-decoration-none"
                            id="wd-signup-link"
                        >
                            Sign up
                        </Link>
                    </div>
                </Form>
            </div>
        </div>
    );
}