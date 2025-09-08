"use client";
import React from "react";

interface GameBackButtonProps {
  onBack: () => void;
}

export function GameBackButton({ onBack }: GameBackButtonProps) {
  return (
    <button
      onClick={onBack}
      style={{ fontFamily: "'Press Start 2P', monospace", fontSize: "14px" }}
      className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
    >
      Back
    </button>
  );
}
