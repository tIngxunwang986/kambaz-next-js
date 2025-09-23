export default async function Quizzes(
    { params }: { params: Promise<{ cid: string }> }
) {
    const { cid } = await params;
    return <div id="wd-quizzes">Quizzes — Course {cid}</div>;
}