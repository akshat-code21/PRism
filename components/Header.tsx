import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import Logout from "./Logout"

export default async function Header() {
    const session = await auth.api.getSession({
        headers: await headers()
    })
    
    return (
        <div className="h-fit w-full border-b border-b-secondary flex flex-row justify-between p-3 items-center">
            <div className="font-bold text-2xl"><span className="text-primary">PR</span>ism</div>
            {session && <Logout/>}
        </div>
    )
}