import { lazy, Suspense } from "react";
import { Outlet } from "react-router-dom";
import MainLayout from "../../layouts/main-layout";

const ViewProduct = lazy(() => import("../../pages/main/products/view"));

export const mainRoutes = [
  {
    element: (
      <MainLayout>
        <Suspense fallback={<p>Loading...</p>}>
          <Outlet />
        </Suspense>
      </MainLayout>
    ),
    children: [{ path: "product", element: <ViewProduct /> }],
  },
];
