import { useWallet as useSolanaWallet } from "@solana/wallet-adapter-react";

export const useWallet = () => {
  const { publicKey, connect, disconnect, connected, wallet } =
    useSolanaWallet();
  return { publicKey, connect, disconnect, connected, wallet };
};
