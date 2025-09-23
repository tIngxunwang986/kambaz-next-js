export default async function Zoom(
    { params }: { params: Promise<{ cid: string }> }
) {
    const { cid } = await params;
    return <div id="wd-zoom">Zoom — Course {cid}</div>;
}