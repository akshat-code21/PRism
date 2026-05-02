"use client"
import { authClient } from "@/lib/auth-client";
import { Button } from "./ui/button";
import { redirect } from "next/navigation";


export default function Logout() {
    return <Button variant={"secondary"} onClick={async () => {
        await authClient.signOut({
            fetchOptions : {
                onSuccess : () => {
                    redirect("/")
                }
            }
        });
        
    }}>
        Sign Out
    </Button>
}