import { lazy, Suspense } from "react";
import { Outlet } from "react-router-dom";
import MainLayout from "../../layouts/main-layout";
// import Loader from "../../components/loader/loader";

const ViewProduct = lazy(() => import("../../pages/main/products/view"));
const Panier = lazy(() => import("../../pages/main/panier/index"));
const Checkout = lazy(() => import("../../pages/main/panier/checkout"));

export const mainRoutes = [
  {
    element: (
      <MainLayout>
        <Suspense fallback={<p>Loading</p>}>
          <Outlet />
        </Suspense>
      </MainLayout>
    ),
    children: [
      { path: "product", element: <ViewProduct /> },
      { path: "panier", element: <Panier /> },
      { path: "checkout", element: <Checkout /> },
    ],
  },
];
