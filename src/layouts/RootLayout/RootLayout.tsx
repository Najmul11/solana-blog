import { Outlet } from "react-router-dom";
import Nav from "./Nav";

const RootLayout = () => {
  return (
    <div>
      <Nav />
      <Outlet />
    </div>
  );
};

export default RootLayout;
