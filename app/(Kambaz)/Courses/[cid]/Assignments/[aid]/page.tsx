"use client";

import { useState } from "react";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import { useParams, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/(Kambaz)/store";
import { addAssignment, updateAssignment as updateAssignmentInStore, type Assignment,} from "../reducer";
import * as Client from "../../../client";

type CurrentUser = {
    _id: string;
    username: string;
    role: "FACULTY" | "STUDENT" | "TA" | "ADMIN";
};

export default function AssignmentEditor() {
    const { cid, aid } = useParams() as { cid: string; aid: string };
    const router = useRouter();
    const dispatch = useDispatch();

    const assignments = useSelector(
        (state: RootState) =>
            state.assignmentsReducer.assignments as Assignment[]
    );

    const currentUser = useSelector(
        (state: RootState) =>
            state.accountReducer.currentUser as CurrentUser | null
    );
    const isFaculty = currentUser?.role === "FACULTY";

    const existing =
        aid !== "new" ? assignments.find((a) => a._id === aid) : undefined;

    const defaultDescription =
        "The assignment is available online\n\nSubmit a link to the landing page of your Web application running on Netlify.\n\nThe landing page should include the following:\n\n• Your full name and section\n• Links to each of the lab assignments\n• Link to the Kanbas application\n• Links to all relevant source code repositories\n\nThe Kanbas application should include a link to navigate back to the landing page.";
    const defaultPoints = 100;
    const defaultDueDate = "2024-05-13T23:59";
    const defaultAvailableFrom = "2024-05-06T00:00";

    const [name, setName] = useState<string>(
        existing?.title ?? "New Assignment"
    );
    const [description, setDescription] = useState<string>(
        existing?.description ?? defaultDescription
    );
    const [points, setPoints] = useState<number>(
        existing?.points ?? defaultPoints
    );
    const [dueDate, setDueDate] = useState<string>(
        existing?.dueDate ?? defaultDueDate
    );
    const [availableFrom, setAvailableFrom] = useState<string>(
        existing?.availableFrom ?? defaultAvailableFrom
    );
    const [availableUntil, setAvailableUntil] = useState<string>(
        existing?.availableUntil ?? ""
    );

    const disabled = !isFaculty;

    const handleCancel = () => {
        router.push(`/Courses/${cid}/Assignments`);
    };

    const handleSave = async () => {
        if (!isFaculty) return;

        const payload: Assignment = {
            _id: existing ? existing._id : "",
            course: cid,
            title: name,
            description,
            points,
            dueDate,
            availableFrom,
            availableUntil,
        };

        try {
            if (existing) {
                const updated: Assignment = await Client.updateAssignmentOnServer(
                    payload
                );
                dispatch(updateAssignmentInStore(updated));
            } else {
                const created: Assignment = await Client.createAssignmentForCourse(
                    cid,
                    payload
                );
                dispatch(addAssignment(created));
            }
            router.push(`/Courses/${cid}/Assignments`);
        } catch (e) {
            console.error("Error saving assignment", e);
        }
    };

    return (
        <div id="wd-assignments-editor">
            <Form>
                <Form.Group className="mb-3">
                    <Form.Label>Assignment Name</Form.Label>
                    <Form.Control
                        type="text"
                        id="wd-name"
                        value={name}
                        disabled={disabled}
                        onChange={(e) => setName(e.target.value)}
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Control
                        as="textarea"
                        rows={10}
                        id="wd-description"
                        value={description}
                        disabled={disabled}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </Form.Group>

                <Row className="mb-3">
                    <Col md={3}>
                        <Form.Label className="text-end d-block">Points</Form.Label>
                    </Col>
                    <Col md={9}>
                        <Form.Control
                            type="number"
                            id="wd-points"
                            value={points}
                            disabled={disabled}
                            onChange={(e) => setPoints(Number(e.target.value))}
                        />
                    </Col>
                </Row>

                <Row className="mb-3">
                    <Col md={3}>
                        <Form.Label className="text-end d-block">
                            Assignment Group
                        </Form.Label>
                    </Col>
                    <Col md={9}>
                        <Form.Select id="wd-group" disabled={disabled}>
                            <option value="ASSIGNMENTS">ASSIGNMENTS</option>
                            <option value="QUIZZES">QUIZZES</option>
                            <option value="EXAMS">EXAMS</option>
                            <option value="PROJECT">PROJECT</option>
                        </Form.Select>
                    </Col>
                </Row>

                <Row className="mb-3">
                    <Col md={3}>
                        <Form.Label className="text-end d-block">
                            Display Grade as
                        </Form.Label>
                    </Col>
                    <Col md={9}>
                        <Form.Select id="wd-display-grade-as" disabled={disabled}>
                            <option value="PERCENTAGE">Percentage</option>
                            <option value="POINTS">Points</option>
                        </Form.Select>
                    </Col>
                </Row>

                <Row className="mb-3">
                    <Col md={3}>
                        <Form.Label className="text-end d-block">
                            Submission Type
                        </Form.Label>
                    </Col>
                    <Col md={9}>
                        <div className="border rounded p-3">
                            <Form.Select
                                id="wd-submission-type"
                                className="mb-3"
                                disabled={disabled}
                            >
                                <option value="ONLINE">Online</option>
                                <option value="ON_PAPER">On Paper</option>
                            </Form.Select>

                            <Form.Label className="fw-bold">
                                Online Entry Options
                            </Form.Label>
                            <Form.Check
                                type="checkbox"
                                id="wd-text-entry"
                                label="Text Entry"
                                className="mb-2"
                                disabled={disabled}
                            />
                            <Form.Check
                                type="checkbox"
                                id="wd-website-url"
                                label="Website URL"
                                defaultChecked
                                className="mb-2"
                                disabled={disabled}
                            />
                            <Form.Check
                                type="checkbox"
                                id="wd-media-recordings"
                                label="Media Recordings"
                                className="mb-2"
                                disabled={disabled}
                            />
                            <Form.Check
                                type="checkbox"
                                id="wd-student-annotation"
                                label="Student Annotation"
                                className="mb-2"
                                disabled={disabled}
                            />
                            <Form.Check
                                type="checkbox"
                                id="wd-file-upload"
                                label="File Uploads"
                                disabled={disabled}
                            />
                        </div>
                    </Col>
                </Row>

                <Row className="mb-3">
                    <Col md={3}>
                        <Form.Label className="text-end d-block">Assign</Form.Label>
                    </Col>
                    <Col md={9}>
                        <div className="border rounded p-3">
                            <Form.Group className="mb-3">
                                <Form.Label className="fw-bold">Assign to</Form.Label>
                                <Form.Control
                                    type="text"
                                    defaultValue="Everyone"
                                    disabled={disabled}
                                />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label className="fw-bold">Due</Form.Label>
                                <Form.Control
                                    type="datetime-local"
                                    id="wd-due-date"
                                    value={dueDate}
                                    disabled={disabled}
                                    onChange={(e) => setDueDate(e.target.value)}
                                />
                            </Form.Group>

                            <Row>
                                <Col md={6}>
                                    <Form.Group>
                                        <Form.Label className="fw-bold">
                                            Available from
                                        </Form.Label>
                                        <Form.Control
                                            type="datetime-local"
                                            id="wd-available-from"
                                            value={availableFrom}
                                            disabled={disabled}
                                            onChange={(e) =>
                                                setAvailableFrom(e.target.value)
                                            }
                                        />
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group>
                                        <Form.Label className="fw-bold">Until</Form.Label>
                                        <Form.Control
                                            type="datetime-local"
                                            id="wd-available-until"
                                            value={availableUntil}
                                            disabled={disabled}
                                            onChange={(e) =>
                                                setAvailableUntil(e.target.value)
                                            }
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>
                        </div>
                    </Col>
                </Row>

                <hr />

                <div className="d-flex justify-content-end">
                    <Button
                        variant="secondary"
                        className="me-2"
                        onClick={handleCancel}
                    >
                        Cancel
                    </Button>

                    {isFaculty && (
                        <Button variant="danger" onClick={handleSave}>
                            Save
                        </Button>
                    )}
                </div>
            </Form>
        </div>
    );
}