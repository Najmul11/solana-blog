/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useWallet } from "../../hooks/useWallet";
import { getPosts } from "../../anchor/getPosts";

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
        posts.map((post: any) => (
          <div
            key={post?.id}
            className="px-4 pt-4 pb-3 border border-gray-400/30 rounded-md"
          >
            <img src={post.image} alt="post.title" className="rounded-lg" />
            <p className="font-semibold text-xl m-0  mt-2 line-clamp-1">
              {post.title}
            </p>
            <button className="font- mt-2">Read more</button>
          </div>
        ))}
    </div>
  );
};

export default AllBlogs;
