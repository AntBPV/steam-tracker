"use client";

import React from "react";

import { RecentGame } from "../types/steam";

interface RecentGamesListProps {
  recentlyPlayed: RecentGame[] | null;
}

export default function RecentGamesList({
  recentlyPlayed,
}: RecentGamesListProps) {
  if (!recentlyPlayed || recentlyPlayed.length === 0) {
    return (
      <div className="text-center p-4 text-gray-500">
        No recently played games
      </div>
    );
  }

  const formatPlaytime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    return `${hours} hours`;
  };

  return (
    <main className="bg-steam-header p-4 rounded-md">
      <h2 className="text-2xl text-steam-txt text-center font-bold mb-4">
        Recently Played Games
      </h2>
      <section
        className="h-110 overflow-y-auto pr-2 mb-4 custom-scrollbar"
        style={{
          scrollbarWidth: "thin",
          scrollbarColor: "#313945 #1f2329",
        }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {recentlyPlayed.map((game) => (
            <span
              key={game.appid}
              className="flex bg-gradient-to-tl from-steam-primary to-steam-secondary to-75% 
            items-center space-x-4 p-3 rounded-md"
            >
              <img
                src={`https://media.steampowered.com/steamcommunity/public/images/apps/${game.appid}/${game.img_icon_url}.jpg`}
                alt={`${game.name} icon`}
                width={64}
                height={64}
                className="rounded flex-shrink-0"
              />
              <span className="flex flex-col min-w-0">
                <h3 className="text-steam-txt font-semibold truncate">
                  {game.name}
                </h3>
                <a
                  href={`https://store.steampowered.com/app/${game.appid}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-steam-blue hover:underline block"
                >
                  Go to Store Page
                </a>
                <p className="text-steam-muted">
                  {formatPlaytime(game.playtime_2weeks)} played
                </p>
              </span>
            </span>
          ))}
        </div>
        {recentlyPlayed.length === 0 && (
          <p className="text-center text-steam-yellow mt-4">No Recent Games</p>
        )}
      </section>
      <section className="flex justify-end text-steam-green text-sm">
        <p>Total Recent Games: {recentlyPlayed.length}</p>
      </section>
    </main>
  );
}
