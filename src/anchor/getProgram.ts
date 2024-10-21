/* eslint-disable @typescript-eslint/no-explicit-any */
import { Connection, PublicKey } from "@solana/web3.js";
import { AnchorProvider, Program } from "@project-serum/anchor";
import idl from "./idl.json";
import { Wallet } from "@project-serum/anchor/dist/cjs/provider";

const PROGRAM_ID = new PublicKey(
  "E2ungBToM7t7pULRMJrxog4iyAN8hEGVn9qQQBAAMHfd"
);
const NETWORK = "https://api.devnet.solana.com";
const connection = new Connection(NETWORK, "processed");

export const getProgram = (wallet: Wallet) => {
  const provider = new AnchorProvider(connection, wallet, {
    preflightCommitment: "processed",
  });
  return new Program(idl as any, PROGRAM_ID, provider);
};
