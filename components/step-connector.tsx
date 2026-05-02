export default function StepConnector({ active }: { active: boolean }) {
    return (
        <div className="ml-5.25 flex h-6 w-px flex-col">
            <div
                className={`h-full w-px transition-colors duration-500 ${
                    active ? "bg-primary/60" : "bg-border/60"
                }`}
            />
        </div>
    )
}