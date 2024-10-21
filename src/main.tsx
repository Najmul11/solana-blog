import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { routes } from "./router/Routes.tsx";
import ProvideWallet from "./providers/ProvideWallet.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ProvideWallet>
      <RouterProvider router={routes} />
    </ProvideWallet>
  </StrictMode>
);
