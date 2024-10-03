import { Outlet } from '@tanstack/react-router';
import { Navbar } from './navbar';
import { ScrollArea } from '@radix-ui/react-scroll-area';

export const DefaultLayout = () => {
    return (
        <>
            <Navbar />
            <main className='p-4 mb-12 overflow-auto'>
                <Outlet />
            </main>
        </>
    )
}