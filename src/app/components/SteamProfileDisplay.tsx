"use client";

import React from "react";
import { SteamProfile } from "../types/steam";

interface SteamProfileDisplayProps {
  profile: SteamProfile;
}

export default function SteamProfileDisplay({
  profile,
}: SteamProfileDisplayProps) {
  const getPersonaState = (state: number): string => {
    switch (state) {
      case 0:
        return "Offline";
      case 1:
        return "Online";
      case 2:
        return "Busy";
      case 3:
        return "AFK";
      case 4:
        return "Inactive";
      case 5:
        return "Looking to trade";
      case 6:
        return "Looking to play";
      default:
        return "Unknown";
    }
  };

  const getLastLogoff = (lastLogoff: number): string => {
    const date = new Date(lastLogoff * 1000);
    return date.toLocaleString();
  };

  return (
    <main className="max-w-xl mx-auto p-5 rounded-md bg-gradient-to-r from-steam-primary to-steam-secondary to-75% mt-4">
      <section className="flex">
        <span className="w-1/3 pr-4">
          <img
            src={profile.avatarfull}
            alt={`${profile.personaname}'s avatar`}
            className="w-full rounded-full"
          />
        </span>

        <section className="w-2/3">
          <span className="mb-4">
            <h2 className="text-2xl font-bold text-steam-txt">
              {profile.personaname}
            </h2>
            <p className="text-sm text-steam-muted">{profile.steamid}</p>
          </span>

          <a
            href={profile.profileurl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-lg font-medium text-steam-blue hover:underline block mb-3"
          >
            Go to profile
          </a>

          <span className="space-y-2 text-steam-txt">
            <p>State: {getPersonaState(profile.personastate)}</p>
            <p>Last Connection: {getLastLogoff(profile.lastlogoff)}</p>
          </span>
        </section>
      </section>
    </main>
  );
}
