"use client";

import { FarcasterActions } from "@/components/Home/FarcasterActions";
import { User } from "@/components/Home/User";
import { WalletActions } from "@/components/Home/WalletActions";

export function Demo() {
  return (
    <div className="w-screen h-screen bg-[#111] flex flex-col items-center justify-center p-4 relative overflow-hidden">
      <h1
        style={{
          fontFamily: "'Press Start 2P', monospace",
          textShadow: "2px 2px #2a1e32",
        }}
        className="absolute top-4 left-0 right-0 mx-auto text-3xl sm:text-5xl text-yellow-400 leading-snug w-fit z-50 text-center"
      >
        <span className="italic block">BREAK</span>
        <span className="italic text-purple-600 block">MONAD</span>
      </h1>

      <div className="w-full max-w-4xl space-y-6 mt-24">
        <WalletActions />
      </div>
    </div>
  );
}
