"use client";

import { useState } from "react";
import Link from "next/link";
import { Row, Col, Button, Card, FormControl } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addNewCourse, deleteCourse, updateCourse } from "../Courses/reducer";
import { RootState } from "../store";
import { enrollCourse, unenrollCourse, Enrollment } from "../Enrollments/reducer";
import type { Course } from "../Courses/reducer";

interface User {
    _id: string;
    username?: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    role: "FACULTY" | "STUDENT" | "TA" | "ADMIN";
}

export default function Dashboard() {
    const { courses } = useSelector(
        (state: RootState) => state.coursesReducer
    );

    const { currentUser } = useSelector(
        (state: RootState) => state.accountReducer
    ) as { currentUser: User | null };

    const { enrollments } = useSelector(
        (state: RootState) => state.enrollmentsReducer
    ) as { enrollments: Enrollment[] };

    const dispatch = useDispatch();

    const [course, setCourse] = useState<Course>({
        _id: "0",
        name: "New Course",
        number: "New Number",
        startDate: "2023-09-10",
        endDate: "2023-12-15",
        image: "/images/reactjs.jpg",
        description: "New Description",
    });

    const [showAllEnrollments, setShowAllEnrollments] = useState(false);

    if (!currentUser) {
        return (
            <div className="p-4" id="wd-dashboard">
                <h1 id="wd-dashboard-title">Dashboard</h1>
                <hr />
                <p>Please log in to see your courses.</p>
            </div>
        );
    }

    const isFaculty = currentUser.role === "FACULTY";

    const userEnrollments: Enrollment[] = enrollments.filter(
        (e) => e.user === currentUser._id
    );

    const isEnrolledInCourse = (courseId: string): boolean =>
        userEnrollments.some((e) => e.course === courseId);

    const visibleCourses: Course[] = courses.filter((c) => {
        if (isFaculty) return true;
        if (showAllEnrollments) return true;
        return isEnrolledInCourse(c._id);
    });

    const handleEnrollToggle = (courseId: string) => {
        const enrolled = isEnrolledInCourse(courseId);
        if (enrolled) {
            dispatch(
                unenrollCourse({ user: currentUser._id, course: courseId })
            );
        } else {
            dispatch(
                enrollCourse({ user: currentUser._id, course: courseId })
            );
        }
    };

    return (
        <div className="p-4" id="wd-dashboard">
            <div className="d-flex justify-content-between align-items-center">
                <h1 id="wd-dashboard-title">Dashboard</h1>

                {!isFaculty && (
                    <Button
                        variant="primary"
                        onClick={() => setShowAllEnrollments((prev) => !prev)}
                    >
                        {showAllEnrollments ? "My Enrollments" : "Enrollments"}
                    </Button>
                )}
            </div>
            <hr />

            {isFaculty && (
                <>
                    <h5>
                        New Course
                        <button
                            className="btn btn-primary float-end"
                            id="wd-add-new-course-click"
                            onClick={() => dispatch(addNewCourse(course))}
                        >
                            Add
                        </button>

                        <button
                            className="btn btn-warning float-end me-2"
                            id="wd-update-course-click"
                            onClick={() => dispatch(updateCourse(course))}
                        >
                            Update
                        </button>
                    </h5>
                    <br />

                    <FormControl
                        value={course.name}
                        className="mb-2"
                        placeholder="Course Name"
                        onChange={(e) =>
                            setCourse({ ...course, name: e.target.value })
                        }
                    />

                    <FormControl
                        value={course.description}
                        rows={3}
                        as="textarea"
                        placeholder="Course Description"
                        onChange={(e) =>
                            setCourse({ ...course, description: e.target.value })
                        }
                    />

                    <hr />
                </>
            )}

            <h2 id="wd-dashboard-published">
                Published Courses ({visibleCourses.length})
            </h2>
            <hr />

            <div id="wd-dashboard-courses">
                <Row xs={1} md={5} className="g-4">
                    {visibleCourses.map((course) => {
                        const enrolled = isEnrolledInCourse(course._id);
                        const canGo = isFaculty || enrolled;

                        const cardContent = (
                            <>
                                <Card.Img
                                    variant="top"
                                    src={course.image || "/images/reactjs.jpg"}
                                    alt={course.name}
                                    width="100%"
                                    height={160}
                                />
                                <Card.Body>
                                    <Card.Title className="wd-dashboard-course-title text-nowrap overflow-hidden">
                                        {course.name}
                                    </Card.Title>
                                    <Card.Text
                                        className="wd-dashboard-course-description overflow-hidden"
                                        style={{ height: "100px" }}
                                    >
                                        {course.description}
                                    </Card.Text>

                                    <Button variant="primary" disabled={!canGo}>
                                        Go
                                    </Button>

                                    {isFaculty && (
                                        <>
                                            <button
                                                onClick={(event) => {
                                                    event.preventDefault();
                                                    dispatch(deleteCourse(course._id));
                                                }}
                                                className="btn btn-danger float-end"
                                                id="wd-delete-course-click"
                                            >
                                                Delete
                                            </button>

                                            <button
                                                id="wd-edit-course-click"
                                                onClick={(event) => {
                                                    event.preventDefault();
                                                    setCourse(course);
                                                }}
                                                className="btn btn-warning me-2 float-end"
                                            >
                                                Edit
                                            </button>
                                        </>
                                    )}

                                    {!isFaculty && (
                                        <button
                                            className={`btn float-end ${
                                                enrolled ? "btn-danger" : "btn-success"
                                            }`}
                                            onClick={(event) => {
                                                event.preventDefault();
                                                handleEnrollToggle(course._id);
                                            }}
                                        >
                                            {enrolled ? "Unenroll" : "Enroll"}
                                        </button>
                                    )}
                                </Card.Body>
                            </>
                        );

                        return (
                            <Col
                                key={course._id}
                                className="wd-dashboard-course"
                                style={{ width: "300px" }}
                            >
                                <Card className="h-100">
                                    {canGo ? (
                                        <Link
                                            href={`/Courses/${course._id}/Home`}
                                            className="wd-dashboard-course-link text-decoration-none text-dark"
                                        >
                                            {cardContent}
                                        </Link>
                                    ) : (
                                        cardContent
                                    )}
                                </Card>
                            </Col>
                        );
                    })}
                </Row>
            </div>
        </div>
    );
}