import React from 'react';
import i18next from 'i18next';

const Footer = () => {
  // Language:
  const cookies = require('js-cookie');
  const currentLanguageCode = cookies.get('i18next') || 'en';
  const languages = [
    {
      code: 'en',
      name: 'English',
      country_code: 'gb',
    },
    {
      code: 'ar',
      name: 'العربية',
      country_code: 'sa',
      dir: 'rtl',
    },
  ];

  return (
    <div className="bg-white mt-20 pt-2.5 mb-5 text-lg grid md:grid-cols-3 items-center">
      <div className="text-center md:-ml-20">
        <p className="pt-5 underline underline-offset-2 text-indigo-500">
          Contact Us:
        </p>
        <span className="text-xs hover:text-sky-500">
          <a href="mailto:zombie.hat.iti@gmail.com">zombie.hat.iti@gmail.com</a>
        </span>
      </div>
      <div className="flex justify-around text-sm mt-5 md:-ml-12">
        {languages.map(({ code, name, country_code }) => (
          <p
            key={country_code}
            onClick={() => {
              i18next.changeLanguage(code);
            }}
            className={`hover:cursor-pointer my-5  hover:text-indigo-500 ${
              code === currentLanguageCode && 'text-sky-500'
            }`}
          >
            {name}
          </p>
        ))}
      </div>
      <div className="text-center mt-5 text-indigo-500 text-sm">
        Made by <span className="text-red-500"> &hearts; </span>
        <a
          href="https://github.com/mohamedk98/Zombie-Hat-.git"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline underline-offset-2 hover:text-sky-500"
        >
          RASMA Team
        </a>{' '}
        &copy; 2022
      </div>
    </div>
  );
};

export default Footer;
