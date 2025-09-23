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
                    <Link href="/" id="wd-kambaz-link">Kambaz
                    </Link>
                </li>
            </ul>

            <p>
                <a
                    id="wd-github-link"
                    href="https://github.com/tIngxunwang986/kambaz-next-js"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    GitHub link
                </a>
            </p>

            <p>
                <Link id="wd-kambaz-application-link" href="/Account/Signin">
                    Link to the Kambaz application
                </Link>
            </p>
        </div>
    );
}