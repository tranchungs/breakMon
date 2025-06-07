import { useFrame } from "@/components/farcaster-provider";
import { useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import abi from "./abi.json";
import { PlayGame } from "./Playgame";
import { useState, useEffect } from "react";

export function EndGame({ clickCount }: { clickCount: number }) {
  const { context } = useFrame();
  const { data: hash, writeContract } = useWriteContract();
  const [isPlayAgain, setPlayAgain] = useState(false);
  const [isClaiming, setIsClaiming] = useState(false);
  const [isClaimed, setClaimed] = useState(false);

  const { isSuccess } = useWaitForTransactionReceipt({ hash });

  useEffect(() => {
    if (hash) {
      setClaimed(true);
      setIsClaiming(false);
    }
  }, [isSuccess, isClaiming]);

  const Claim_Token = () => {
    const amount = BigInt(clickCount) * BigInt(10 ** 18);
    setIsClaiming(true);
    writeContract({
      address: "0x007AE456f9e5e6F181325540940EDffcD9026a45",
      abi: abi,
      functionName: "claim",
      args: [amount],
    });
  };

  const onPlayAgain = () => {
    setPlayAgain(true);
  };

  if (!isPlayAgain) {
    return (
      <div className="space-y-4 border border-[#333] rounded-md p-6 w-fit mx-auto bg-[#111] text-white">
        <div className="text-center space-y-2">
          <p className="text-lg font-semibold">Your Score</p>
          <p
            className="text-3xl font-bold text-green-400"
            style={{ fontFamily: "'Press Start 2P', monospace" }}
          >
            {clickCount}
          </p>
        </div>

        <div className="flex flex-row justify-center gap-4 pt-4">
          <button
            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg text-white font-semibold"
            onClick={onPlayAgain}
          >
            🔁 Play Again
          </button>

          <button
            className="px-4 py-2 bg-green-500 hover:bg-green-600 rounded-lg text-white font-semibold disabled:opacity-50"
            onClick={Claim_Token}
            disabled={isClaiming || isClaimed}
          >
            🎁 Claim
          </button>
        </div>

        {hash && (
          <p className="text-xs text-center text-gray-400 break-words mt-4">
            Transaction Hash:{" "}
            <a
              href={`https://testnet.monadexplorer.com/tx/${hash}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 underline hover:text-blue-600"
            >
              {hash.slice(0, 10)}...{hash.slice(-8)}
            </a>
          </p>
        )}
      </div>
    );
  } else {
    return <PlayGame />;
  }
}
