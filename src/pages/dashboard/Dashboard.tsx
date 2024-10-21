import { MdPostAdd, MdArticle } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";
const Dashboard = () => {
  return (
    <div className="my-20 grid grid-cols-3 gap-12">
      <div className="flex flex-col gap-2">
        <button className="flex items-center text-start p-4 bg-white rounded-sm hover:bg-[#512DA8] duration-300 hover:text-white">
          <MdArticle className="mr-2 text-xl" />
          All Posts
        </button>

        <button className="flex items-center text-start p-4 bg-white rounded-sm hover:bg-[#512DA8] duration-300 hover:text-white">
          <MdPostAdd className="mr-2 text-xl" />
          Create Post
        </button>

        <button className="flex items-center text-start p-4 bg-white rounded-sm hover:bg-[#512DA8] duration-300 hover:text-white">
          <FaUserCircle className="mr-2 text-xl" />
          Profile
        </button>
      </div>
      <div className="col-span-2"></div>
    </div>
  );
};

export default Dashboard;
