import Link from "next/link";

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

export default function Assignments() {
    return (
        <div id="wd-assignments">
            <input id="wd-search-assignment" placeholder="Search for Assignments" />
            <button id="wd-add-assignment-group">+ Group</button>
            <button id="wd-add-assignment">+ Assignment</button>

            <h3 id="wd-assignments-title">
                ASSIGNMENTS 40% of Total <button>+</button>
            </h3>

            <ul id="wd-assignment-list">
                {items.map((a) => (
                    <li key={a.aid} className="wd-assignment-list-item">
                        <Link
                            href={`/Courses/1234/Assignments/${a.aid}`}
                            className="wd-assignment-link"
                        >
                            {a.title}
                        </Link>
                        <div>
                            Multiple Modules | <b>Not available until</b> {a.notAvailable}
                            <br />
                            <b>Due</b> {a.due} | {a.pts} pts
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}