const Skeleton = () => {
  return (
    <div className="bg-gray-100 animate-pulse w-1/2 max-w-sm  p-10 flex flex-col  justify-center items-center gap-3 rounded-md">
      <div className="size-24 rounded-full border overflow-hidden  "></div>

      <p className="h-4 w-36"></p>

      <button
        title="You can;t update profile at the moment"
        className="font-medium text-black/80 p-2 bg-gray-200 w-full rounded-md cursor-not-allowed"
        disabled
      >
        Update
      </button>
    </div>
  );
};

export default Skeleton;
