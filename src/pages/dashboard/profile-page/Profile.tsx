/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { getProgram } from "../../../anchor/getProgram";
import { PublicKey } from "@solana/web3.js";
import { useAnchorWallet } from "@solana/wallet-adapter-react";

const Profile = () => {
  const wallet = useAnchorWallet();
  const [user, setUser] = useState<any>("");

  const program = getProgram(wallet as any);

  useEffect(() => {
    const getProfile = async () => {
      const [userAccount] = await PublicKey.findProgramAddress(
        [Buffer.from("user"), wallet!.publicKey!.toBuffer()],
        program.programId
      );
      try {
        const user = await program.account.user.fetch(userAccount);

        if (user) {
          setUser(user);
        }
      } catch (error: any) {
        console.log(error);
      }
    };

    getProfile();
  }, [program.account.user, program.programId, wallet]);

  return (
    <div className="flex   ">
      <div className="bg-white w-1/2 max-w-sm  p-10 flex flex-col  justify-center items-center gap-3 rounded-md">
        <div className="size-24 rounded-full border overflow-hidden  ">
          <img src={user.avatar} alt="" className=" " />
        </div>

        <p className="font-medium text-lg ">{user.name}</p>

        <button
          title="You can;t update profile at the moment"
          className="font-medium text-black/80 p-2 bg-gray-200 w-full rounded-md cursor-not-allowed"
          disabled
        >
          Update{" "}
        </button>
      </div>
    </div>
  );
};

export default Profile;
