import Link from "next/link";
import { Row, Col, Button, CardImg, CardBody, CardTitle, CardText,} from "react-bootstrap";
import Card from "react-bootstrap/Card";

type Course = {
    id: string;
    title: string;
    term: string;
    img: string;
};

const courses: Course[] = [
    {
        id: "cs5001",
        title: "CS 5001 Intensive Foundations of CS BOSTON MERGED FALL 2024",
        term: "2024 Fall",
        img: "cs5001.jpg",
    },
    {
        id: "cs5002",
        title: "CS5002 - Discrete Structures [Sec 01 + Sec 02] Fall 2024",
        term: "2024 Fall",
        img: "cs5002.jpg",
    },
    {
        id: "cs5004",
        title: "CS5004 Spring 2025 Boston All Merged",
        term: "2025 Spring",
        img: "cs5004.jpg",
    },
    {
        id: "cs5008",
        title: "CS5008 MERGED Spring 2025",
        term: "2025 Spring",
        img: "cs5008.jpg",
    },
    {
        id: "cs5520",
        title: "CS5520 18606 Mobile App Development SEC 03 Fall 2025 [BOS-1-TR]",
        term: "2025 Fall",
        img: "cs5520.jpg",
    },
    {
        id: "cs5610",
        title: "CS5610 18616 Web Development SEC 04 Fall 2025 [BOS-1-TR]",
        term: "2025 Fall",
        img: "cs5610.jpg",
    },
    {
        id: "cs5800",
        title: "CS5800 53170 Algorithms SEC 04 Summer Full 2025 [BOS-2-TR]",
        term: "2025 Summer",
        img: "cs5800.jpg",
    },
];

export default function Dashboard() {
    return (
        <div id="wd-dashboard">
            <h1 id="wd-dashboard-title">Dashboard</h1>
            <hr />
            <h2 id="wd-dashboard-published">Published Courses ({courses.length})</h2>
            <hr />

            <div id="wd-dashboard-courses">
                <Row xs={1} md={5} className="g-4">
                    {courses.map((c) => (
                        <Col key={c.id} className="wd-dashboard-course" style={{ width: "300px" }}>
                            <Card className="h-100">
                                <Link
                                    href={`/Courses/${c.id}/Home`}
                                    className="wd-dashboard-course-link text-decoration-none text-dark"
                                >
                                    <CardImg
                                        variant="top"
                                        src={`/images/${c.img}`}
                                        alt={c.title}
                                        width="100%"
                                        height={160}
                                    />
                                    <CardBody>
                                        <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">
                                            {c.title}
                                        </CardTitle>
                                        <CardText
                                            className="wd-dashboard-course-description overflow-hidden"
                                            style={{ height: "100px" }}
                                        >
                                            {c.term}
                                        </CardText>
                                        <Button variant="primary">Go</Button>
                                    </CardBody>
                                </Link>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </div>
        </div>
    );
}