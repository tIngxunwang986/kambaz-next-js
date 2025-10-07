import Link from "next/link";
import { FaCheckCircle, FaEllipsisV, FaPlus } from "react-icons/fa";
import Button from "react-bootstrap/Button";
import FormControl from "react-bootstrap/FormControl";
import InputGroup from "react-bootstrap/InputGroup";
import InputGroupText from "react-bootstrap/InputGroupText";
import { BsGripVertical } from "react-icons/bs";
import { FiSearch } from "react-icons/fi";

type Row = {
    aid: string;
    title: string;
    due: string;
    pts: number;
    notAvailable: string;
};

const items: Row[] = [
    { aid: "123", title: "A1", due: "Sep 22 at 11:59pm", pts: 100, notAvailable: "Sep 08 at 12:00am" },
    { aid: "234", title: "A2", due: "Oct 06 at 11:59pm", pts: 100, notAvailable: "Sep 22 at 12:00am" },
    { aid: "345", title: "A3", due: "Oct 20 at 11:59pm", pts: 100, notAvailable: "Oct 06 at 12:00am" },
];

export default async function Assignments({ params }: { params: Promise<{ cid: string }> }) {
    const { cid } = await params;

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
                    {items.map((a) => (
                        <li key={a.aid} className="wd-assignment-list-item list-group-item d-flex justify-content-between align-items-center">
                            <div>
                                <BsGripVertical className="me-2" />
                                <FaCheckCircle className="text-success me-2" />
                                <Link
                                    href={`/Courses/${cid}/Assignments/${a.aid}`}
                                    className="wd-assignment-link text-decoration-none text-dark"
                                >
                                    <strong>{a.title}</strong>
                                </Link>
                                <div className="small text-muted ms-5">
                                    Multiple Modules | <strong>Not available until</strong> {a.notAvailable}
                                    <br />
                                    <strong>Due</strong> {a.due} | {a.pts} pts
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