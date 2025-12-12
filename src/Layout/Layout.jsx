import React from 'react'
import { Outlet } from 'react-router'

import { ToastContainer } from "react-toastify";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import MobileNav from '../components/MobileNav';

const Layout = () => {
  return (
    <div className='max-w-11/12 mx-auto pb-24 md:pb-0'>
        <Navbar></Navbar>
        <Outlet></Outlet>
        <MobileNav></MobileNav>
        <Footer></Footer>
        <ToastContainer position="top-center" />
    </div>
  )
}

export default Layout
