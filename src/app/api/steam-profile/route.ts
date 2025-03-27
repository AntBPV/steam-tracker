import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const STEAM_API_KEY = process.env.STEAM_API_KEY;

  const steamId = request.nextUrl.searchParams.get("steamId");

  if (!STEAM_API_KEY) {
    return NextResponse.json(
      {
        error: "API key not setted up",
      },
      { status: 500 }
    );
  }

  if (!steamId) {
    return NextResponse.json(
      {
        error: "Steam ID required",
      },
      { status: 400 }
    );
  }

  try {
    const response = await fetch(
      `http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${STEAM_API_KEY}&steamids=${steamId}&format=json`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Couldn't fetch Steam profile");
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error searching for profile:", error);
    return NextResponse.json(
      {
        error: "Couldn't fetch Steam profile",
      },
      { status: 500 }
    );
  }
}
