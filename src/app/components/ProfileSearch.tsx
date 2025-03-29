"use client";

import React, { useState } from "react";
import { SteamApiResponse } from "../types/steam";

interface SteamProfileSearchFormProps {
  onProfileFound: (profileData: SteamApiResponse) => void;
}

export default function ProfileSearch({
  onProfileFound,
}: SteamProfileSearchFormProps) {
  const [steamId, setSteamId] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!steamId.trim()) {
      setError("Please enter a valid Steam ID");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/steam-profile?steamId=${steamId}`);

      if (!response.ok) {
        throw new Error("Profile not found");
      }

      const data = await response.json();

      if (!data.playerSummaries?.response?.players?.length) {
        throw new Error("Steam Id not found");
      }

      onProfileFound(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unknown error ocurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main>
      <form onSubmit={handleSearch}>
        <section className="flex relative">
          <input
            type="text"
            value={steamId}
            onChange={(e) => setSteamId(e.target.value)}
            placeholder="Enter a Steam ID"
            className="flex-grow p-2 border rounded-l-md border-steam-muted placeholder-steam-muted bg-steam-searchbar text-steam-txt
            focus:outline-none
            "
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-steam-blue text-steam-txt px-4 py-2 rounded-r-md hover:bg-steam-blue-hover
            disabled:bg-steam-blue-hover disabled:cursor-not-allowed transition-colors duration-200
            min-w-[120px] max-w-[120px]"
          >
            {loading ? "Searching..." : "Search"}
          </button>
          {error && (
            <div className="mt-2 p-5 left-0 right-0 absolute top-full bg-steam-header rounded-md items-center justify-center error-animation">
              <p className="text-steam-red text-lg text-center font-bold">
                {error}
              </p>
            </div>
          )}
        </section>
      </form>
    </main>
  );
}
