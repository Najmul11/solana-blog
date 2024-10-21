/* eslint-disable @typescript-eslint/no-explicit-any */
import { useAnchorWallet } from "@solana/wallet-adapter-react";
import { PublicKey, SystemProgram } from "@solana/web3.js";
import { useState } from "react";
import { getProgram } from "../../../anchor/getProgram";

const CreatePost = () => {
  const [formData, setFormData] = useState<any>("");

  const wallet = useAnchorWallet();

  const program = getProgram(wallet as any);

  const handleChange = (key: string, value: string) => {
    setFormData({ ...formData, [key]: value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const [userAccount] = await PublicKey.findProgramAddress(
      [Buffer.from("user"), wallet!.publicKey!.toBuffer()],
      program.programId
    );

    let lastPostId = 0;

    try {
      const user: any = await program.account.user.fetch(userAccount);
      if (user && user!.lastPostId) {
        lastPostId = user.lastPostId;
      }
    } catch (error: any) {
      if (error.message.includes("Account does not exist or has no data")) {
        alert("Unauthorised.");
      }
    }

    // check  if user exists or not

    const [postAccount] = await PublicKey.findProgramAddress(
      [
        Buffer.from("post"),
        wallet!.publicKey!.toBuffer(),
        Uint8Array.from([lastPostId]),
      ],
      program.programId
    );

    try {
      // here is the problem
      const post = await program.rpc.createPost(
        `${formData.title}`,
        `${formData.content}`,
        `${formData.image}`,
        {
          accounts: {
            authority: wallet!.publicKey,
            user: userAccount,
            post: postAccount,
            systemProgram: SystemProgram.programId,
          },
        }
      );

      if (post) {
        // show success message
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="max-w-lg bg-white rounded-md p-5 flex flex-col gap-4"
      >
        {/* Title */}
        <div className="flex flex-col gap-1">
          <label>Title</label>
          <input
            onChange={(e) => handleChange("title", e.target.value)}
            type="text"
            className="p-2 w-full border rounded-md placeholder:text-sm bg-gray-100/30"
            placeholder="Blog title"
          />
        </div>
        {/* content */}
        <div className="flex flex-col gap-1">
          <label>Content</label>
          <textarea
            onChange={(e) => handleChange("content", e.target.value)}
            rows={4}
            placeholder="Blog content"
            className="p-2 w-full border rounded-md placeholder:text-sm bg-gray-100/30"
          />
        </div>

        {/* image */}
        <div className="flex flex-col gap-1">
          <label>Thumbnail</label>
          <input
            onChange={(e) => handleChange("image", e.target.value)}
            type="text"
            className="p-2 w-full border rounded-md placeholder:text-sm bg-gray-100/30"
            placeholder="Pease provide  url"
          />
        </div>

        <button
          type="submit"
          className=" mt-3  text-white font-semibold px-6 !py-3 rounded-md shadow-lg hover:bg-black bg-[#512DA8] duration-300 "
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreatePost;
