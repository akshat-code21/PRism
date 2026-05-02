import { Spinner } from "@/components/ui/spinner";

export default function DashboardLoading() {
    return (
        <div className="flex items-center justify-center h-full gap-2 text-5xl font-bold">
            <Spinner className="size-4 animate-spin" />
            <p className="text-sm text-muted-foreground">Loading dashboard...</p>
        </div>
    )
}