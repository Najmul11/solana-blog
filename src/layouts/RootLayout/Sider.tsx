import { MdPostAdd, MdArticle } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const Sider = () => {
  return (
    <div className="flex flex-col gap-2">
      {btns.map(({ icon, label, path }, i) => (
        <NavLink
          to={path}
          key={i}
          className="flex items-center text-start p-4 bg-white rounded-md hover:bg-[#512DA8] duration-300 hover:text-white"
        >
          {icon}
          {label}
        </NavLink>
      ))}
    </div>
  );
};

export default Sider;

const btns = [
  {
    label: "All Posts",
    icon: <MdArticle className="mr-2 text-xl" />,
    path: "/dashboard/all-posts",
  },
  {
    label: "Create Post",
    icon: <MdPostAdd className="mr-2 text-xl" />,
    path: "/dashboard/create-posts",
  },
  {
    label: "Profile",
    icon: <FaUserCircle className="mr-2 text-xl" />,
    path: "/dashboard/profile",
  },
];
