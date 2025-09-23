export default async function People(
    { params }: { params: Promise<{ cid: string }> }
) {
    const { cid } = await params;
    return <div id="wd-people">People — Course {cid}</div>;
}