export default async function Piazza(
    { params }: { params: Promise<{ cid: string }> }
) {
    const { cid } = await params;
    return <div id="wd-piazza">Piazza — Course {cid}</div>;
}