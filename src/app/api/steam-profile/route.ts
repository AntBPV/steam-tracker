import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const STEAM_API_KEY = process.env.STEAM_API_KEY;

  const steamId = request.nextUrl.searchParams.get("steamId");
  const appId = request.nextUrl.searchParams.get("appId") || "730";

  if (!STEAM_API_KEY) {
    return NextResponse.json(
      { error: "API Key not setted up" },
      { status: 500 }
    );
  }

  if (!steamId) {
    return NextResponse.json({ error: "Steam ID required" }, { status: 400 });
  }

  const endpoints = [
    {
      name: "playerSummaries",
      url: `http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${STEAM_API_KEY}&steamids=${steamId}&format=json`,
    },
    {
      name: "ownedGames",
      url: `http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=${STEAM_API_KEY}&steamid=${steamId}&include_appinfo=true&format=json`,
    },
    {
      name: "recentlyPlayedGames",
      url: `http://api.steampowered.com/IPlayerService/GetRecentlyPlayedGames/v0001/?key=${STEAM_API_KEY}&steamid=${steamId}&include_appinfo=true&format=json`,
    },
  ];

  try {
    const fetchPromises = endpoints.map(async (endpoint) => {
      try {
        const response = await fetch(endpoint.url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          console.warn(`Endpoint ${endpoint.name} failed`);
          return { [endpoint.name]: null };
        }
        const data = await response.json();
        return { [endpoint.name]: data };
      } catch (error) {
        console.error(`Error fetching ${endpoint.name}: `, error);
        return { [endpoint.name]: null };
      }
    });

    const results = await Promise.all(fetchPromises);

    const combinedData = results.reduce((acc, current) => {
      return { ...acc, ...current };
    }, {});

    return NextResponse.json(combinedData);
  } catch (error) {
    console.error(`Error fetching Steam Data: `, error);
    return NextResponse.json(
      { error: "Couldn't fetch Steam Data" },
      { status: 500 }
    );
  }
}
