import React from 'react'
import { Outlet } from 'react-router'

import { ToastContainer } from "react-toastify";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Layout = () => {
  return (
    <div className='max-w-11/12 mx-auto'>
        <Navbar></Navbar>
        <Outlet></Outlet>
        <Footer></Footer>
        <ToastContainer position="top-center" />
    </div>
  )
}

export default Layout