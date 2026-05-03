import { viewPaths } from "@better-auth-ui/react/core"
import { notFound } from "next/navigation"
import type { Metadata } from "next"

import { Auth } from "@/components/auth/auth"

function formatPathTitle(path: string): string {
  return path
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ path: string }>
}): Promise<Metadata> {
  const { path } = await params
  const title = formatPathTitle(path)

  return {
    title,
    description: `${title} to PRism — AI-powered GitHub PR reviews.`,
  }
}

export default async function AuthPage({
  params
}: {
  params: Promise<{
    path: string
  }>
}) {
  const { path } = await params;

  if (!Object.values(viewPaths.auth).includes(path)) {
    notFound()
  }

  return (
    <div className="flex justify-center items-center w-full h-screen my-auto p-4 md:p-6">
      <Auth path={path} />
    </div>
  )
}