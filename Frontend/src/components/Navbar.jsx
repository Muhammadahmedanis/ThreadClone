import React from "react";
import { Link, useLocation } from "react-router-dom";
import { GoHome } from "react-icons/go";
import { IoIosSearch } from "react-icons/io";
import { TbEdit } from "react-icons/tb";
import { CiHeart } from "react-icons/ci";
import { RxAvatar } from "react-icons/rx";

const navItems = [
  { path: "/", icon: GoHome, label: "Home" },
  { path: "/search", icon: IoIosSearch, label: "Search" },
  { path: "/create", icon: TbEdit, label: "Create" },
  { path: "/favorites", icon: CiHeart, label: "Favorites" },
  { path: "/profile/thread/1", icon: RxAvatar, label: "Profile" },
];

function Navbar() {
  const location = useLocation();

  return (
    <nav className="fixed top-147 md:top-1 w-full left-1/2 transform -translate-x-1/2 lg:w-[90%] max-w-md bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 text-white p-3 lg:rounded-full shadow-lg flex justify-around items-center">
      {navItems.map(({ path, icon: Icon, label }) => (
        <Link key={path} to={path} aria-label={label}>
          <Icon
            size={28}
            className={`cursor-pointer transition-transform duration-200 hover:scale-110 ${
              location.pathname === path ? "text-yellow-300 scale-110" : ""
            }`}
          />
        </Link>
      ))}
    </nav>
  );
}

export default Navbar;
