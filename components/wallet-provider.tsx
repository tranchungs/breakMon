import { farcasterFrame } from "@farcaster/frame-wagmi-connector";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { http, WagmiProvider, createConfig } from "wagmi";
import { monadTestnet, base, mainnet } from "wagmi/chains";

export const config = createConfig({
  chains: [base, mainnet, monadTestnet],
  transports: {
    [base.id]: http(),
    [mainnet.id]: http(),
    [monadTestnet.id]: http(),
  },
  connectors: [farcasterFrame()],
});

const queryClient = new QueryClient();

export function WalletProvider({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
}
