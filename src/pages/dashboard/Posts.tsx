/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useWallet } from "../../hooks/useWallet";
import { getPosts } from "../../anchor/getPosts";
import Post from "../blogs/Post";
import Skeleton from "./Skeleton";
import { getProgram } from "../../anchor/getProgram";
import { useAnchorWallet } from "@solana/wallet-adapter-react";
import { PublicKey, SystemProgram } from "@solana/web3.js";

const Posts = () => {
  const [posts, setPosts] = useState<any>([]);
  const [loading, setLoading] = useState(true);

  const { wallet, publicKey } = useWallet();
  const anchorWallet = useAnchorWallet();

  const program = getProgram(anchorWallet as any);

  const handleDelete = async (postId: number) => {
    const [userAccount] = await PublicKey.findProgramAddress(
      [Buffer.from("user"), anchorWallet!.publicKey!.toBuffer()],
      program.programId
    );

    const [postAccount] = await PublicKey.findProgramAddress(
      [
        Buffer.from("post"),
        anchorWallet!.publicKey!.toBuffer(),
        Uint8Array.from([postId]),
      ],
      program.programId
    );

    try {
      await program.rpc.deletePost({
        accounts: {
          authority: anchorWallet!.publicKey,
          user: userAccount,
          post: postAccount,
          systemProgram: SystemProgram.programId,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    try {
      const allPosts = async () => {
        const posts = await getPosts(wallet);

        const userPosts = posts.filter(
          (post) => post.authority === publicKey?.toString()
        );

        setPosts(userPosts);
      };

      allPosts();
    } catch (error) {
      alert(JSON.stringify(error));
    } finally {
      setLoading(false);
    }
  }, [publicKey, wallet]);

  return (
    <div className=" max-sm:max-w-sm mx-auto ">
      {loading ? (
        <div className="grid max-sm:max-w-sm mx-auto md:grid-cols-2">
          <Skeleton />
          <Skeleton />
          <Skeleton />
          <Skeleton />
        </div>
      ) : (
        <div className="grid max-sm:max-w-sm mx-auto md:grid-cols-2  gap-8">
          {posts.length > 0 &&
            posts.map(({ image, title, id }: any) => (
              <Post image={image} title={title} dashboard={true} key={id}>
                <div className="flex items-center gap-3">
                  <button className="font- mt-2">Edit</button>{" "}
                  <button
                    onClick={() => handleDelete(id)}
                    className="font- mt-2"
                  >
                    Delete
                  </button>
                </div>
              </Post>
            ))}
        </div>
      )}
    </div>
  );
};

export default Posts;
