/* eslint-disable @typescript-eslint/no-explicit-any */

import { getProgram } from "./getProgram";

export const getPosts = async (wallet: any) => {
  const program = getProgram(wallet);

  // Fetch all 'Post' accounts from the blockchain
  const posts = await program.account.post.all();

  return posts.map(
    ({ publicKey, account }: { publicKey: any; account: any }) => ({
      id: account.id,
      title: account.title,
      content: account.content,
      image: account.image,
      authority: account.authority.toString(),
      creatorPubkey: account.creatorPubkey.toString(),
      publicKey: publicKey.toString(),
    })
  );
};
