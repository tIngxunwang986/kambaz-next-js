"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/(Kambaz)/store";
import { FaCheckCircle, FaEllipsisV, FaPlus, FaTrash } from "react-icons/fa";
import { BsGripVertical } from "react-icons/bs";
import { FiSearch } from "react-icons/fi";
import Button from "react-bootstrap/Button";
import FormControl from "react-bootstrap/FormControl";
import InputGroup from "react-bootstrap/InputGroup";
import InputGroupText from "react-bootstrap/InputGroupText";
import { deleteAssignment, setAssignments, type Assignment,} from "./reducer";
import * as client from "../../client";

type CurrentUser = {
    _id: string;
    username: string;
    role: "FACULTY" | "STUDENT" | "TA" | "ADMIN";
};

export default function Assignments() {
    const { cid } = useParams() as { cid: string };
    const dispatch = useDispatch();

    const assignments = useSelector(
        (state: RootState) => state.assignmentsReducer.assignments
    ) as Assignment[];

    const currentUser = useSelector(
        (state: RootState) =>
            state.accountReducer.currentUser as CurrentUser | null
    );

    const isFaculty = currentUser?.role === "FACULTY";

    useEffect(() => {
        const loadAssignments = async () => {
            if (!cid) return;
            const data = await client.findAssignmentsForCourse(cid);
            dispatch(setAssignments(data));
        };
        loadAssignments();
    }, [cid, dispatch]);

    const courseAssignments = assignments.filter(
        (assignment) => assignment.course === cid
    );

    const handleDelete = async (id: string) => {
        if (!isFaculty) return;
        const ok = window.confirm(
            "Are you sure you want to remove this assignment?"
        );
        if (!ok) return;

        const status = await client.deleteAssignmentOnServer(id);
        if (status === 200 || status === 204) {
            dispatch(deleteAssignment(id));
        }
    };

    return (
        <div id="wd-assignments">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <InputGroup style={{ width: "300px" }}>
                    <InputGroupText>
                        <FiSearch />
                    </InputGroupText>
                    <FormControl
                        id="wd-search-assignment"
                        type="text"
                        placeholder="Search for Assignments"
                    />
                </InputGroup>

                <div>
                    {isFaculty && (
                        <>
                            <Button
                                id="wd-add-assignment-group"
                                variant="secondary"
                                className="me-2"
                            >
                                <FaPlus className="me-1" /> Group
                            </Button>
                            <Link href={`/Courses/${cid}/Assignments/new`}>
                                <Button id="wd-add-assignment" variant="danger">
                                    <FaPlus className="me-1" /> Assignment
                                </Button>
                            </Link>
                        </>
                    )}
                </div>
            </div>

            <div className="border-start border-success border-3 ps-3">
                <h3
                    id="wd-assignments-title"
                    className="d-flex justify-content-between align-items-center"
                >
          <span>
            <BsGripVertical className="me-2" />
            ASSIGNMENTS
          </span>
                    <span className="text-muted small">
            40% of Total <FaEllipsisV />
          </span>
                </h3>

                <ul
                    id="wd-assignment-list"
                    className="list-group"
                >
                    {courseAssignments.map((assignment) => (
                        <li
                            key={assignment._id}
                            className="wd-assignment-list-item list-group-item d-flex justify-content-between align-items-center"
                        >
                            <div>
                                <BsGripVertical className="me-2" />
                                <FaCheckCircle className="text-success me-2" />
                                <Link
                                    href={`/Courses/${cid}/Assignments/${assignment._id}`}
                                    className="wd-assignment-link text-decoration-none text-dark"
                                >
                                    <strong>{assignment.title}</strong>
                                </Link>
                                <div className="small text-muted ms-5">
                                    Multiple Modules |{" "}
                                    <strong>Not available until</strong> May 6 at 12:00am
                                    <br />
                                    <strong>Due</strong> May 13 at 11:59pm | 100 pts
                                </div>
                            </div>

                            {isFaculty && (
                                <button
                                    className="btn btn-link text-danger"
                                    onClick={() => handleDelete(assignment._id)}
                                >
                                    <FaTrash />
                                </button>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}