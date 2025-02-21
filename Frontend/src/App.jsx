import { Navigate, Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import User from "./routes/User";
import Post from "./routes/Post";
import Layout from "./Layout/layout";
import { Toaster } from 'react-hot-toast';
import Signin from "./routes/Signin";
import ForgotPass from "./routes/ForgotPass";
import Signup from "./routes/Signup";
import NotFound from "./routes/NotFound";
import ResetPass from "./routes/ResetPass";
import Otp from "./routes/Otp";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/signup" element={ <Signup /> } />
        <Route path="/otp" element={ <Otp /> } />
        <Route path="/signin" element={ <Signin /> } />
        <Route path="/forgot" element={ <ForgotPass /> } />
        <Route path="/reset" element={ <ResetPass /> } />
        <Route path='/' element={ <Layout /> }>
          <Route path="/:userName" element={ <User /> } />
          <Route path="/:userName/post/:pId" element={ <Post /> } />
        </Route>
        <Route path="*" element={ <NotFound /> } />
      </>
    )
  )
  return (
    <div className="">
      <RouterProvider router={router} />
      <Toaster position="top-center" />
    </div>
  )
}

export default App
