import Link from "next/link";

export default function CourseNavigation({ cid }: { cid: string }) {
    return (
        <div id="wd-courses-navigation" className="wd list-group fs-5 rounded-0">
            <Link
                id="wd-course-home-link"
                href={`/Courses/${cid}/Home`}
                className="list-group-item active border-0"
            >
                Home
            </Link>
            <Link
                id="wd-course-modules-link"
                href={`/Courses/${cid}/Modules`}
                className="list-group-item text-danger border-0"
            >
                Modules
            </Link>
            <Link
                id="wd-course-piazza-link"
                href={`/Courses/${cid}/Piazza`}
                className="list-group-item text-danger border-0"
            >
                Piazza
            </Link>
            <Link
                id="wd-course-zoom-link"
                href={`/Courses/${cid}/Zoom`}
                className="list-group-item text-danger border-0"
            >
                Zoom
            </Link>
            <Link
                id="wd-course-assignments-link"
                href={`/Courses/${cid}/Assignments`}
                className="list-group-item text-danger border-0"
            >
                Assignments
            </Link>
            <Link
                id="wd-course-quizzes-link"
                href={`/Courses/${cid}/Quizzes`}
                className="list-group-item text-danger border-0"
            >
                Quizzes
            </Link>
            <Link
                id="wd-course-grades-link"
                href={`/Courses/${cid}/Grades`}
                className="list-group-item text-danger border-0"
            >
                Grades
            </Link>
            <Link
                id="wd-course-people-link"
                href={`/Courses/${cid}/People`}
                className="list-group-item text-danger border-0"
            >
                People
            </Link>
        </div>
    );
}