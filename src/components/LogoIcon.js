import React from 'react'

export const LogoIcon = ({ size = 25 }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect className="fill-current text-white dark:text-black" width="200" height="200" rx="5" />
      <path
        className="fill-current text-gray-900 dark:text-white"
        d="M149.303 37.1676L131.408 21.6725C127.648 18.417 122.068 18.4191 118.31 21.6775L50.6512 80.3542C46.0744 84.3233 46.0501 91.4182 50.5996 95.4186L68.5647 111.216C72.33 114.527 77.9651 114.537 81.7429 111.241L149.332 52.2621C153.91 48.2668 153.897 41.1453 149.303 37.1676Z"
      />
      <path
        className="fill-current text-gray-900 dark:text-white"
        d="M149.303 105.168L131.408 89.6725C127.648 86.417 122.068 86.4191 118.31 89.6775L50.6512 148.354C46.0744 152.323 46.0501 159.418 50.5996 163.419L68.5647 179.216C72.33 182.527 77.9651 182.537 81.7429 179.241L149.332 120.262C153.91 116.267 153.897 109.145 149.303 105.168Z"
      />
    </svg>
  )
}
