import { useRoutes } from "react-router-dom";
import { mainRoutes } from "./main";
import { lazy, Suspense } from "react";
import MainLayout from "../../layouts/main-layout";
// import Loader from "../../components/loader/loader";


const HomePage = lazy(() => import('../../pages/main/home/index'))

export function Router() {
    return useRoutes([
        {
            path: '/',
            /**
             * Skip home page
             * element: <Navigate to={CONFIG.auth.redirectPath} replace />,
             */
            element: (
              <Suspense fallback={<p>Loading</p>}>
                <MainLayout>
                  <HomePage />
                </MainLayout>
              </Suspense>
            ),
          },
            ...mainRoutes
    ])
}