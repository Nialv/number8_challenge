import LoginPage from "@views/LoginPage";
import HomePage from "@views/HomePage";

export const routes = [
  {
    path: "/",
    element: <LoginPage />,
    private: false,
  },
  {
    path: "/home",
    element: <HomePage />,
    private: true,
  },
];
