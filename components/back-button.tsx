"use client"

import { useRouter } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function BackButton() {
  const router = useRouter()

  return (
    <Button
      variant="outline"
      size="sm"
      className="h-7 gap-1.5 border-border/60 bg-background/60 px-3 text-xs hover:bg-muted/40"
      onClick={() => router.back()}
    >
      <ArrowLeft className="size-3" />
      Back to reviews
    </Button>
  )
}
