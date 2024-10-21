/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useWallet } from "../../hooks/useWallet";
import { getPosts } from "../../anchor/getPosts";
import Post from "./Post";

const AllBlogs = () => {
  const { wallet } = useWallet();
  const [posts, setPosts] = useState<any>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const allPosts = async () => {
        const posts = await getPosts(wallet);
        console.log(posts);

        setPosts(posts);
      };

      allPosts();
    } catch (error) {
      alert(JSON.stringify(error));
    } finally {
      setLoading(false);
    }
  }, [wallet]);

  return (
    <div className="grid max-sm:max-w-sm mx-auto sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-5 my-20 ">
      {posts.length > 0 &&
        posts.map(({ image, title }: any) => (
          <Post image={image} title={title} />
        ))}
    </div>
  );
};

export default AllBlogs;
