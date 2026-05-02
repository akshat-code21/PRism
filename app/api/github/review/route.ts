import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import { NextResponse } from "next/server"
import axios from "axios"

export async function POST(request: Request) {
  const { url } = await request.json()

  const { accessToken } = await auth.api.getAccessToken({
    body: {
      providerId: "github",
    },
    headers: await headers(),
  })

  if (!accessToken) {
    return NextResponse.json(
      { error: "GitHub account is not connected" },
      { status: 401 }
    )
  }

  const backendUrl = process.env.NEXT_PUBLIC_FASTAPI_SERVER_URL
  if (!backendUrl) {
    return NextResponse.json(
      { error: "Review service URL is not configured" },
      { status: 500 }
    )
  }

  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_FASTAPI_SERVER_URL}/review`,
    { url: url },
    {
      headers: {
        "x-github-token": accessToken,
      },
    }
  )

  console.log(response);

  return {
    review: response.data.review,
  }
}
