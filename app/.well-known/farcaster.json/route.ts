import { NextResponse } from "next/server";
import { APP_URL } from "../../../lib/constants";

export async function GET() {
  const farcasterConfig = {
    accountAssociation: {
      header:
        "eyJmaWQiOjEwMjU0MzcsInR5cGUiOiJjdXN0b2R5Iiwia2V5IjoiMHgwMEE2ZkJjOTIwODg0MUIyNzJEYkE0OUE0ODdkM0E2YkVkMDVmQ2JjIn0",
      payload: "eyJkb21haW4iOiJicmVhay1tb24udmVyY2VsLmFwcCJ9",
      signature:
        "MHhjN2Y5NGE3ZGI5NmQ3N2NkMzk1NTJjYjc4YTkyYjg0OTJlYWUxYzA1OTBiMGVjNjEwMDdhYTdiOGQyNjE4YjBkMTY0YjZhOGM2M2EwZTFkMjU2ZWM4NjE0NWEyOWFlMjk5OWM2YmM3MmQxMzJiODVmYTcxNmVjZGYwMWIxNTlhNjFj",
    },
    frame: {
      version: "1",
      name: "Bonk Bonk",
      iconUrl: `${APP_URL}/images/icon.png`,
      homeUrl: `${APP_URL}`,
      imageUrl: `${APP_URL}/images/feed.png`,
      screenshotUrls: [],
      tags: ["monad", "farcaster", "miniapp", "template"],
      primaryCategory: "developer-tools",
      buttonTitle: "Launch Game",
      splashImageUrl: `${APP_URL}/images/splash.png`,
      splashBackgroundColor: "#ffffff",
      webhookUrl: `${APP_URL}/api/webhook`,
    },
  };

  return NextResponse.json(farcasterConfig);
}
