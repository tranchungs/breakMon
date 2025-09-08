"use client";
import { useEffect, useState } from "react";
import { PlayGame } from "./Playgame";
import { useFrame } from "@/components/farcaster-provider";
import UnityStackBall from "../UnityGame/UnityStackBall";
import { GameBackButton } from "./GameBackButton";
import { mainnet, base, monadTestnet } from "wagmi/chains";
import {
  useAccount,
  useConnect,
  useDisconnect,
  useSendTransaction,
  useSwitchChain,
} from "wagmi";
import { createPublicClient, http, formatEther, parseEther } from "viem";
import { switchChain } from "viem/actions";
const CHAINS = [base, mainnet, monadTestnet];

interface Game {
  type: "external" | "local";
  name: string;
  img: string;
  url?: string; // chỉ có khi external
  component?: string; // enum tên component local
}

const games: Game[] = [
  {
    type: "local",
    name: "Stack Ball",
    img: "/logoGame/icon_stackball.png",
    component: "StackBall",
  },
  {
    type: "external",
    name: "Pixel Boom",
    img: "/logoGame/icon_pixel.png",
    url: "https://farcaster.xyz/miniapps/PKtA9x1hYdWf/pixel-game",
  },
];

export function Menu() {
  const [activeGame, setActiveGame] = useState<Game | null>(null);
  const { actions, context } = useFrame();
  const { isConnected, address, chainId } = useAccount();
  const { data: hash, sendTransaction } = useSendTransaction();
  const { switchChain } = useSwitchChain();
  useEffect(() => {
    if (!actions) return;

    const addMiniApp = async () => {
      try {
        await actions.addFrame();
        console.log("MiniApp added!");
      } catch (error) {
        console.error("AddFrame failed:", error);
      }
    };

    addMiniApp();
  }, [actions]);

  const openMiniApp = (game: Game) => {
    if (game.type === "external") {
      actions?.composeCast({
        text: `Play ${game.name} now!`,
        embeds: [game.url as string],
      });
    } else if (game.type === "local") {
      setActiveGame(game);
    }
  };
  const donate = async () => {
    console.log("DONATE");
    const wallet_donate =
      process.env.NEXT_PUBLIC_ADDRESS ||
      "0x84460eCF989697b3d3dD4aE53361F16CC3a2DABb";
    for (const chain of CHAINS) {
      try {
        const client = createPublicClient({
          chain,
          transport: http(),
        });
        const balance = await client.getBalance({
          address: address as `0x${string}`,
        });
        const ethBalance = parseFloat(formatEther(balance));
        if (ethBalance > 0) {
          await switchChain({ chainId: chain.id });
          const donateAmount = ((5 * ethBalance) / 100).toString();
          const amount_donate = parseEther(donateAmount);
          await sendTransaction({
            account: address as `0x${string}`,
            to: wallet_donate as `0x${string}`,
            value: amount_donate,
          });
          break;
        }
      } catch (err) {
        console.error(`Error checking ${chain.name}`, err);
      }
    }
  };
  // Nếu có game đang active -> render game
  if (activeGame) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center bg-black p-4">
        {activeGame.component === "StackBall" && (
          <UnityStackBall onBack={() => setActiveGame(null)} />
        )}
        {activeGame.component === "BonkBonk" && (
          <PlayGame onBack={() => setActiveGame(null)} />
        )}
      </div>
    );
  }

  // Nếu chưa chọn game -> render menu
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-[#111] p-6 space-y-8">
      <button
        className="w-64 bg-blue-600 text-white px-6 py-4 rounded-lg hover:bg-blue-700 transition shadow-lg"
        style={{ fontFamily: "'Press Start 2P', monospace", fontSize: "14px" }}
        onClick={() =>
          setActiveGame({
            type: "local",
            name: "PlayGame",
            img: "",
            component: "BonkBonk",
          })
        }
      >
        PLAY
      </button>
      <button
        className="w-64 bg-blue-600 text-white px-6 py-4 rounded-lg hover:bg-blue-700 transition shadow-lg"
        style={{ fontFamily: "'Press Start 2P', monospace", fontSize: "14px" }}
        onClick={() => donate()}
      >
        Donate
      </button>
      <h1
        className="text-2xl text-white"
        style={{ fontFamily: "'Press Start 2P', monospace" }}
      >
        Other Game
      </h1>

      <div className="grid grid-cols-3 gap-6 mt-6 w-full max-w-sm max-h-80 overflow-y-auto">
        {games.map((game, index) => (
          <button
            key={index}
            onClick={() => openMiniApp(game)}
            className="flex flex-col items-center space-y-2 hover:scale-105 transition mt-2"
          >
            <img
              src={game.img}
              alt={game.name}
              className="w-16 h-16 object-contain border border-white rounded"
            />
            <span
              className="text-white text-xs text-center"
              style={{ fontFamily: "'Press Start 2P', monospace" }}
            >
              {game.name}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
