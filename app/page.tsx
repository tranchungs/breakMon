import App from "@/components/pages/app";
import { APP_URL } from "@/lib/constants";
import type { Metadata } from "next";

const frame = {
  version: "next",
  imageUrl: `${APP_URL}/images/bonk1.png`,
  button: {
    title: "Break Monad Game",
    action: {
      type: "launch_frame",
      name: "Break Monad Game",
      url: APP_URL,
      splashImageUrl: `${APP_URL}/images/splash.png`,
      splashBackgroundColor: "#f7f7f7",
    },
  },
};

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Break Monad",
    openGraph: {
      title: "Tap to break monad game and claim reward",
      description: "Try break Monad",
    },
    other: {
      "fc:frame": JSON.stringify(frame),
    },
  };
}

export default function Home() {
  return <App />;
}
