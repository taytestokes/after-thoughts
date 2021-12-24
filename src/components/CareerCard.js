import React from 'react'

export const CareerCard = ({
  companyName,
  endYear,
  Icon,
  position,
  startYear,
  technologies = [],
}) => {
  return (
    <div className="w-full flex p-4 border border-gray-200 dark:border-gray-700 rounded-md mt-4">
      <div className="flex flex-col items-center justify-center p-4">
        <Icon size={30} />
      </div>

      <div className="flex flex-col flex-grow px-4">
        <div className="w-full flex flex-col md:flex-row md:items-center justify-between">
          <h3 className="font-bold text-2xl">{companyName}</h3>

          <p className="text-xs text-gray-600 dark:text-gray-300">
            {startYear} - {endYear}
          </p>
        </div>

        <p className="text-sm font-bold mt-2 md:mt-0 text-gray-600 dark:text-gray-300">
          {position}
        </p>

        <div className="w-full flex flex-wrap items-center mt-2 md:mt-0">
          {technologies.map((technology, index) => (
            <span
              className="text-xs text-gray-600 dark:text-gray-300 p-1 mr-2 rounded-md bg-gray-100 dark:bg-gray-900 mt-2"
              key={`${technology} - ${index}`}
            >
              {technology}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
