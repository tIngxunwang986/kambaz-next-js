"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Row, Col, Button, Card, FormControl } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { setCourses } from "../Courses/reducer";
import { RootState } from "../store";
import * as client from "../Courses/client";
import type { Course } from "../Courses/reducer";
import {
    enrollCourse,
    unenrollCourse,
    setEnrollments,
} from "../Enrollments/reducer";
import type { Enrollment } from "../Enrollments/reducer";

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

    const enrollments = useSelector(
        (state: RootState) =>
            state.enrollmentsReducer.enrollments as Enrollment[]
    );

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

    const [showAllCourses, setShowAllCourses] = useState(false);

    const isFaculty = currentUser?.role === "FACULTY";

    useEffect(() => {
        const fetchData = async () => {
            if (!currentUser) return;
            try {
                const [coursesFromServer, enrollmentsFromServer] =
                    await Promise.all([
                        client.fetchAllCourses(),
                        client.fetchMyEnrollments(),
                    ]);
                dispatch(setCourses(coursesFromServer));
                dispatch(setEnrollments(enrollmentsFromServer));
            } catch (error) {
                console.error(error);
            }
        };

        void fetchData();
    }, [currentUser, dispatch]);

    if (!currentUser) {
        return (
            <div className="p-4" id="wd-dashboard">
                <h1 id="wd-dashboard-title">Dashboard</h1>
                <hr />
                <p>Please log in to see your courses.</p>
            </div>
        );
    }

    const isEnrolledInCourse = (courseId: string): boolean => {
        if (!currentUser) return false;
        return enrollments.some(
            (e) => e.user === currentUser._id && e.course === courseId
        );
    };

    const visibleCourses = showAllCourses
        ? courses
        : courses.filter((c) => isEnrolledInCourse(c._id));

    const onAddNewCourse = async () => {
        try {
            const newCourse = await client.createCourse(course);
            dispatch(setCourses([...courses, newCourse]));
        } catch (error) {
            console.error(error);
        }
    };

    const onDeleteCourse = async (courseId: string) => {
        try {
            const status = await client.deleteCourse(courseId);
            if (status === 200) {
                dispatch(setCourses(courses.filter((c) => c._id !== courseId)));
            }
        } catch (error) {
            console.error(error);
        }
    };

    const onUpdateCourse = async () => {
        try {
            await client.updateCourse(course);
            dispatch(
                setCourses(
                    courses.map((c) => (c._id === course._id ? course : c))
                )
            );
        } catch (error) {
            console.error(error);
        }
    };

    const toggleEnrollment = async (courseId: string) => {
        if (!currentUser) return;
        const enrollment = enrollments.find(
            (e) => e.user === currentUser._id && e.course === courseId
        );

        try {
            if (enrollment) {
                await client.unenrollFromCourse(enrollment._id);
                dispatch(
                    unenrollCourse({
                        user: currentUser._id,
                        course: courseId,
                    })
                );
            } else {
                const newEnrollment = await client.enrollIntoCourse(
                    currentUser._id,
                    courseId
                );
                dispatch(enrollCourse(newEnrollment));
            }
        } catch (e) {
            console.error("Error toggling enrollment", e);
        }
    };

    return (
        <div className="p-4" id="wd-dashboard">
            <div className="d-flex justify-content-between align-items-center">
                <h1 id="wd-dashboard-title">Dashboard</h1>

                <Button
                    id="wd-enrollments-toggle"
                    variant="primary"
                    onClick={() => setShowAllCourses((prev) => !prev)}
                >
                    {showAllCourses ? "Show My Courses" : "Show All Courses"}
                </Button>
            </div>
            <hr />

            {isFaculty && (
                <>
                    <h5>
                        New Course
                        <button
                            className="btn btn-primary float-end"
                            id="wd-add-new-course-click"
                            onClick={onAddNewCourse}
                        >
                            Add
                        </button>

                        <button
                            className="btn btn-warning float-end me-2"
                            id="wd-update-course-click"
                            onClick={onUpdateCourse}
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

                                    <Button variant="primary">Go</Button>

                                    <button
                                        className={`btn ${
                                            enrolled ? "btn-danger" : "btn-success"
                                        } ms-2`}
                                        onClick={(event) => {
                                            event.preventDefault();
                                            void toggleEnrollment(course._id);
                                        }}
                                    >
                                        {enrolled ? "Unenroll" : "Enroll"}
                                    </button>

                                    {isFaculty && (
                                        <>
                                            <button
                                                onClick={(event) => {
                                                    event.preventDefault();
                                                    void onDeleteCourse(course._id);
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
                                    <Link
                                        href={`/Courses/${course._id}/Home`}
                                        className="wd-dashboard-course-link text-decoration-none text-dark"
                                    >
                                        {cardContent}
                                    </Link>
                                </Card>
                            </Col>
                        );
                    })}
                </Row>
            </div>
        </div>
    );
}