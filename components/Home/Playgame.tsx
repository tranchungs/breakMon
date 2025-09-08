"use client";
import { useEffect, useState } from "react";
import { EndGame } from "./EndGame";
interface PlayGameProps {
  onBack: () => void;
}
export function PlayGame({ onBack }: PlayGameProps) {
  const [clickCount, setClickCount] = useState(1);
  const [isBonking, setIsBonking] = useState(false);
  const [canClick, setCanClick] = useState(true);
  const [timeLeft, setTimeLeft] = useState(15);
  const [isGameOver, setIsGameOver] = useState(false);

  const handleClick = () => {
    if (!canClick || timeLeft <= 0) return;

    const audio = new Audio("/images/cheem.mp3");
    audio.play();

    setCanClick(false);
    setIsBonking(true);
    setClickCount((prev) => prev + 1);
  };

  const handleImageLoad = () => {
    setTimeout(() => {
      setIsBonking(false);
      setCanClick(true);
    }, 400);
  };

  const getImageSrc = () =>
    isBonking ? "/images/giphy.gif" : "/images/bonk1.jpg";

  // Countdown & check game over
  useEffect(() => {
    if (timeLeft <= 0) {
      setIsGameOver(true); // chuyển trạng thái sang kết thúc game
      return;
    }

    const interval = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft]);

  if (isGameOver) {
    return <EndGame clickCount={clickCount} onBack={onBack} />;
  }

  return (
    <div className="space-y-4 border border-[#333] rounded-md p-6 w-fit mx-auto bg-[#111]">
      {/* Nút Exit góc trái */}

      <div className="w-[200px] mx-auto">
        <p className="text-white text-center text-base font-semibold">
          Tap To Break Monad
        </p>
      </div>
      <p className="text-white text-xs text-center">
        ⏳ Time left: {timeLeft}s
      </p>

      <div className="relative w-[200px] h-[200px]">
        <button
          onClick={handleClick}
          disabled={!canClick || timeLeft <= 0}
          className={`w-full h-full p-0 border-none bg-transparent ${
            !canClick ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          <img
            src={getImageSrc()}
            alt="Bonk"
            className="w-full h-full object-cover rounded"
            onLoad={isBonking ? handleImageLoad : undefined}
          />
        </button>
      </div>

      <p
        style={{
          fontFamily: "'Press Start 2P', monospace",
          textShadow: "2px 2px #2a1e32",
        }}
        className="text-white text-sm text-center"
      >
        👊 Break: {clickCount}
      </p>
    </div>
  );
}
