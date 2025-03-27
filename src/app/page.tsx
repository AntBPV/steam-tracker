"use client";

import React, { useState } from "react";
import ProfileSearch from "./components/ProfileSearch";
import SteamProfileDisplay from "./components/SteamProfileDisplay";
import OwnedGamesList from "./components/OwnedGamesList";
import { Game, SteamProfile, SteamApiResponse } from "./types/steam";

export default function Home() {
  const [profile, setProfile] = useState<SteamProfile | null>(null);
  const [ownedGames, setOwnedGames] = useState<Game[] | null>(null);
  /* 
  const [recentlyPlayed, setRecentlyPlayed] = useState(null);
  */

  const handleProfileFound = (steamData: SteamApiResponse) => {
    const profile = steamData.playerSummaries?.response?.players[0];
    const ownedGames = steamData.ownedGames?.response?.games || [];

    setProfile(profile || null);
    setOwnedGames(ownedGames);
    /*
    const recentGames = steamData.recentlyPlayedGames?.response?.games;
    setRecentlyPlayed(recentGames);
    */
  };

  return (
    <main className="container mx-auto">
      <ProfileSearch onProfileFound={handleProfileFound} />

      {profile && <SteamProfileDisplay profile={profile} />}
      {ownedGames && <OwnedGamesList games={ownedGames} />}
    </main>
  );
}
