import React from 'react';

const Footer = () => {
  return (
    <div className="bg-white mt-16 mb-5 text-lg grid md:grid-cols-3 items-center">
      <div className="text-center md:-ml-12">
        <p className="pt-4 pb-2 underline underline-offset-2 text-cyan-600">
          Contact Us:
        </p>
        <div className="flex flex-col text-sm">
          <a
            href="https://www.linkedin.com/in/mohamedk98"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-cyan-600"
          >
            Mohamed Khaled
          </a>
          <a
            href="https://www.linkedin.com/in/abdelhameed-sayed-490545202"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-cyan-600"
          >
            AbdelHameed Sayed
          </a>
          <a
            href="https://www.linkedin.com/in/rana-ahmed-k/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-cyan-600"
          >
            Rana Ahmed
          </a>
          <a
            href="https://www.linkedin.com/in/ali-maher-84199823b"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-cyan-600"
          >
            Ali Maher
          </a>
          <a
            href="https://www.linkedin.com/in/sarah-ahmed-s"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-cyan-600"
          >
            Sara Ahmed
          </a>
        </div>
      </div>
      <div className="flex justify-center text-sm mr-0 md:mr-11 lg:mr-10 mt-3">
        <p className="hover:cursor-pointer my-4 mr-24 hover:text-cyan-600">
          English
        </p>
        <p className="hover:cursor-pointer my-4 hover:text-cyan-600">عربي</p>
      </div>
      <div className="text-center mt-3 text-cyan-600 text-sm">
        Made by <span className="text-red-500">&hearts;</span>{' '}
        <a
          href="https://github.com/mohamedk98/Zombie-Hat-.git"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline underline-offset-2"
        >
          RASMA Team
        </a>{' '}
        &copy; 2022
      </div>
    </div>
  );
};

export default Footer;
