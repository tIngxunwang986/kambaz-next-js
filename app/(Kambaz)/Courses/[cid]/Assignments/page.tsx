"use client";
import Link from "next/link";
import { FaCheckCircle, FaEllipsisV, FaPlus } from "react-icons/fa";
import Button from "react-bootstrap/Button";
import FormControl from "react-bootstrap/FormControl";
import InputGroup from "react-bootstrap/InputGroup";
import InputGroupText from "react-bootstrap/InputGroupText";
import { BsGripVertical } from "react-icons/bs";
import { FiSearch } from "react-icons/fi";
import { useParams } from "next/navigation";
import * as db from "@/app/(Kambaz)/Database";

export default function Assignments() {
    const params = useParams();
    const cid = params.cid as string;

    const courseAssignments = db.assignments.filter(
        (assignment: any) => assignment.course === cid
    );

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
                    <Button id="wd-add-assignment-group" variant="secondary" className="me-2">
                        <FaPlus className="me-1" /> Group
                    </Button>
                    <Button id="wd-add-assignment" variant="danger">
                        <FaPlus className="me-1" /> Assignment
                    </Button>
                </div>
            </div>

            <div className="border-start border-success border-3 ps-3">
                <h3 id="wd-assignments-title" className="d-flex justify-content-between align-items-center">
                    <span>
                        <BsGripVertical className="me-2" />
                        ASSIGNMENTS
                    </span>
                    <span className="text-muted small">
                        40% of Total <FaEllipsisV />
                    </span>
                </h3>

                <ul id="wd-assignment-list" className="list-group">
                    {courseAssignments.map((assignment: any) => (
                        <li key={assignment._id} className="wd-assignment-list-item list-group-item d-flex justify-content-between align-items-center">
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
                                    Multiple Modules | <strong>Not available until</strong> May 6 at 12:00am
                                    <br />
                                    <strong>Due</strong> May 13 at 11:59pm | 100 pts
                                </div>
                            </div>
                            <FaEllipsisV />
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}