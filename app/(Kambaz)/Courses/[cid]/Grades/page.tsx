export default async function Grades(
    { params }: { params: Promise<{ cid: string }> }
) {
    const { cid } = await params;
    return <div id="wd-grades">Grades — Course {cid}</div>;
}