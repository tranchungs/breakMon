import { useFrame } from "@/components/farcaster-provider";
import { farcasterFrame } from "@farcaster/frame-wagmi-connector";
import { parseEther } from "viem";
import { monadTestnet } from "viem/chains";
import { User } from "@/components/Home/User";
import { PlayGame } from "@/components/Home/Playgame";
import { useRouter } from "next/navigation";
import {
  useAccount,
  useConnect,
  useDisconnect,
  useSendTransaction,
  useSwitchChain,
} from "wagmi";
import { Menu } from "./Menu";

export function WalletActions() {
  const router = useRouter();
  const { isEthProviderAvailable } = useFrame();
  const { isConnected, address, chainId } = useAccount();
  const { disconnect } = useDisconnect();
  const { data: hash, sendTransaction } = useSendTransaction();
  const { switchChain } = useSwitchChain();
  const { connect } = useConnect();

  if (isConnected) {
    return <Menu></Menu>;
  }

  if (isEthProviderAvailable) {
    return (
      <div className="space-y-4 border border-[#333] rounded-md p-4">
        <div className="flex flex-row space-x-4 justify-start items-start">
          <button
            type="button"
            className="bg-purple-600 text-white w-full p-2 text-xs"
            style={{
              fontFamily: "'Press Start 2P', monospace",
              textShadow: "1px 1px #000",
              border: "2px solid #2a1e32",
            }}
            onClick={() => connect({ connector: farcasterFrame() })}
          >
            CONNECT WALLET
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4 border border-[#333] rounded-md p-4">
      <h2 className="text-xl font-bold text-left">sdk.wallet.ethProvider</h2>
      <div className="flex flex-row space-x-4 justify-start items-start">
        <p className="text-sm text-left">Wallet connection only via Warpcast</p>
      </div>
    </div>
  );
}
