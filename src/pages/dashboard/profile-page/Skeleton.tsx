const Skeleton = () => {
  return (
    <div className="bg-white  w-1/2 max-w-sm  p-10 flex flex-col  justify-center items-center gap-3 rounded-md">
      <div className="size-24 bg-gray-200 rounded-full border overflow-hidden  "></div>

      <p className="h-4 w-36 bg-gray-200"></p>

      <button
        title="You can;t update profile at the moment"
        className="font-medium text-black/80 h-10 mt-3 bg-gray-200 w-full rounded-md cursor-not-allowed"
        disabled
      ></button>
    </div>
  );
};

export default Skeleton;
