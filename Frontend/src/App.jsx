import React from 'react'
import Navbar from './components/shared/Navbar'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast';

import Home from './components/Home'
import Login from './components/auth/Login'
import Signup from './components/auth/Signup'
import Jobs from './components/Jobs';
import Browse from './components/Browse';
import Profile from './components/Profile';
import JobDescription from './components/JobDescription';
import Companies from './components/admin/Companies';
import CompanyCreate from './components/admin/CompanyCreate';
import CompanySetup from './components/admin/CompanySetup';
import AdminJobs from './components/admin/AdminJobs';
import PostJob from './components/admin/PostJob';
import Applicants from './components/admin/Applicants';
import ProtectedRoute from './components/admin/ProtectedRoute';
import ProtectedUser from './components/ProtectedUser';


const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/signup",
    element: <Signup />
  },
  {
    path: "/jobs",
    element: <ProtectedUser><Jobs/></ProtectedUser>
  },
  {
    path: "/browse",
    element: <ProtectedUser><Browse /></ProtectedUser>
  },
  {
    path: "/profile",
    element: <ProtectedUser><Profile /></ProtectedUser>
  },
  {
    path: "/description/:id",
    element: <ProtectedUser><JobDescription /></ProtectedUser>
  },



  //admin

  {
    path:"/admin/companies",
    element:<ProtectedRoute><Companies/></ProtectedRoute>
  },
  {
    path:"/admin/company/create",
    element:<CompanyCreate/>
  },
  {
    path:"/admin/companies/:id",
    element:<CompanySetup/>
  },
  {
    path:"/admin/jobs",
    element:<AdminJobs/>
  },
  {
    path:"/admin/job/create",
    element:<PostJob/>
  },
  {
    path:"/admin/jobs/:id/applicants",
    element:<Applicants/>
  }


])

function App() {
  return (
    <div>
      <RouterProvider router={appRouter} />
      <Toaster />
    </div>
  )
}

export default App
