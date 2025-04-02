'use client'


import { useAuth } from "@/context/auth"
import { Button } from "./ui/button"

export default function ContinueWithGoogle() {
    const auth = useAuth()
  return (
    <Button className="w-full" onClick={() => {
        auth?.logInWithGoogle()
    }}>
        Content with Google
    </Button>
  )
}

