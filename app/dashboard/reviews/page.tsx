import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import axios from "axios"
import { columns, DataTable } from "@/components/ui/data-table";
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Review History",
  description:
    "Browse and revisit all your past AI-generated pull request reviews.",
}

export default async function HistoryPage() {
    const headerList = await headers()
    const session = await auth.api.getSession({
        headers: headerList,
    })

    if (!session) {
        redirect("/auth/sign-in")
    }

    let reviews;

    try {
        const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/reviews`, {
            headers: { Cookie: headerList.get("cookie") ?? "" },
        })
        reviews = data.allReviews
    } catch {
    }

    return <div className="w-full h-screen px-4 py-10 sm:px-6">
        <DataTable columns={columns} data={reviews} />
    </div>
}