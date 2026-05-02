import { Spinner } from "@/components/ui/spinner";

export default function NewReviewLoading() {
    return (
        <div className="flex items-center justify-center h-full gap-6 text-5xl font-bold">
            <Spinner className="size-10 animate-spin" />
            <p className="text-4xl text-muted-foreground">Loading reviews...</p>
        </div>
    )
}