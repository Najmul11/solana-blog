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
        <div className="my-20 grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-12 ">
          <Sider />

          <div className="lg:col-span-2">
            <Outlet />
          </div>
        </div>
      )}
    </div>
  );
};

export default RootLayout;
