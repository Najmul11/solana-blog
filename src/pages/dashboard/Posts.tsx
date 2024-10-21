/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useWallet } from "../../hooks/useWallet";
import { getPosts } from "../../anchor/getPosts";
import Post from "../blogs/Post";

const Posts = () => {
  const { wallet, publicKey } = useWallet();
  const [posts, setPosts] = useState<any>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const allPosts = async () => {
        const posts = await getPosts(wallet);

        const userPosts = posts.filter(
          (post) => post.authority,
          toString() === publicKey?.toString()
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
    <div className="grid max-sm:max-w-sm mx-auto md:grid-cols-2  gap-8 ">
      {posts.length > 0 &&
        posts.map(({ image, title }: any) => (
          <Post image={image} title={title} />
        ))}
    </div>
  );
};

export default Posts;
