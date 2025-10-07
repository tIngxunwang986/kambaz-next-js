"use client";

import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import FormGroup from "react-bootstrap/FormGroup";
import FormLabel from "react-bootstrap/FormLabel";
import FormControl from "react-bootstrap/FormControl";
import FormSelect from "react-bootstrap/FormSelect";
import FormCheck from "react-bootstrap/FormCheck";

export default function AssignmentEditor() {
    return (
        <div id="wd-assignments-editor">
            <Form>
                <FormGroup className="mb-3">
                    <FormLabel htmlFor="wd-name">Assignment Name</FormLabel>
                    <FormControl id="wd-name" type="text" defaultValue="A1" />
                </FormGroup>

                <FormGroup className="mb-3">
                    <FormControl
                        as="textarea"
                        id="wd-description"
                        rows={8}
                        defaultValue="Complete all the Lab exercises and Kambaz exercises described in Chapter 1 of Developing Full Stack Next.js Web Applications. Submit a link to the landing page of your Web application running on Vercel."
                    />
                </FormGroup>

                <Row className="mb-3">
                    <Col md={3} className="text-end">
                        <FormLabel htmlFor="wd-points">Points</FormLabel>
                    </Col>
                    <Col md={9}>
                        <FormControl id="wd-points" type="number" defaultValue={100} />
                    </Col>
                </Row>

                <Row className="mb-3">
                    <Col md={3} className="text-end">
                        <FormLabel htmlFor="wd-group">Assignment Group</FormLabel>
                    </Col>
                    <Col md={9}>
                        <FormSelect id="wd-group" defaultValue="ASSIGNMENTS">
                            <option>ASSIGNMENTS</option>
                            <option>QUIZZES</option>
                            <option>EXAMS</option>
                            <option>PROJECT</option>
                        </FormSelect>
                    </Col>
                </Row>

                <Row className="mb-3">
                    <Col md={3} className="text-end">
                        <FormLabel htmlFor="wd-display-grade-as">Display Grade as</FormLabel>
                    </Col>
                    <Col md={9}>
                        <FormSelect id="wd-display-grade-as" defaultValue="Percentage">
                            <option>Percentage</option>
                            <option>Points</option>
                            <option>Letter Grade</option>
                        </FormSelect>
                    </Col>
                </Row>

                <Row className="mb-3">
                    <Col md={3} className="text-end align-top">
                        <FormLabel htmlFor="wd-submission-type">Submission Type</FormLabel>
                    </Col>
                    <Col md={9}>
                        <FormSelect id="wd-submission-type" defaultValue="Online" className="mb-2">
                            <option>Online</option>
                            <option>On Paper</option>
                            <option>No Submission</option>
                        </FormSelect>

                        <div className="border p-3">
                            <FormLabel className="fw-bold mb-2">Online Entry Options</FormLabel>
                            <FormCheck type="checkbox" id="wd-text-entry" label="Text Entry" />
                            <FormCheck type="checkbox" id="wd-website-url" label="Website URL" defaultChecked />
                            <FormCheck type="checkbox" id="wd-media-recordings" label="Media Recordings" />
                            <FormCheck type="checkbox" id="wd-student-annotation" label="Student Annotation" />
                            <FormCheck type="checkbox" id="wd-file-upload" label="File Uploads" />
                        </div>
                    </Col>
                </Row>

                <Row className="mb-3">
                    <Col md={3} className="text-end">
                        <FormLabel htmlFor="wd-assign-to">Assign to</FormLabel>
                    </Col>
                    <Col md={9}>
                        <FormControl id="wd-assign-to" type="text" defaultValue="Everyone" />
                    </Col>
                </Row>

                <Row className="mb-3">
                    <Col md={3} className="text-end">
                        <FormLabel htmlFor="wd-due-date">Due</FormLabel>
                    </Col>
                    <Col md={9}>
                        <FormControl id="wd-due-date" type="date" defaultValue="2024-05-13" />
                    </Col>
                </Row>

                <Row className="mb-3">
                    <Col md={3} className="text-end">
                        <FormLabel htmlFor="wd-available-from">Available from</FormLabel>
                    </Col>
                    <Col md={4}>
                        <FormControl id="wd-available-from" type="date" defaultValue="2024-05-06" />
                    </Col>
                    <Col md={1} className="text-center">
                        <FormLabel htmlFor="wd-available-until">Until</FormLabel>
                    </Col>
                    <Col md={4}>
                        <FormControl id="wd-available-until" type="date" defaultValue="2024-05-20" />
                    </Col>
                </Row>

                <hr />

                <div className="d-flex justify-content-end">
                    <Button variant="secondary" className="me-2">Cancel</Button>
                    <Button variant="danger">Save</Button>
                </div>
            </Form>
        </div>
    );
}