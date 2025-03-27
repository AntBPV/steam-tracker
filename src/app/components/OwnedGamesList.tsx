"use client";
import React, { useState, useMemo } from "react";
import Image from "next/image";

interface Game {
  appid: number;
  name: string;
  playtime_forever: number;
  img_icon_url: string;
  img_logo_url: string;
}

interface OwnedGamesListProps {
  games: Game[];
}

export default function OwnedGamesList({ games }: OwnedGamesListProps) {
  const [sortOrder, setSortOrder] = useState<"mostPlayed" | "leastPlayed">(
    "mostPlayed"
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [gamesLimit, setGamesLimit] = useState<number>(10);

  const limitOptions = [5, 10, 25, 50, 100, games.length];

  const formatPlaytime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    return `${hours} hours`;
  };

  const filteredGames = useMemo(() => {
    return games
      .filter((game) =>
        game.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .sort((a, b) => {
        return sortOrder === "mostPlayed"
          ? b.playtime_forever - a.playtime_forever
          : a.playtime_forever - b.playtime_forever;
      })
      .slice(0, gamesLimit);
  }, [games, sortOrder, searchTerm, gamesLimit]);

  return (
    <main className="bg-gray-700 p-4 rounded-md">
      <section className="flex justify-between mb-4">
        <input
          type="text"
          placeholder="Search by game name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 rounded bg-gray-700 text-white w-full mr-2"
        />
        <select
          value={sortOrder}
          onChange={(e) =>
            setSortOrder(e.target.value as "mostPlayed" | "leastPlayed")
          }
          className="p-2 rounded bg-gray-700 text-white"
        >
          <option value="mostPlayed">Most Played</option>
          <option value="leastPlayed">Least Played</option>
        </select>
        <select
          value={gamesLimit}
          onChange={(e) => setGamesLimit(Number(e.target.value))}
          className="p-2 rounded bg-gray-700 text-white"
        >
          {limitOptions.map((limit) => (
            <option key={limit} value={limit}>
              {limit === games.length ? "All Games" : `Top ${limit}`}
            </option>
          ))}
        </select>
      </section>
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredGames.map((game) => (
          <span
            key={game.appid}
            className="bg-gray-700 p-3 rounded-md flex items-center space-x-4"
          >
            {game.img_icon_url && (
              <Image
                src={`https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/apps/${game.appid}/${game.img_icon_url}.jpg`}
                alt={`${game.name} icon`}
                width={64}
                height={64}
                className="rounded"
              />
            )}
            <span>
              <h3 className="text-white font-semibold">{game.name}</h3>
              <p className="text-gray-400">
                Playtime: {formatPlaytime(game.playtime_forever)}
              </p>
            </span>
          </span>
        ))}
      </section>

      {filteredGames.length === 0 && (
        <p className="text-center text-gray-400 mt-4">No Games Found</p>
      )}

      <section className="mt-4 text-gray-400 text-sm">
        <p>Total Games: {games.length}</p>
        <p>Showing: {filteredGames.length}</p>
      </section>
    </main>
  );
}
