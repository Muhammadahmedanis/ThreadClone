import Input from "../components/Input";
import { FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import logo from "/light-logo.svg"
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useActionState, useState } from "react";
import Label from "../components/Label";
import { FaRegEyeSlash } from "react-icons/fa6";
import { IoEyeOutline } from "react-icons/io5";
import { BiLoaderCircle } from "react-icons/bi";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { signupUser } from "../redux/slices/authSlice";

function Signin() {
  const dispatch = useDispatch();
  const [passIcon, setPassIcon] = useState("password");
  const navigate = useNavigate();
  const handlePass = () => {
      setPassIcon(passIcon === "password" ? "text" : "password");
  };

  const[user, submitAction, isPending] = useActionState(async (previousState, formData) => {
    const userName = formData.get("userName");
    const email = formData.get("email");
    const password = formData.get("password");

    // Field Validations
    if (!userName) {
        toast.error("Username is required");
        return null; 
    }

    if (!email) {
        toast.error("Email is required");
        return null;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
        toast.error("Invalid email format");
        return null;
    }

    if (!password) {
        toast.error("Password is required");
        return null;
    } else if (password.length < 8) {
        toast.error("Password must be at least 8 characters");
        return null;
    }

    const payload = { userName, email, password};
    console.log(payload);
    await dispatch(signupUser(payload));
    navigate("/otp");
    return null;
  })

  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row bg-[#343434]">
      {/* Left Section */}
      <div className="flex-1 p-6 md:p-12 lg:p-24 md:flex flex-col justify-center md:items-start">
        <div className="flex items-center gap-2 text-white justify-center">
          <img className="h-10" src={logo} alt="Thread Logo" />
          <span className="text-2xl font-semibold">Thread</span>
        </div>
        <div className="mt-12 text-white hidden md:block">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Hey, Hello!</h1>
          <h2 className="text-xl md:text-2xl font-semibold mb-4">Connect. Share. Engage. Your world, your voice</h2>
          <p className="text-gray-100/80 max-w-md text-lg">
            Stay connected like never before! Share your moments, engage with your community, and be part of the conversation that matters.
          </p>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md p-8 rounded-3xl bg-gray-100">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold mb-2">Welcome Back</h2>
            <p className="text-gray-500 font-bold">One step closer to your world. 🌍✨</p>
          </div>

          <form action={submitAction} className="space-y-4">
            <div>
              <Label htmlFor="LoggingUserName" labelName="User Name" />
              <Input type="text" name="userName" placeholder="john doe" />
            </div>
            <div>
              <Label htmlFor="LoggingEmailAddress" labelName="Email Address" />
              <Input type="email" name="email" placeholder="abc@gmail.com" />
            </div>
            <div>
              <Label htmlFor="LoggingPassword" labelName="Password" />
              <div className="relative flex items-center mt-2">
                <span onClick={handlePass} className="absolute right-3 cursor-pointer">
                  {passIcon === "password" ? <FaRegEyeSlash className="w-5 h-5 text-gray-400" /> : <IoEyeOutline className="w-5 h-5 text-gray-400" />}
                </span>
                <Input type={passIcon} name="password" placeholder="••••••••" />
              </div>
            </div>
            <div className="text-right">
              <Link to="/forgot" className="text-[#343434] text-sm hover:text-[#343434df] cursor-pointer">Forgot Password?</Link>
            </div>
            <button type="submit" className="w-full h-12 flex justify-center items-center rounded-xl bg-[#343434] hover:bg-[#343434df] cursor-pointer text-white" disabled={isPending}>
              {isPending ? 
                ( <BiLoaderCircle className="size-7 animate-spin" /> ) : 
                ( "Create Account" ) 
              }
            </button>
            <div className="relative my-3 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
              <span className="px-4 text-gray-500">OR</span>
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <button className="h-11 flex justify-center items-center gap-2 border rounded-xl cursor-pointer border-gray-300 hover:bg-gray-50">
                <FcGoogle size={23} /> Google
              </button>
              <button className="h-11 flex justify-center items-center gap-2 rounded-xl border cursor-pointer border-gray-300 hover:bg-gray-50">
                <FaFacebook size={22} className="text-blue-500" /> Facebook
              </button>
            </div>
            <div className="text-center text-gray-500 text-sm">
              Already have an account? <Link to="/signin" className="text-[#343434] hover:text-[#343434df] cursor-pointer">Sign In</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signin;