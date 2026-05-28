import { createBrowserRouter, RouterProvider, Outlet } from "react-router";
import { LandingPage } from "./components/LandingPage";
import { PlayPage } from "./components/PlayPage";

/* MARKER-MAKE-KIT-INVOKED */

const router = createBrowserRouter([
  {
    path: "/",
    element: <Outlet />,
    children: [
      { index: true, element: <LandingPage /> },
      { path: "play/:mode", element: <PlayPage /> },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
