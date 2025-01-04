import { createBrowserRouter, RouterProvider } from "react-router-dom";

import RootLayout from "./layout/RootLayout";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import UserDetailPage from "./pages/UserDetailPage";
import ProtectedRoute from "./pages/ProtectedRoute";
import NotFoundPage from "./pages/NotFoundPage";

import "./styles/index.scss";

export default function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      errorElement: <NotFoundPage />,
      children: [
        { index: true, element: <HomePage /> },
        {
          path: "login",
          element: <LoginPage />,
        },
        {
          path: "user-detail",
          element: (
            <ProtectedRoute>
              <UserDetailPage />
            </ProtectedRoute>
          ),
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}
