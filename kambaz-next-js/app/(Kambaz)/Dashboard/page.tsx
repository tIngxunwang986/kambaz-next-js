import Link from "next/link";
import Image from "next/image";

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
        img: "/images/cs5001.jpg",
    },
    {
        id: "cs5002",
        title: "CS5002 - Discrete Structures [Sec 01 + Sec 02] Fall 2024",
        term: "2024 Fall",
        img: "/images/cs5002.jpg",
    },
    {
        id: "cs5004",
        title: "CS5004 Spring 2025 Boston All Merged",
        term: "2025 Spring",
        img: "/images/cs5004.jpg",
    },
    {
        id: "cs5008",
        title: "CS5008 MERGED Spring 2025",
        term: "2025 Spring",
        img: "/images/cs5008.jpg",
    },
    {
        id: "cs5520",
        title: "CS5520 18606 Mobile App Development SEC 03 Fall 2025 [BOS-1-TR]",
        term: "2025 Fall",
        img: "/images/cs5520.jpg",
    },
    {
        id: "cs5610",
        title: "CS5610 18616 Web Development SEC 04 Fall 2025 [BOS-1-TR]",
        term: "2025 Fall",
        img: "/images/cs5610.jpg",
    },
    {
        id: "cs5800",
        title: "CS5800 53170 Algorithms SEC 04 Summer Full 2025 [BOS-2-TR]",
        term: "2025 Summer",
        img: "/images/cs5800.jpg",
    },
];


export default function Dashboard() {
    return (
        <div id="wd-dashboard">
            <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
            <h2 id="wd-dashboard-published">Published Courses ({courses.length})</h2> <hr />
            <div id="wd-dashboard-courses">
                {courses.map(c => (
                    <div className="wd-dashboard-course" key={c.id} style={{display:"inline-block", margin: 12}}>
                        <Link href={`/Courses/${c.id}`} className="wd-dashboard-course-link">
                            <Image src={`/images/${c.img}`} alt={c.title} width={200} height={150} />
                            <div>
                                <h5>{c.title}</h5>
                                <p className="wd-dashboard-course-title">{c.term}</p>
                                <button>Go</button>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}

