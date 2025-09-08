"use client";
import { useEffect } from "react";
import { GameBackButton } from "../Home/GameBackButton";

interface UnityStackBallProps {
  onBack: () => void;
}

export default function UnityStackBall({ onBack }: UnityStackBallProps) {
  useEffect(() => {
    const buildUrl = "/UnityGame/StackBall";
    const loaderUrl = buildUrl + "/Gambuild.loader.js";
    const config = {
      dataUrl: buildUrl + "/Gambuild.data",
      frameworkUrl: buildUrl + "/Gambuild.framework.js",
      codeUrl: buildUrl + "/Gambuild.wasm",
      streamingAssetsUrl: "StreamingAssets",
      companyName: "DefaultCompany",
      productName: "StackBallGame",
      productVersion: "0.1",
    };

    const script = document.createElement("script");
    script.src = loaderUrl;
    script.onload = () => {
      // @ts-ignore
      createUnityInstance(document.querySelector("#unity-canvas"), config)
        .then((instance: any) => {
          console.log("Unity loaded", instance);
        })
        .catch((err: any) => {
          console.error(err);
        });
    };
    document.body.appendChild(script);
  }, []);

  return (
    <div
      id="unity-container"
      className="fixed inset-0 flex items-center justify-center bg-black"
    >
      <canvas id="unity-canvas" className="w-full h-full" />

      {/* Nút back nằm đè lên góc trên trái */}
      <div className="absolute bottom-4 right-4 z-50">
        <GameBackButton onBack={onBack} />
      </div>
    </div>
  );
}
