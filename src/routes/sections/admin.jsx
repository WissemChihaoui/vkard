import { lazy, Suspense } from "react";
import { Outlet } from "react-router-dom";
import AdminLayout from "../../layouts/admin-layout";
import AuthLayout from "../../layouts/auth-layout";
import { AuthGuard } from "../../auth/guard";

const Dashboard = lazy(() => import("../../pages/admin/dashboard/index"));
const Cards = lazy(() => import("../../pages/admin/dashboard/cards"));
const Clients = lazy(() => import("../../pages/admin/dashboard/clients"));
const Orders = lazy(() => import("../../pages/admin/dashboard/orders"));
const ViewOrders = lazy(() => import("../../pages/admin/dashboard/view-orders"));
const ViewClient = lazy(() => import("../../pages/admin/dashboard/view-client"));
const Auth = lazy(() => import("../../pages/admin/auth/index"));

export const adminRoutes = [
  // Admin layout routes
  {
    path: "admin",
    element: (
      <AuthGuard requiredRole="admin">
      <AdminLayout>
        <Suspense fallback={<p>Loading...</p>}>
          <Outlet />
        </Suspense>
      </AdminLayout>
      </AuthGuard>
    ),
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "cards",
        element: <Cards />,
      },
      {
        path: "clients",
        children: [
          {
            index: true,
            element: <Clients />,
          },
          {
            path: ":id",
            element: <ViewClient />,
          },
        ],
      },
      {
        path: "orders",
        children: [
          {
            index: true,
            element: <Orders />,
          },
          {
            path: ":id",
            element: <ViewOrders />,
          },
        ],
      },
    ],
  },

  // Auth route (no AdminLayout, but still under /admin)
  {
    path: "admin/auth",
    element: (
      <AuthLayout>
        <Suspense fallback={<p>Loading...</p>}>
          <Auth />
        </Suspense>
      </AuthLayout>
    ),
  },
];
