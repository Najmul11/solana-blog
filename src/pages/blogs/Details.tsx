/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useWallet } from "../../hooks/useWallet";
import { getSinglePost } from "../../anchor/getPosts";
import { TiArrowBack } from "react-icons/ti";

const Details = () => {
  const [post, setPost] = useState<any>("");
  const [loading, setLoading] = useState<boolean>(true);
  const { wallet } = useWallet();
  const { key } = useParams();

  useEffect(() => {
    try {
      const getPost = async () => {
        const post = await getSinglePost(wallet as any, key);
        setPost(post);
      };

      getPost();
    } catch (error) {
      alert(JSON.stringify(error));
    } finally {
      //
      setLoading(false);
    }
  }, [key, wallet]);

  return (
    <div className="my-20 flex">
      <div className="max-w-2xl bg-white p-5 rounded-md flex flex-col gap-3">
        <img
          src={post.image}
          alt=""
          className="rounded-md w-full aspect-[16/9]"
        />
        <p className="font-semibold text-lg m-0   line-clamp-2">
          {post?.title}
        </p>

        <p>{post.content} </p>
      </div>

      <div className="fixed right-0 bottom-20 w-full">
        <div className="max-w-screen-xl mx-auto  flex justify-end">
          <button
            onClick={() => window.history.back()}
            className="p-2  bg-[#512DA8] text-white text-2xl hover:bg-black duration-200 rounded-full"
          >
            <TiArrowBack />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Details;
