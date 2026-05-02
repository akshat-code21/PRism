"use client"
import { authClient } from "@/lib/auth-client";
import { Button } from "./ui/button";

export default function Logout() {
    return <Button variant={"secondary"} onClick={async () => {
        await authClient.signOut();
    }}>
        Sign Out
    </Button>
}