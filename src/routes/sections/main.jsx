import { lazy, Suspense } from "react";
import { Outlet } from "react-router-dom";
import MainLayout from "../../layouts/main-layout";
import AccountLayout from "../../layouts/account-layout";
// import Loader from "../../components/loader/loader";

const ViewProduct = lazy(() => import("../../pages/main/products/view"));
const Panier = lazy(() => import("../../pages/main/panier/index"));
const Checkout = lazy(() => import("../../pages/main/panier/checkout"));
const Login = lazy(() => import("../../pages/auth/login"));
const Profile = lazy(() => import("../../pages/profile/index"));
const ProfileOrders = lazy(() => import("../../pages/profile/orders"));
const ProfileDetails = lazy(() => import("../../pages/profile/details"));
const ProfileCards = lazy(() => import("../../pages/profile/cards"));

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
      { 
        path: "auth", 
        children: [
          { index: true, element: <Login />}
        ]
      },
      {
        path: "my-account",
        element: <AccountLayout><Outlet /></AccountLayout>,
        children: [
          { index: true, element: <Profile />},
          { path: 'orders', element: <ProfileOrders />},
          { path: 'edit-account', element: <ProfileDetails />},
          { path: 'cards', element: <ProfileCards />},
        ]
      }
    ],
  },
];
