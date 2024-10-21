/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useWallet } from "../../hooks/useWallet";
import { getPosts } from "../../anchor/getPosts";
import Post from "./Post";
import Skeleton from "../dashboard/Skeleton";

const AllBlogs = () => {
  const { wallet } = useWallet();
  const [posts, setPosts] = useState<any>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const allPosts = async () => {
        const posts = await getPosts(wallet);

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
    <div className=" max-sm:max-w-sm mx-auto  my-20 ">
      {loading ? (
        <div className="grid  sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-5">
          <Skeleton />
          <Skeleton />
          <Skeleton />
        </div>
      ) : (
        <div className="grid  sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-5">
          {posts.length > 0 &&
            posts.map(({ image, title, publicKey }: any) => (
              <Post image={image} title={title} publicKey={publicKey} />
            ))}
        </div>
      )}
    </div>
  );
};

export default AllBlogs;
