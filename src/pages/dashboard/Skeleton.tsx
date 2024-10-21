const Skeleton = () => {
  return (
    <div className="px-4 pt-4 pb-3 border bg-white border-gray-400/30 rounded-md">
      <div className="h-32 w-full rounded-md bg-gray-200"></div>
      <p className="h-4 w-4/5 m-0 rounded-md bg-gray-200  mt-2 "></p>
      <button className="h-6 w-20 rounded-md bg-gray-200 mt-4"></button>
    </div>
  );
};

export default Skeleton;
