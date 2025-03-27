"use client";

import React, { useState } from "react";
import ProfileSearch from "./components/ProfileSearch";
import SteamProfileDisplay from "./components/SteamProfileDisplay";

export default function Home() {
  const [profile, setProfile] = useState(null);

  const handleProfileFound = (foundProfile: any) => {
    setProfile(foundProfile);
  };

  return (
    <main className="container mx-auto">
      <ProfileSearch onProfileFound={handleProfileFound} />

      {profile && <SteamProfileDisplay profile={profile} />}
    </main>
  );
}
