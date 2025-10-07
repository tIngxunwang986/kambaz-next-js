"use client";

import Link from "next/link";
import { Form } from "react-bootstrap";

export default function Signup() {
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
                        <Form.Control id="wd-username" type="text" placeholder="username" />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Control id="wd-password" type="password" placeholder="password" />
                    </Form.Group>

                    <Link id="wd-signup-btn" href="/Account/Profile" className="btn btn-primary w-100">
                        Sign Up
                    </Link>

                    <div className="mt-2">
                        <Link href="/Account/Signin" className="text-decoration-none">
                            Sign in
                        </Link>
                    </div>
                </Form>
            </div>
        </div>
    );
}