"use client"
import { authClient } from "@/lib/auth-client";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation"


export default function Logout() {
    const router = useRouter()
    return <Button variant={"secondary"} onClick={async () => {
        await authClient.signOut({
            fetchOptions : {
                onSuccess : () => {
                    router.push("/")
                }
            }
        });
        
    }}>
        Sign Out
    </Button>
}