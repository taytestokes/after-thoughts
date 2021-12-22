import React from 'react'

export const Timeline = ({ data }) => {
  return (
    <div className="w-full">
      <div className="relative h-full wrap overflow-hidden">
        <div className="absolute left-1/2 h-full border-l border-gray-300 dark:border-gray-700 translate-x-1/2"></div>

        {data?.events?.map((event, index) => {
          const isEvenIndex = index % 2 === 0

          return (
            <div
              className={`w-full flex items-center ${
                isEvenIndex ? 'flex-row' : 'flex-row-reverse'
              } justify-between`}
              key={index}
            >
              <div className="w-5/12 order-1" />
              <div className="order-1" />
              <div className="w-5/12 order-1 p-4 border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 rounded-md relative">
                <h2 className="font-bold">{event.title}</h2>
                <p className="text-sm mt-2 text-gray-700 dark:text-gray-300">{event.description}</p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
