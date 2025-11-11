"use client";

import { ReactNode, useState } from "react";
import CourseNavigation from "./Navigation";
import { FaAlignJustify } from "react-icons/fa";
import Breadcrumb from "./Breadcrumb";
import { useSelector } from "react-redux";
import { useParams } from "next/navigation";
import { RootState } from "../../store";

export default function CoursesLayout({ children }: { children: ReactNode }) {
    const { cid } = useParams();
    const { courses } = useSelector((state: RootState) => state.coursesReducer);
    const course = courses.find((course: any) => course._id === cid);
    const [showNavigation, setShowNavigation] = useState(true);

    return (
        <div id="wd-courses">
            <h2 className="text-danger">
                <FaAlignJustify
                    className="me-4 fs-4 mb-1"
                    style={{ cursor: "pointer" }}
                    onClick={() => setShowNavigation(!showNavigation)}
                />
                {course?.name}
            </h2>
            <Breadcrumb course={course} />
            <hr />
            <div className="d-flex">
                {showNavigation && (
                    <div className="d-none d-md-block">
                        <CourseNavigation cid={cid as string} />
                    </div>
                )}
                <div className="flex-fill">{children}</div>
            </div>
        </div>
    );
}