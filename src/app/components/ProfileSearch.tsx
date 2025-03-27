"use client";

import React, { useState } from "react";

interface SteamProfileSearchFormProps {
  onProfileFound: (profile: any) => void;
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

      if (data.response.players.length === 0) {
        throw new Error("No profile with that Steam ID");
      }

      onProfileFound(data.response.players[0]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unknown error ocurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="max-w-md mx-auto p-5 bg-gray-500 rounded-md">
      <form onSubmit={handleSearch} className="mb-4">
        <section className="flex">
          <input
            type="text"
            value={steamId}
            onChange={(e) => setSteamId(e.target.value)}
            placeholder="Enter a Steam ID"
            className="flex-row p-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-500 text-white px-4 py-2 rounded-r-md hover:bg-blue-600 disabled:opacity-50"
          >
            {loading ? "Searching..." : "Search"}
          </button>
        </section>
        {error && <p className="text-red-500">{error}</p>}
      </form>
    </main>
  );
}
