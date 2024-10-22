/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState, useCallback } from "react";
import { useWallet } from "../../hooks/useWallet";
import { getPosts } from "../../anchor/getPosts";
import { getProgram } from "../../anchor/getProgram";
import { useAnchorWallet } from "@solana/wallet-adapter-react";
import { PublicKey, SystemProgram } from "@solana/web3.js";

import { RiDeleteBack2Fill } from "react-icons/ri";
import { MdEditSquare } from "react-icons/md";

import Skeleton from "./Skeleton";
import Post from "../blogs/Post";

import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import toast from "react-hot-toast";

const Posts = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState<any>("");
  const [open, setOpen] = useState(false);

  const { wallet, publicKey } = useWallet();
  const anchorWallet = useAnchorWallet();
  const program = getProgram(anchorWallet as any);

  // Use useCallback to memoize the fetchPosts function
  const fetchPosts = useCallback(async () => {
    try {
      const posts = await getPosts(wallet);
      const userPosts = posts.filter(
        (post) => post.authority === publicKey?.toString()
      );
      setPosts(userPosts);
    } catch (error) {
      alert(JSON.stringify(error));
    } finally {
      setLoading(false);
    }
  }, [wallet, publicKey]);

  useEffect(() => {
    fetchPosts(); // Fetch posts on component mount
  }, [fetchPosts]);

  const onOpenModal = (
    id: any,
    title: string,
    content: string,
    image: string
  ) => {
    setFormData({ title, content, image, id });
    setOpen(true);
  };

  const onCloseModal = () => {
    setFormData("");
    setOpen(false);
  };

  const handleChange = (key: string, value: string) => {
    setFormData({ ...formData, [key]: value });
  };

  // ----------------edit post ------------------

  const handleEdit = async (e: any) => {
    e.preventDefault();
    setEditing(true);

    const [postAccount] = await PublicKey.findProgramAddress(
      [
        Buffer.from("post"),
        anchorWallet!.publicKey!.toBuffer(),
        Uint8Array.from([formData.id]),
      ],
      program.programId
    );

    try {
      await program.rpc.updatePost(
        formData.title,
        formData.content,
        formData.image,
        {
          accounts: {
            authority: anchorWallet!.publicKey,
            post: postAccount,
            systemProgram: SystemProgram.programId,
          },
        }
      );

      toast.success("Blog edited successfully");
      onCloseModal();
      await fetchPosts(); // Refetch posts after editing
    } catch (error) {
      toast.error("Something went wrong 🥸");
    } finally {
      setEditing(false);
    }
  };

  // ----------------delete post ------------------
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

      toast.success("Blog deleted successfully");
      await fetchPosts(); // Refetch posts after deletion
    } catch (error) {
      toast.error("Something went wrong 🥸");
    }
  };

  return (
    <div className="max-sm:max-w-sm mx-auto">
      {loading ? (
        <div className="grid max-sm:max-w-sm mx-auto md:grid-cols-2 gap-8">
          <Skeleton />
          <Skeleton />
          <Skeleton />
          <Skeleton />
        </div>
      ) : (
        <div className="grid max-md:max-w-96 mx-auto md:grid-cols-1 lg:grid-cols-2 gap-8">
          {posts.length > 0 &&
            posts.map(({ image, title, id, content, publicKey }: any) => (
              <Post
                image={image}
                title={title}
                dashboard={true}
                key={id}
                publicKey={publicKey}
              >
                <div className="flex items-center gap-3">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpenModal(id, title, content, image);
                    }}
                    className="font- mt-2 flex items-center"
                  >
                    <MdEditSquare className="h-5 w-5 text-[#512DA8] mr-1" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(id);
                    }}
                    className="font- mt-2 flex items-center text-red-500"
                  >
                    <RiDeleteBack2Fill className="h-5 w-5 text-red-500 mr-1" />
                  </button>
                </div>
              </Post>
            ))}
        </div>
      )}

      {/* Edit Post Modal */}
      {open && formData && (
        <Modal open={open} onClose={onCloseModal} center>
          <div className="w-[400px] rounded-md overflow-hidden">
            <form
              onSubmit={handleEdit}
              className="bg-white rounded-md p-5 flex flex-col gap-4"
            >
              <div className="flex flex-col gap-1">
                <label>Title</label>
                <input
                  value={formData.title}
                  onChange={(e) => handleChange("title", e.target.value)}
                  type="text"
                  className="p-2 w-full border rounded-md bg-gray-100/30"
                  placeholder="Blog title"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label>Content</label>
                <textarea
                  value={formData.content}
                  onChange={(e) => handleChange("content", e.target.value)}
                  rows={4}
                  className="p-2 w-full border rounded-md bg-gray-100/30"
                  placeholder="Blog content"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label>Thumbnail</label>
                <input
                  value={formData.image}
                  onChange={(e) => handleChange("image", e.target.value)}
                  type="text"
                  className="p-2 w-full border rounded-md bg-gray-100/30"
                  placeholder="Provide image URL"
                />
              </div>

              <button
                disabled={editing}
                type="submit"
                className={`mt-3 text-white font-semibold px-6 py-3 rounded-md shadow-lg bg-[#512DA8] ${
                  editing
                    ? "cursor-not-allowed bg-gray-200 text-black"
                    : "hover:bg-black"
                }`}
              >
                Submit
              </button>
            </form>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Posts;
