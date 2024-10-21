import { ReactNode } from "react";

type TProps = {
  image: string;
  title: string;
  dashboard?: boolean;
  children?: ReactNode;
};
const Post = ({ image, title, dashboard = false, children }: TProps) => {
  return (
    <div
      className={`px-4 pt-4 pb-3 border border-gray-400/30 rounded-md bg-white !grid-rows-subgrid !row-span-3 grid gap-3`}
    >
      <img
        src={image}
        alt="post.title"
        draggable={false}
        className="rounded-lg w-full aspect-[16/9]"
      />
      <p className="font-semibold text-lg m-0   line-clamp-2">{title}</p>
      <div className="flex justify-between items-center">
        <button className="">Read more</button>

        {/* if dashboard  */}
        {dashboard && <>{children}</>}
      </div>
    </div>
  );
};

export default Post;
