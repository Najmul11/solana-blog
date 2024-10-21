/* eslint-disable @typescript-eslint/no-explicit-any */
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { MdDashboard } from "react-icons/md";

import "@solana/wallet-adapter-react-ui/styles.css";
import { PublicKey, SystemProgram } from "@solana/web3.js";
import { getProgram } from "../../anchor/getProgram";
import { useEffect } from "react";
import { useAnchorWallet } from "@solana/wallet-adapter-react";
import { Link } from "react-router-dom";

const Nav = () => {
  const wallet = useAnchorWallet();

  const program = getProgram(wallet as any);

  useEffect(() => {
    const createUserAccount = async () => {
      const [userAccount] = await PublicKey.findProgramAddress(
        [Buffer.from("user"), wallet!.publicKey!.toBuffer()],
        program.programId
      );

      try {
        await program.account.user.fetch(userAccount);
      } catch (error: any) {
        if (error.message.includes("Account does not exist or has no data")) {
          await program.rpc.createUser(
            "Block Expert",
            "https://gravatar.com/avatar/4257eb85a7d61356aed32fff8fa551d7?s=400&d=robohash&r=x",
            {
              accounts: {
                authority: wallet!.publicKey,
                user: userAccount,
                systemProgram: SystemProgram.programId,
              },
            }
          );
        }
      }
    };

    createUserAccount();
  }, [program.account.user, program.programId, program.rpc, wallet]);

  return (
    <div className=" py-2 backdrop-blur-sm bg-[#e0f7fa]/10 sticky top-3  flex justify-between items-center  rounded-md ">
      <div>
        <p className="font-semibold tracking-widest text-3xl ">
          ARTICLE <span className="text-red-600">.</span>
        </p>
      </div>

      <div className="flex items-center gap-5">
        {wallet && (
          <Link
            to={"/dashboard"}
            className="flex items-center text-black font-semibold px-6 !py-3 rounded shadow-lg bg-white duration-300"
          >
            <MdDashboard className="mr-2 text-xl" />
            Dashboard
          </Link>
        )}
        <WalletMultiButton />
      </div>
    </div>
  );
};

export default Nav;
