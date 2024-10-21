import { Outlet } from "react-router-dom";
import Nav from "./Nav";
import Sider from "./Sider";

const RootLayout = ({ isDashboard = false }: { isDashboard?: boolean }) => {
  return (
    <div>
      <Nav />
      {!isDashboard ? (
        <Outlet />
      ) : (
        <div className="my-20 grid grid-cols-3 gap-12 ">
          <Sider />

          <div className="col-span-2">
            <Outlet />
          </div>
        </div>
      )}
    </div>
  );
};

export default RootLayout;
