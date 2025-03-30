"use client";
import React, { useState, useMemo } from "react";
import { Game } from "../types/steam";

interface OwnedGamesListProps {
  games: Game[];
}

export default function OwnedGamesList({ games }: OwnedGamesListProps) {
  const [sortOrder, setSortOrder] = useState<"mostPlayed" | "leastPlayed">(
    "mostPlayed"
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [gamesLimit, setGamesLimit] = useState<number>(25);

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
    <main className="bg-steam-header p-4 rounded-md">
      <h2 className="text-2xl text-steam-txt text-center font-bold mb-4 ">
        All Users Games
      </h2>
      <section className="flex flex-col sm:flex-row justify-between items-center gap-2 mb-4">
        <input
          type="text"
          placeholder="Search by game name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 rounded bg-steam-searchbar text-steam-txt placeholder-steam-muted
      border border-steam-muted w-full sm:w-1/2 focus:outline-none focus:border-steam-txt"
        />

        <section className="flex gap-2 w-full sm:w-auto">
          <span className="relative w-full sm:w-auto">
            <select
              value={sortOrder}
              onChange={(e) =>
                setSortOrder(e.target.value as "mostPlayed" | "leastPlayed")
              }
              className="p-2 pr-8 rounded bg-steam-header text-steam-txt border border-steam-muted
          appearance-none w-full cursor-pointer hover:border-steam-txt"
            >
              <option value={"mostPlayed"}>Most Played</option>
              <option value={"leastPlayed"}>Least Played</option>
            </select>

            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-steam-txt">
              <svg
                className="fill-current h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </span>
          </span>

          <span className="relative w-full sm:w-auto">
            <select
              value={gamesLimit}
              onChange={(e) => setGamesLimit(Number(e.target.value))}
              className="p-2 pr-8 rounded bg-steam-header text-steam-txt border border-steam-muted
          appearance-none w-full cursor-pointer hover:border-steam-txt"
            >
              {limitOptions.map((limit) => (
                <option key={limit} value={limit}>
                  {limit === games.length ? "All Games" : `Top ${limit}`}
                </option>
              ))}
            </select>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-steam-txt">
              <svg
                className="fill-current h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </span>
          </span>
        </section>
      </section>

      <section
        className="h-96 overflow-y-auto pr-2 mb-4 custom-scrollbar"
        style={{
          scrollbarWidth: "thin",
          scrollbarColor: "#313945 #1f2329",
        }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredGames.map((game) => (
            <span
              key={game.appid}
              className="flex bg-gradient-to-br from-steam-primary to-steam-secondary to-75% p-3 rounded-md
          items-center space-x-4"
              style={{ minHeight: "88px" }}
            >
              {game.img_icon_url && (
                <img
                  src={`https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/apps/${game.appid}/${game.img_icon_url}.jpg`}
                  alt={`${game.name} icon`}
                  width={64}
                  height={64}
                  className="rounded flex-shrink-0"
                />
              )}
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
                  Go To Store Page
                </a>
                <p className="text-steam-muted truncate">
                  {formatPlaytime(game.playtime_forever)} played
                </p>
              </span>
            </span>
          ))}
        </div>

        {filteredGames.length === 0 && (
          <p className="text-center text-steam-yellow mt-4">No Games Found</p>
        )}
      </section>

      <section className="flex justify-between text-steam-green text-sm">
        <p>Total Games: {games.length}</p>
        <p>Showing: {filteredGames.length}</p>
      </section>
    </main>
  );
}
