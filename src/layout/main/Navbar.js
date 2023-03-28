import { signOut } from "firebase/auth";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { Link, useLocation } from "react-router-dom";
import auth from "../../firebase/auth.config";
import { logoutUser } from "../../redux/features/authentication/auth.slice";

const Navbar = () => {
  const dispatch = useDispatch()
  const { pathname } = useLocation();
  const { user } = useSelector(rootState => rootState.authentiaction)
  return (
    <nav
      className={`h-14 fixed w-full z-[999] ${pathname === "/" ? null : "bg-white"
        }`}
    >
      <ul className='max-w-7xl mx-auto flex gap-3 h-full items-center'>
        <li className='flex-auto font-semibold text-2xl'>
          <Link to='/'>JobBox</Link>
        </li>
        <li>
          <Link className='hover:text-primary' to='/jobs'>
            Jobs
          </Link>
        </li>
        {user?.email && user?.role && <li>
          <Link className='hover:text-primary' to='/Dashboard'>
            Dashboard
          </Link>
        </li>}
        {user?.email && !user?.role && <li>
          <Link className='hover:text-primary' to='/register'>
            Get Started
          </Link>
        </li>}
        <li>

          {!user?.email ? <Link
            className='border border-black px-2 py-1 rounded-full hover:border-primary hover:text-white hover:bg-primary hover:px-4 transition-all '
            to='/login'
          >
            Login
          </Link> : <button
            onClick={e => {
              signOut(auth).then(res => dispatch(logoutUser()))
            }}
            className='border border-black px-2 py-1 rounded-full hover:border-primary hover:text-white hover:bg-primary hover:px-4 transition-all '
          >
            Logout
          </button>}


        </li>

      </ul>
    </nav>
  );
};

export default Navbar;
