import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { Outlet, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { Helmet } from 'react-helmet-async';
import { useUserQuery } from '../redux/hooks/useUserQuery';

function Layout() {
  const location = useLocation();
  const themeMode = useSelector(state => state.model.themeMode);
  const user = JSON.parse(sessionStorage.getItem("user"))
  // const[me, setMe] = useState(null);
  // const { myInfo } = useUserQuery();
  // useEffect(() => {
  //   setMe(myInfo?.data)
  // }, [myInfo?.data])
  return (
    <>
       {!["/signin", "/signup", "/forgot"].includes(location.pathname) && <Header />}
        <Helmet>
            <title>
                {
                    user ? user?.userName + ' | Thread' : 'Thread'
                }
            </title>
        </Helmet>
       <div className={` ${themeMode} dark:bg-gray-900`}>
        <div className={`${["/signin", "/signup", "/forgot"].includes(location.pathname) ? "w-full" : "max-w-5xl mx-auto"} `}>
            <Outlet />
        </div>
       </div>
    </>
  )
}

export default Layout