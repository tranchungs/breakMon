"use client";
import { useState } from "react";
import { PlayGame } from "./Playgame";
import { Menu } from "./Menu";

export function LeaderBoard() {
  const [isLeaderBoard, setLeaderBoard] = useState(true);
  if (!isLeaderBoard) {
    return <Menu></Menu>;
  }
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-[#111] p-4 space-y-6">
      <button
        onClick={() => {
          setLeaderBoard(false);
        }}
      >
        BACK
      </button>
    </div>
  );
}
