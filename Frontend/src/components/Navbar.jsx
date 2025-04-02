import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { GoHome } from "react-icons/go";
import { IoIosSearch } from "react-icons/io";
import { TbEdit } from "react-icons/tb";
import { CiHeart } from "react-icons/ci";
import { RxAvatar } from "react-icons/rx";
import { useDispatch } from "react-redux";
import { openPostModel } from "../redux/slices/modelSlice";


function Navbar() {
  const userId = JSON.parse(localStorage.getItem("user")).id;
  const navItems = [
    { path: "/", icon: GoHome, label: "Home" },
    { path: "/search", icon: IoIosSearch, label: "Search" },
    { path: "/favorites", icon: CiHeart, label: "Favorites" },
    { path: `/profile/thread/${userId}`, icon: RxAvatar, label: "Profile" },
  ];
  const location = useLocation();
  const [user, setUser] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <nav className="fixed top-147 md:top-1 w-full left-1/2 transform -translate-x-1/2 lg:w-[90%] max-w-md 
      bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 dark:from-gray-800 dark:via-gray-700 dark:to-gray-900 
      text-white dark:text-gray-300 p-3 lg:rounded-full shadow-lg flex justify-around items-center transition-colors duration-300">
      
      {navItems.map(({ path, icon: Icon, label }) => (
        <Link key={path} to={path} aria-label={label}>
          <Icon
            size={28}
            className={`cursor-pointer transition-transform duration-200 hover:scale-110 
              ${location.pathname === path ? "text-yellow-300 scale-110" : "text-white dark:text-gray-400"}`}
          />
        </Link>
      ))}

      {user && (
        <button onClick={() => dispatch(openPostModel(true))} aria-label="Create">
          <TbEdit
            size={28}
            className="cursor-pointer transition-transform duration-200 hover:scale-110 text-white dark:text-gray-400"
          />
        </button>
      )}
    </nav>
  );
}

export default Navbar;
