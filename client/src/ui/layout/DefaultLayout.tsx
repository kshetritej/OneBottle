import { Outlet } from '@tanstack/react-router';
import { Navbar } from './navbar';

export const DefaultLayout = () => {
    const isDashboard = window.location.pathname.includes('admin');
    return (
        <>
            {!isDashboard && <Navbar />}

            <main className='p-4 mb-12 overflow-auto'>
                <Outlet />
            </main>
        </>
    );
};
