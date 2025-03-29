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
    <main className="mt-6">
      <h2 className="text-2xl font-bold mb-4">Recently Played Games</h2>
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {recentlyPlayed.map((game) => (
          <span key={game.appid} className="border rounded-md p-4">
            <section className="flex items-center space-x-4">
              <img
                src={`https://media.steampowered.com/steamcommunity/public/images/apps/${game.appid}/${game.img_icon_url}.jpg`}
                alt={`${game.name} icon`}
                width={64}
                height={64}
                className="rounded"
              />
              <span>
                <h3 className="font-bold">{game.name}</h3>
                <p className="text-sm text-gray-600">
                  {formatPlaytime(game.playtime_2weeks)} played
                </p>
              </span>
            </section>
          </span>
        ))}
      </section>
    </main>
  );
}
