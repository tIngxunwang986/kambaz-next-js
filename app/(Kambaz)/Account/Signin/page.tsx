"use client";

import Link from "next/link";
import { Form } from "react-bootstrap";

export default function Signin() {
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
                        <Form.Control id="wd-username" type="text" placeholder="username" />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Control id="wd-password" type="password" placeholder="password" />
                    </Form.Group>

                    <Link id="wd-signin-btn" href="/Dashboard" className="btn btn-primary w-100">
                        Sign In
                    </Link>

                    <div className="mt-2">
                        <Link href="/Account/Signup" className="text-decoration-none" id="wd-signup-link">
                            Sign up
                        </Link>
                    </div>
                </Form>
            </div>
        </div>
    );
}