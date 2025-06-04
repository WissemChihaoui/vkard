import { useRoutes } from "react-router-dom";
import { mainRoutes } from "./main";
import { lazy, Suspense } from "react";
import MainLayout from "../../layouts/main-layout";
import ProfileLayout from "../../layouts/profile-layout";
import { adminRoutes } from "./admin";
import Loader from "../../components/loader/loader";
// import Loader from "../../components/loader/loader";


const HomePage = lazy(() => import('../../pages/main/home/index'))
const UserPage = lazy(() => import('../../pages/user/index'))

export function Router() {
    return useRoutes([
        {
            path: '/',
            /**
             * Skip home page
             * element: <Navigate to={CONFIG.auth.redirectPath} replace />,
             */
            element: (
              <Suspense fallback={<p><Loader /></p>}>
                <MainLayout>
                  <HomePage />
                </MainLayout>
              </Suspense>
            ),
          },
        {
            path: '/user/:id',
            /**
             * Skip home page
             * element: <Navigate to={CONFIG.auth.redirectPath} replace />,
             */
            element: (
              <Suspense fallback={<p>Loading</p>}>
                <ProfileLayout>
                  <UserPage />
                </ProfileLayout>
              </Suspense>
            ),
          },
            ...mainRoutes,
            ...adminRoutes
    ])
}