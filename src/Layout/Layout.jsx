import React, { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'

import { ToastContainer } from "react-toastify";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import MobileNav from '../components/MobileNav';

const Layout = () => {
    const { hash } = useLocation();

    useEffect(() => {
        if (!hash) {
            window.scrollTo(0, 0);
            return;
        }
        const id = hash.replace('#', '');
        const scrollToSection = () => {
            const target = document.getElementById(id);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        };
        setTimeout(scrollToSection, 0);
    }, [hash]);

    return (
        <div className="max-w-11/12 mx-auto">
            <Navbar />
            <main className="pt-6 pb-24 md:pb-0">
                <Outlet />
            </main>
            <Footer />
            <MobileNav />
            <ToastContainer position="top-center" />
        </div>
    );
};

export default Layout;
