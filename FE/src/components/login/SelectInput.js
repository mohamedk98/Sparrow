import React, { Fragment } from 'react';

const SelectInput = ({ years, months, days }) => {
  return (
    <Fragment>
      <div className="flex justify-between gap-6">
        <div className="mb-3 w-4/12">
          <select className="form-select appearance-none block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none">
            {days.map((day, index) => (
              <option value={day} key={index}>
                {day}
              </option>
            ))}{' '}
          </select>
        </div>

        <div className="mb-3 w-4/12">
          <select className="form-select appearance-none block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none">
            {months.map((month, index) => (
              <option value={month} key={index}>
                {month}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-3 w-4/12">
          <select className="form-select appearance-none block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none">
            {years.map((year, index) => (
              <option value={year} key={index}>
                {year}
              </option>
            ))}
          </select>
        </div>
      </div>
    </Fragment>
  );
};

export default SelectInput;
