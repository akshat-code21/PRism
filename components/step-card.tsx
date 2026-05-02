import { CheckCircle2 } from "lucide-react"

export default
    function StepCard({
        step,
        icon,
        label,
        done,
        locked = false,
        children,
    }: {
        step: number
        icon: React.ReactNode
        label: string
        done: boolean
        locked?: boolean
        children: React.ReactNode
    }) {
    return (
        <div className="flex gap-4">
            <div className="flex flex-col items-center">
                <div
                    className={`flex size-6.5 shrink-0 items-center justify-center rounded-full border text-xs font-semibold transition-all duration-300 ${done
                            ? "border-primary bg-primary text-primary-foreground shadow-sm shadow-primary/30"
                            : locked
                                ? "border-border/50 bg-muted/30 text-muted-foreground/50"
                                : "border-primary/50 bg-primary/10 text-primary"
                        }`}
                >
                    {done ? <CheckCircle2 className="size-3.5" /> : step}
                </div>
            </div>

            <div
                className={`flex-1 rounded-xl border pb-5 pt-4 transition-all duration-300 ${locked
                        ? "border-border/30 bg-muted/10 opacity-50"
                        : done
                            ? "border-primary/20 bg-primary/3"
                            : "border-border/60 bg-card/80 shadow-sm"
                    }`}
            >
                <div className="px-4">
                    <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-foreground/90">
                        <span
                            className={`${locked
                                    ? "text-muted-foreground/40"
                                    : done
                                        ? "text-primary"
                                        : "text-primary"
                                }`}
                        >
                            {icon}
                        </span>
                        <span className={locked ? "text-muted-foreground/50" : ""}>
                            {label}
                        </span>
                    </div>
                    <div className="space-y-2">{children}</div>
                </div>
            </div>
        </div>
    )
}
