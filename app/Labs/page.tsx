import Link from "next/link";

export default function Labs() {
    return (
        <div id="wd-labs">
            <h1>Labs</h1>

            <p>
                <b>Name:</b> Tingxun Wang<br />
                <b>Section:</b> Fall 2025 Section 04
            </p>

            <ul>
                <li>
                    <Link href="/Labs/Lab1" id="wd-lab1-link">
                        Lab 1: HTML Examples
                    </Link>
                </li>
                <li>
                    <Link href="/Labs/Lab2" id="wd-lab2-link">
                        Lab 2: CSS Basics
                    </Link>
                </li>
                <li>
                    <Link href="/Labs/Lab3" id="wd-lab3-link">
                        Lab 3: JavaScript Fundamentals
                    </Link>
                </li>
                <li>
                    <Link href="/Labs/Lab4" id="wd-lab4-link">
                        Lab 4: Managing State and User Input with Forms
                    </Link>
                </li>
                <li>
                    <Link href="/Labs/Lab5" id="wd-lab5-link">
                        Lab 5: Implementing RESTful Web APIs with Express.js
                    </Link>
                </li>
                <li>
                    <Link href="/" id="wd-kambaz-link">Kambaz</Link>
                </li>
            </ul>

            <p>
                <a
                    id="wd-github"  //
                    href="https://github.com/tIngxunwang986/kambaz-next-js/tree/A5"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    GitHub link
                </a>
            </p>
        </div>
    );
}