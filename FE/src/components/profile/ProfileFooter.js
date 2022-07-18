import React from 'react';
import { Link } from "react-router-dom";

function ProfileFooter() {
  return (
    <div className="text-base text-slate-500">
        <Link 
          to="/"
          className="hover:underline underline-offset-2 mx-4"
          >
          Privacy</Link>
        <Link 
          to="/"
          className="hover:underline underline-offset-2 mx-4"
          >
          Terms</Link>
        <Link
          to="https://github.com/mohamedk98/Zombie-Hat-.git"
          className="hover:underline underline-offset-2 mx-4"
          >
          RASMA Team
        </Link>{' '}
        &copy; 2022
    </div>
  )
}

export default ProfileFooter;