import {Outlet} from '@tanstack/react-router';
import { Navbar } from './navbar';

export const LandingPageLayout = () => {
    return(
        <>
        <Navbar/>
        <Outlet/>
        </>
    )
}