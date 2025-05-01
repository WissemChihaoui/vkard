import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import MainLayout from '../../layouts/main-layout';


export const mainRoutes = [
    {
        element: (
            <Suspense fallback={<p>Loading...</p>}>
                <Outlet />
            </Suspense>
        ),
        path:'/',
        children: [
            {
                element: (
                    <MainLayout>
                        <Outlet />
                    </MainLayout>
                ),
            }
        ]
    }
]