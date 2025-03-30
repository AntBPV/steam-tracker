"use client";

import React from "react";
import Link from "next/link";
import ProfileSearch from "./ProfileSearch";
import { SteamApiResponse } from "../types/steam";

interface HeaderProps {
  onProfileFound: (profileData: SteamApiResponse) => void;
}

export default function Header({ onProfileFound }: HeaderProps) {
  return (
    <header className="sticky top-0 z-10 mt-4 rounded-md bg-steam-header">
      <main className="container mx-auto py-4 px-3 sm:px-6">
        <section className="hidden sm:flex justify-between items-center">
          <Link
            href={"/"}
            className="flex items-center space-x-2 cursor-pointer"
          >
            <img
              src="https://img.icons8.com/?size=100&id=12465&format=png&color=F2F2F2"
              alt="Steam icon"
              width={40}
              height={40}
            />
            <h1 className="text-steam-txt text-xl font-bold">Steam Tracker</h1>
          </Link>
          <span className="w-full max-w-md ml-4">
            <ProfileSearch onProfileFound={onProfileFound} />
          </span>
        </section>

        <section className="flex flex-col sm:hidden">
          <div className="flex justify-center items-center mb-3">
            <Link
              href={"/"}
              className="flex items-center space-x-2 cursor-pointer"
            >
              <img
                src="https://img.icons8.com/?size=100&id=12465&format=png&color=F2F2F2"
                alt="Steam icon"
                width={32}
                height={32}
              />
              <h1 className="text-steam-txt text-lg font-bold">
                Steam Tracker
              </h1>
            </Link>
          </div>
          <div className="w-full">
            <ProfileSearch onProfileFound={onProfileFound} />
          </div>
        </section>
      </main>
    </header>
  );
}
