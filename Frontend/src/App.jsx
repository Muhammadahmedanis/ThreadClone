import { Navigate, Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import User from "./routes/User";
import Post from "./routes/SinglePost";
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
import { useEffect } from "react";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/signup" element={ <Signup /> } />
        <Route path="/otp" element={ <Otp /> } />
        <Route path="/forgot" element={ <ForgotPass /> } />
        <Route path="/reset" element={ <ResetPass /> } />
        <Route path="/update" element={ <UpdateProfile /> } />
        
        {/* { data  ?  */}
        {/* (   */}
          <Route path='/' element={ <Layout /> }>
        <Route path="/signin" element={ <Signin /> } />
            <Route index element={ <Home /> } />
            <Route path="/search" element={ <Search /> } />
            <Route path="/:userName" element={ <User /> } />
            <Route path="/:userName/post/:pId" element={ <SinglePost /> } />
            <Route path="/profile" element={ <ProfileLayout />}>
              <Route path="thread/:id" element={ <Thread /> } />
              <Route path="replies/:id" element={ <Replies /> } />
              <Route path="repost/:id" element={ <Repost /> } />
            </Route>
          </Route>
          {/* ): 
          (
          )
        } */}

        <Route path="*" element={ <NotFound /> } />
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
