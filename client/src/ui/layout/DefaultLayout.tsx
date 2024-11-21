import { Outlet } from '@tanstack/react-router';
import { Navbar } from './navbar';

export const DefaultLayout = () => {
    const isDashboard = window.location.pathname.includes('admin');
    return (
        <>
            {!isDashboard && <Navbar />}
            <main className='mb-12 overflow-auto mt-14'>
                <Outlet />
            </main>
        </>
    );
};
