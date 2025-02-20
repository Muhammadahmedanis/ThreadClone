import { Navigate, Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import User from "./routes/User";
import Post from "./routes/Post";
import Layout from "./Layout/layout";
import { Toaster } from 'react-hot-toast';

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path='/' element={ <Layout /> }>
          <Route path="/:userName" element={ <User /> } />
          <Route path="/:userName/post/:pId" element={ <Post /> } />
        </Route>
      </>
    )
  )
  return (
    <div className="container max-w-[620px] mx-auto">
      <RouterProvider router={router} />
      <Toaster position="top-center" />
    </div>
  )
}

export default App
