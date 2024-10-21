/* eslint-disable @typescript-eslint/no-explicit-any */

import { getProgram } from "./getProgram";

export const getUsers = async (wallet: any) => {
  const program = getProgram(wallet);

  // Fetch all 'Post' accounts from the blockchain
  const users = await program.account.user.all();

  return users.map(
    ({ publicKey, account }: { publicKey: any; account: any }) => ({
      name: account.name,
      avatar: account.avatar,
      lastPostId: account.lastPostId,
      totalPosts: account.totalPosts,
      authority: account.authority.toString(),
      publicKey: publicKey.toString(),
    })
  );
};
