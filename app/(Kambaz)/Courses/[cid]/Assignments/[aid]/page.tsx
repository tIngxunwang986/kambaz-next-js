"use client";

import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import { useParams } from "next/navigation";
import * as db from "@/app/(Kambaz)/Database";
import Link from "next/link";

export default function AssignmentEditor() {
    const { cid, aid } = useParams();

    const assignment = db.assignments.find(
        (a: any) => a._id === aid
    );

    if (!assignment) {
        return <div>Assignment not found</div>;
    }

    const description = "The assignment is available online\n\nSubmit a link to the landing page of your Web application running on Netlify.\n\nThe landing page should include the following:\n\n• Your full name and section\n• Links to each of the lab assignments\n• Link to the Kanbas application\n• Links to all relevant source code repositories\n\nThe Kanbas application should include a link to navigate back to the landing page.";
    const points = 100;
    const dueDate = "2024-05-13T23:59";
    const availableFrom = "2024-05-06T00:00";

    return (
        <div id="wd-assignments-editor">
            <Form>
                <Form.Group className="mb-3">
                    <Form.Label>Assignment Name</Form.Label>
                    <Form.Control
                        type="text"
                        id="wd-name"
                        defaultValue={assignment.title}
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Control
                        as="textarea"
                        rows={10}
                        id="wd-description"
                        defaultValue={description}
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
                            defaultValue={points}
                        />
                    </Col>
                </Row>

                <Row className="mb-3">
                    <Col md={3}>
                        <Form.Label className="text-end d-block">Assignment Group</Form.Label>
                    </Col>
                    <Col md={9}>
                        <Form.Select id="wd-group">
                            <option value="ASSIGNMENTS">ASSIGNMENTS</option>
                            <option value="QUIZZES">QUIZZES</option>
                            <option value="EXAMS">EXAMS</option>
                            <option value="PROJECT">PROJECT</option>
                        </Form.Select>
                    </Col>
                </Row>

                <Row className="mb-3">
                    <Col md={3}>
                        <Form.Label className="text-end d-block">Display Grade as</Form.Label>
                    </Col>
                    <Col md={9}>
                        <Form.Select id="wd-display-grade-as">
                            <option value="PERCENTAGE">Percentage</option>
                            <option value="POINTS">Points</option>
                        </Form.Select>
                    </Col>
                </Row>

                <Row className="mb-3">
                    <Col md={3}>
                        <Form.Label className="text-end d-block">Submission Type</Form.Label>
                    </Col>
                    <Col md={9}>
                        <div className="border rounded p-3">
                            <Form.Select id="wd-submission-type" className="mb-3">
                                <option value="ONLINE">Online</option>
                                <option value="ON_PAPER">On Paper</option>
                            </Form.Select>

                            <Form.Label className="fw-bold">Online Entry Options</Form.Label>
                            <Form.Check
                                type="checkbox"
                                id="wd-text-entry"
                                label="Text Entry"
                                className="mb-2"
                            />
                            <Form.Check
                                type="checkbox"
                                id="wd-website-url"
                                label="Website URL"
                                defaultChecked
                                className="mb-2"
                            />
                            <Form.Check
                                type="checkbox"
                                id="wd-media-recordings"
                                label="Media Recordings"
                                className="mb-2"
                            />
                            <Form.Check
                                type="checkbox"
                                id="wd-student-annotation"
                                label="Student Annotation"
                                className="mb-2"
                            />
                            <Form.Check
                                type="checkbox"
                                id="wd-file-upload"
                                label="File Uploads"
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
                                />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label className="fw-bold">Due</Form.Label>
                                <Form.Control
                                    type="datetime-local"
                                    id="wd-due-date"
                                    defaultValue={dueDate}
                                />
                            </Form.Group>

                            <Row>
                                <Col md={6}>
                                    <Form.Group>
                                        <Form.Label className="fw-bold">Available from</Form.Label>
                                        <Form.Control
                                            type="datetime-local"
                                            id="wd-available-from"
                                            defaultValue={availableFrom}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group>
                                        <Form.Label className="fw-bold">Until</Form.Label>
                                        <Form.Control
                                            type="datetime-local"
                                            id="wd-available-until"
                                            defaultValue=""
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>
                        </div>
                    </Col>
                </Row>

                <hr />

                <div className="d-flex justify-content-end">
                    <Link href={`/Courses/${cid}/Assignments`}>
                        <Button variant="secondary" className="me-2">
                            Cancel
                        </Button>
                    </Link>
                    <Link href={`/Courses/${cid}/Assignments`}>
                        <Button variant="danger">
                            Save
                        </Button>
                    </Link>
                </div>
            </Form>
        </div>
    );
}