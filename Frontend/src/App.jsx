import { Navigate, Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
// import User from "./routes/User";
// import { useEffect } from "react";
// import Post from "./routes/SinglePost";
import './App.css'
import Layout from "./Layout/layout";
import { Toaster } from 'react-hot-toast';
import Signin from "./routes/Signin";
import ForgotPass from "./routes/ForgotPass";
import Signup from "./routes/Signup";
import NotFound from "./routes/NotFound";
import ResetPass from "./routes/ResetPass";
import Otp from "./routes/Otp";
import UpdateProfile from "./routes/UpdateProfile";
import Home from "./routes/Home";
import Search from "./routes/Search";
import ProfileLayout from "./Layout/ProfileLayout";
import Thread from "./routes/Thread";
import Replies from "./routes/Replies";
import Repost from "./routes/Repost";
import SinglePost from "./routes/SinglePost";
import ProtectedRoute from "./routes/ProtectedRoute";
import Trend from "./routes/Trend";
import Chat from "./routes/Chat";
import { useUserQuery } from "./redux/hooks/useUserQuery";
import { useEffect, useState } from "react";

function App() {
  const isExist = sessionStorage.getItem("user");
  const[me, setMe] = useState(null);
  const { myInfo } = useUserQuery();
  useEffect(() => {
    setMe(myInfo?.data)
  }, [myInfo?.data])
  console.log(me);
  
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
      <Route element={<ProtectedRoute user={!me} redirect='/' />} >
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/otp" element={<Otp />} />
        <Route path="/forgot" element={<ForgotPass />} />
        <Route path="/reset" element={<ResetPass />} />
        <Route path="/update" element={<UpdateProfile />} />
      </Route>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route element={<ProtectedRoute user={me} />}>
          <Route path="/search" element={<Search />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/:userName/post/:postId" element={<SinglePost />} />

          <Route path="/profile" element={<ProfileLayout />}>
            <Route path="thread/:id" element={<Thread />} />
            <Route path="replies/:id" element={<Replies />} />
            <Route path="repost/:id" element={<Repost />} />
          </Route>
          <Route path="/trend" element={ <Trend /> } />
        </Route>
      </Route>

      <Route path="*" element={<NotFound />} />
      </>
    )
  )
  return (
    <div>
      <RouterProvider router={router} />
      <Toaster position="top-center" />
    </div>
  )
}

export default App
