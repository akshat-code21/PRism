export default async function ReviewHistoryPage({ params }: {
    params: Promise<{ id: string }>
}) {
    const { id } = await params;
    return <div>
        Hello World {id}
    </div>
}