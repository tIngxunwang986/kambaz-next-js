"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { enrollCourse, unenrollCourse, setEnrollments } from "./reducer";
import { setCourses } from "../Courses/reducer";
import * as client from "../Courses/client";
import { Button, Card } from "react-bootstrap";

interface User {
    _id: string;
}

interface Enrollment {
    _id?: string;
    user: string;
    course: string;
}

interface Course {
    _id: string;
    name: string;
    number: string;
}

export default function EnrollmentsPage() {
    const dispatch = useDispatch();

    const currentUser = useSelector<RootState, User | null>(
        (state) => state.accountReducer.currentUser as User | null
    );

    const enrollments = useSelector<RootState, Enrollment[]>(
        (state) => state.enrollmentsReducer.enrollments as Enrollment[]
    );

    const courses = useSelector<RootState, Course[]>(
        (state) => state.coursesReducer.courses as Course[]
    );

    const [loading, setLoading] = useState(false);

    // Load courses + enrollments when opening Enrollments screen
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
            } catch (e) {
                console.error(e);
            }
        };

        void fetchData();
    }, [currentUser, dispatch]);

    const isEnrolled = (courseId: string): boolean =>
        !!currentUser &&
        enrollments.some(
            (e) => e.user === currentUser._id && e.course === courseId
        );

    const toggleEnrollment = async (courseId: string) => {
        if (!currentUser) return;

        const userId = currentUser._id;
        setLoading(true);

        try {
            if (isEnrolled(courseId)) {
                const enrollment = enrollments.find(
                    (e) => e.user === userId && e.course === courseId
                );
                if (!enrollment || !enrollment._id) return;

                const status = await client.unenrollFromCourseOnServer(
                    enrollment._id
                );
                if (status === 200) {
                    dispatch(
                        unenrollCourse({
                            user: userId,
                            course: courseId,
                        })
                    );
                }
            } else {
                const created = await client.enrollInCourseOnServer(
                    userId,
                    courseId
                );
                dispatch(enrollCourse(created));
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-4" id="wd-enrollments">
            <h2 className="mb-4">Enrollments</h2>

            {courses.map((course) => {
                const enrolled = isEnrolled(course._id);

                return (
                    <Card key={course._id} className="mb-3 p-3">
                        <div className="d-flex justify-content-between align-items-center">
                            <div>
                                <h4>{course.name}</h4>
                                <div className="text-muted">{course.number}</div>
                            </div>

                            <Button
                                variant={enrolled ? "danger" : "primary"}
                                disabled={loading}
                                onClick={() => void toggleEnrollment(course._id)}
                            >
                                {enrolled ? "Unenroll" : "Enroll"}
                            </Button>
                        </div>
                    </Card>
                );
            })}
        </div>
    );
}