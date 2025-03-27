"use client";

import React from "react";

interface SteamProfile {
  steamid: string;
  personaname: string;
  profileurl: string;
  avatar: string;
  avatarmedium: string;
  avatarfull: string;
  personastate: number;
  communityvisibilitystate: number;
  profilestate: number;
  lastlogoff: number;
  commentpermission?: number;
}

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
    <main className="max-w-md mx-auto p-5 bg-gray-600 rounded-md">
      <section className="steam-profile">
        <section className="flex items-center space-x-4 mb-4">
          <img
            src={profile.avatarfull}
            alt={`${profile.personaname}'s avatar`}
            className="w-16 h-16 rounded-full"
          />
          <span>
            <h2 className="text-xl font-bold text-white">
              {profile.personaname}
            </h2>
            <a
              href={profile.profileurl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              Go to Profile
            </a>
          </span>
        </section>
        <section className="space-y-2 text-gray-200">
          <p>Steam Id: {profile.steamid}</p>
          <p>State: {getPersonaState(profile.personastate)}</p>
          <p>Last Seen: {getLastLogoff(profile.lastlogoff)}</p>
        </section>
      </section>
    </main>
  );
}
