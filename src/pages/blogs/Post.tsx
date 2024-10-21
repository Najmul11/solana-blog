type TProps = {
  image: string;
  title: string;
};
const Post = ({ image, title }: TProps) => {
  return (
    <div className="px-4 pt-4 pb-3 border border-gray-400/30 rounded-md">
      <img src={image} alt="post.title" className="rounded-lg" />
      <p className="font-semibold text-xl m-0  mt-2 line-clamp-1">{title}</p>
      <button className="font- mt-2">Read more</button>
    </div>
  );
};

export default Post;
