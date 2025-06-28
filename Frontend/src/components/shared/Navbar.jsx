import React, { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Button } from '../ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { LogOut, Menu, User2, X } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import toast from 'react-hot-toast'
import axios from 'axios'
import { USER_API_END_POINT } from '../../utils/constant'
import { setUser } from '../../redux/authSlice'
import profilePhoto from '../../../public/profilePhoto.png'

function Navbar() {
  const { user } = useSelector((store) => store.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  async function handleLogout() {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, {
        withCredentials: true,
      })
      if (res.data.message) {
        dispatch(setUser(null))
        navigate('/')
        toast.success(res.data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.response.data.message)
    }
  }

  const navLinks =
    user && user.role === 'recruiter'
      ? [
          { to: '/admin/companies', label: 'Companies' },
          { to: '/admin/jobs', label: 'Jobs' },
        ]
      : [
          { to: '/', label: 'Home' },
          { to: '/jobs', label: 'Jobs' },
          { to: '/browse', label: 'Browse' },
        ]

  return (
    <header className="bg-white sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-[#6A38C2]">
          Job<span className="text-[#F83002]">Portal</span>
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center gap-10">
          <ul className="flex items-center gap-6 font-medium text-gray-700">
            {navLinks.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  className={({ isActive }) =>
                    isActive
                      ? 'text-[#6A38C2] underline underline-offset-4'
                      : 'hover:text-[#6A38C2] transition'
                  }
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>

          {!user ? (
            <div className="flex items-center gap-2">
              <Link to="/login">
                <Button variant="outline">Login</Button>
              </Link>
              <Link to="/signup">
                <Button className="bg-[#6A38C2] hover:bg-[#5b30a6] text-white">
                  Signup
                </Button>
              </Link>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="cursor-pointer">
                  <AvatarImage
                    src={
                      user?.profile?.profilePhoto
                        ? user.profile.profilePhoto
                        : profilePhoto
                    }
                    alt={user?.fullname}
                  />
                  <AvatarFallback>
                    {user?.fullname?.[0]?.toUpperCase() || 'U'}
                  </AvatarFallback>
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-80 p-4 space-y-4">
                <div className="flex items-center border-b pb-3">
                  <Avatar>
                    <AvatarImage
                      src={
                        user?.profile?.profilePhoto
                          ? user.profile.profilePhoto
                          : profilePhoto
                      }
                      alt={user?.fullname}
                    />
                    <AvatarFallback>
                      {user?.fullname?.[0]?.toUpperCase() || 'U'}
                    </AvatarFallback>
                  </Avatar>
                  <div className="ml-4">
                    <h4 className="font-semibold">{user?.fullname}</h4>
                    <p className="text-sm text-gray-500">
                      {user?.profile?.bio}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col gap-2 text-sm text-gray-700">
                  {user?.role === 'student' && (
                    <Link to="/profile" className="flex items-center gap-2">
                      <User2 size={18} />
                      View Profile
                    </Link>
                  )}
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 text-red-600 hover:text-red-700"
                  >
                    <LogOut size={18} />
                    Logout
                  </button>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </nav>

        {/* Mobile Toggle */}
        <div className="md:hidden">
          <button
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="focus:outline-none"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white px-6 pb-4">
          <ul className="space-y-2 font-medium text-gray-700">
            {navLinks.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  className={({ isActive }) =>
                    isActive
                      ? 'text-[#6A38C2] underline underline-offset-4'
                      : 'hover:text-[#6A38C2] transition'
                  }
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
          <div className="mt-4">
            {!user ? (
              <div className="flex flex-col gap-2">
                <Link to="/login">
                  <Button variant="outline" className="w-full">
                    Login
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button className="bg-[#6A38C2] hover:bg-[#5b30a6] text-white w-full">
                    Signup
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="space-y-2">
                {user.role === 'student' && (
                  <Link to="/profile">
                    <Button variant="ghost" className="w-full">
                      View Profile
                    </Button>
                  </Link>
                )}
                <Button
                  onClick={handleLogout}
                  variant="destructive"
                  className="w-full"
                >
                  Logout
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  )
}

export default Navbar
