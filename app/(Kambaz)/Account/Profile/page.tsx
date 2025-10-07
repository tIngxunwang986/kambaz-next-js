"use client";

import Link from "next/link";
import { Form } from "react-bootstrap";

export default function Profile() {
    return (
        <div
            id="wd-profile-screen"
            className="d-flex justify-content-center align-items-center"
            style={{ minHeight: "70vh" }}
        >
            <div style={{ width: "400px" }}>
                <h3>Profile</h3>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Control id="wd-username" type="text" defaultValue="alice" placeholder="username" />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Control id="wd-password" type="password" defaultValue="123" placeholder="password" />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Control id="wd-firstname" type="text" defaultValue="Alice" placeholder="First Name" />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Control id="wd-lastname" type="text" defaultValue="Wonderland" placeholder="Last Name" />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Control id="wd-dob" type="date" defaultValue="2000-01-01" />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Control
                            id="wd-email"
                            type="email"
                            defaultValue="alice@wonderland.com"
                            placeholder="email"
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Select id="wd-role" defaultValue="USER">
                            <option value="USER">User</option>
                            <option value="ADMIN">Admin</option>
                            <option value="FACULTY">Faculty</option>
                            <option value="STUDENT">Student</option>
                        </Form.Select>
                    </Form.Group>

                    <Link id="wd-signout-btn" href="/Account/Signin" className="btn btn-danger w-100">
                        Sign Out
                    </Link>
                </Form>
            </div>
        </div>
    );
}