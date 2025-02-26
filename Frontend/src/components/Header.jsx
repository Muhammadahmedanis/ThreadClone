import React, { useEffect, useState } from "react";
import { RiLogoutCircleRLine, RiBloggerLine } from "react-icons/ri";
import { Link, NavLink } from "react-router-dom";
import { MdOutlineDashboard, MdPublishedWithChanges } from "react-icons/md";
import { FaBars, FaRegUser, FaRegEdit } from "react-icons/fa";
import { RxHamburgerMenu } from "react-icons/rx";
import logo from "/dark-logo.svg"
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../redux/slices/authSlice";
import Navbar from "./Navbar";

function Header() {
  const dispatch = useDispatch();
  const [userInfo, setUserInfo] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useSelector((state) => state.auth);

  const handleLogout = async () => {
    await dispatch(logoutUser());
  };
  

  return (
    <>
      <div className="w-full sticky top-1 z-10 drop-shadow-md pt-1">
        <div className="flex flex-wrap justify-between place-items-center px-2 pl-5 pr-4 dark:bg-gray-900 dark:text-white">
          <div className="flex gap-2 items-center">
            <Link to="/">
             <img src={logo} alt="logo" className="h-[40px] w-[45px]" />
            </Link>
            <Navbar />
          </div>
          <div className="relative">
            <RxHamburgerMenu size={28} className="text-black cursor-pointer hover:text-gray-700 transition" onClick={() => setIsOpen(!isOpen)} />

            {isOpen && (
              <div
                id="dropdown"
                className="absolute -right-1 mt-2 z-20 w-36 bg-white shadow-lg rounded-lg border border-gray-200 transition-all"
              >
                <ul className="py-2">
                  {["Copy Link", "Share", "Report"].map((item, index) => (
                    <li
                      key={index}
                      className="px-4 py-3 cursor-pointer text-gray-700 font-semibold hover:bg-gray-100 rounded-lg transition"
                      onClick={() => setIsOpen(false)}
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          {/* {
            user?.userName ? 
            (<button onClick={handleLogout} className="cursor-pointer inline-flex gap-1 items-center rounded-lg bg-[#343434] hover:bg-[#343434df] px-5 py-2.5 text-sm font-medium text-white shadow-sm transition-colors duration-150">
              Log Out <RiLogoutCircleRLine className="font-bold w-6" size={19} />
            </button>) : 
            (<Link to="/signin">
              <button className="cursor-pointer inline-flex gap-1 items-center rounded-lg bg-[#343434] hover:bg-[#343434df] px-5 py-2.5 text-sm font-medium text-white shadow-sm transition-colors duration-150">
                Sign In <SiSimplelogin className="font-bold" size={25} />
              </button>
            </Link>) 
          } */}
        </div>
      </div>
      
    </>
  );
}

export default Header;