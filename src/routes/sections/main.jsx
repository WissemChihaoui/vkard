import { lazy, Suspense } from "react";
import { Outlet } from "react-router-dom";
import MainLayout from "../../layouts/main-layout";
import AccountLayout from "../../layouts/account-layout";
import { AuthGuard, GuestGuard } from "../../auth/guard";
import Loader from "../../components/loader/loader";
// import Loader from "../../components/loader/loader";

const ViewProduct = lazy(() => import("../../pages/main/products/view"));
const ListProduct = lazy(() => import("../../pages/main/products/list"));
const Panier = lazy(() => import("../../pages/main/panier/index"));
const Checkout = lazy(() => import("../../pages/main/panier/checkout"));
const Contact = lazy(() => import("../../pages/main/contact/index"));
const OrderSuccess = lazy(() => import("../../pages/main/panier/order-success"));
const Login = lazy(() => import("../../pages/auth/login"));
const Profile = lazy(() => import("../../pages/profile/index"));
const ProfileOrders = lazy(() => import("../../pages/profile/orders"));
const ProfileViewOrder = lazy(() => import("../../pages/profile/viewOrder"));
const ProfileDetails = lazy(() => import("../../pages/profile/details"));
const ProfileCards = lazy(() => import("../../pages/profile/cards"));

const layoutContent = (
  <AccountLayout>
    <Suspense fallback={<Loader />}>
    <Outlet />
    </Suspense>
  </AccountLayout>
)

export const mainRoutes = [
  {
    element: (
      <MainLayout>
        <Suspense fallback={<p><Loader /></p>}>
          <Outlet />
        </Suspense>
      </MainLayout>
    ),
    children: [
      { path: "product/:id", element: <ViewProduct /> },
      { path: "product", element: <ListProduct /> },
      { path: "panier", element: <Panier /> },
      { path: "checkout", element: <Checkout /> },
      { path: "contact", element: <Contact /> },
      { path: "order-success", element: <OrderSuccess /> },
      { 
        path: "auth", 
        children: [
          { index: true, element: <GuestGuard><Login /></GuestGuard>}
        ]
      },
      {
        path: "my-account",
        element: <AuthGuard requiredRole="client">{layoutContent}</AuthGuard>,
        children: [
          { index: true, element: <Profile />},
          { path: 'orders', element: <ProfileOrders />},
          { path: 'orders/:id', element: <ProfileViewOrder />},
          { path: 'edit-account', element: <ProfileDetails />},
          { path: 'cards', element: <ProfileCards />},
        ]
      },
    ],
  },
];
