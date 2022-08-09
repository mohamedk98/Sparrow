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
        <a
          href="https://github.com/mohamedk98/Zombie-Hat-.git"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline underline-offset-2 mx-4"
          >
          RASMA Team
        </a>{' '}
        &copy; 2022
    </div>
  )
}

export default ProfileFooter;