"use client";

import React, { useState } from "react";
import Header from "./components/header";
import SteamProfileDisplay from "./components/SteamProfileDisplay";
import OwnedGamesList from "./components/OwnedGamesList";
import RecentGamesList from "./components/RecentGamesList";
import {
  Game,
  SteamProfile,
  RecentGame,
  SteamApiResponse,
} from "./types/steam";

export default function Home() {
  const [profile, setProfile] = useState<SteamProfile | null>(null);
  const [ownedGames, setOwnedGames] = useState<Game[] | null>(null);
  const [recentlyPlayed, setRecentlyPlayed] = useState<RecentGame[] | null>(
    null
  );

  const handleProfileFound = (steamData: SteamApiResponse) => {
    const profile = steamData.playerSummaries?.response?.players[0];
    const ownedGames = steamData.ownedGames?.response?.games || [];
    const recentGames = steamData.recentlyPlayedGames?.response?.games || [];

    setProfile(profile || null);
    setOwnedGames(ownedGames);
    setRecentlyPlayed(recentGames);
  };

  return (
    <main className="container mx-auto custom-scrollbar">
      <Header onProfileFound={handleProfileFound} />

      {profile && <SteamProfileDisplay profile={profile} />}
      {(ownedGames || recentlyPlayed) && (
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4 items-start">
          {ownedGames && (
            <span className="w-full">
              <OwnedGamesList games={ownedGames} />
            </span>
          )}
          {recentlyPlayed && (
            <span className="w-full">
              <RecentGamesList recentlyPlayed={recentlyPlayed} />
            </span>
          )}
        </section>
      )}
    </main>
  );
}
