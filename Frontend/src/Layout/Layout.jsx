import React from 'react'
import Header from '../components/Header'
import { Outlet, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux';

function Layout() {
  const location = useLocation();
  const themeMode = useSelector(state => state.model.themeMode);

  return (
    <>
       {!["/signin", "/signup", "/forgot"].includes(location.pathname) && <Header />}
       <div className={` ${themeMode} dark:bg-gray-900`}>
        <div className={`${["/signin", "/signup", "/forgot"].includes(location.pathname) ? "w-full" : "max-w-5xl mx-auto"} `}>
            <Outlet />
        </div>
       </div>
    </>
  )
}

export default Layout