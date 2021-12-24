import Image from 'next/image'
import { FiGithub, FiTwitter, FiLinkedin, FiCoffee } from 'react-icons/fi'
import { PodiumIcon } from '../components/icons/PodiumIcon'
import { DevMtnIcon } from '../components/icons/DevMtnIcon'
import { MXIcon } from '../components/icons/MXIcon'

import { Layout } from '../components/Layout'

import profilePhoto from '../public/images/profile.jpeg'

export default function Home() {
  return (
    <Layout>
      <div className="w-full flex flex-col flex-grow items-center justify-center text-center p-8">
        <div className="flex items-center rounded-full border-4 border-gray-200 dark:border-gray-800 ">
          <Image
            alt="Profile photo of Tayte Stokes"
            className="rounded-full"
            height={125}
            src={profilePhoto}
            width={125}
          />
        </div>

        <h1 className="font-bold text-4xl mt-4">Tayte Stokes</h1>

        <p className="mt-2 text-gray-600 dark:text-gray-400">
          I am a digital craftsmen focusing on web development. I am currently employed and work
          full time as a Software Engineer at Podium.
        </p>

        <div className="w-full flex items-center justify-center text-sm mt-8 space-x-4 text-gray-600 dark:text-gray-400">
          <a
            className="flex items-center p-4 rounded-md bg-gray-100 dark:bg-gray-900 leading-none"
            href="https://github.com/taytestokes"
            rel="noopener noreferrer"
            target="_blank"
          >
            <FiGithub className="mr-2" />
            Github
          </a>

          <a
            className="flex items-center p-4 rounded-md bg-gray-100 dark:bg-gray-900 leading-none"
            href="https://twitter.com/taytestokes"
            rel="noopener noreferrer"
            target="_blank"
          >
            <FiTwitter className="mr-2" />
            Twitter
          </a>
        </div>
      </div>

      <div className="w-full flex flex-col p-8">
        <h1 className="font-bold text-4xl mt-4">Career</h1>

        {/* Podium */}
        <div className="w-full flex items-center p-4 border border-gray-200 dark:border-gray-700 rounded-md mt-4">
          <PodiumIcon size={32} />
          <div className="flex flex-col flex-grow px-4 leading-none">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-2xl">Podium</h3>
              <p className="text-sm text-gray-600">2021 - Present</p>
            </div>

            <p className="text-sm text-gray-600">Software Engineer</p>
          </div>
        </div>

        {/* MX */}
        <div className="w-full flex items-center p-4 border border-gray-200 dark:border-gray-700 rounded-md mt-4">
          <MXIcon size={32} />
          <div className="flex flex-col flex-grow px-4 leading-none">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-2xl">MX</h3>
              <p className="text-sm text-gray-600">2019 - 2021</p>
            </div>

            <p className="text-sm text-gray-600">Frontend Engineer</p>
          </div>
        </div>

        {/* DevMtn */}
        <div className="w-full flex items-center p-4 border border-gray-200 dark:border-gray-700 rounded-md mt-4">
          <DevMtnIcon size={32} />
          <div className="flex flex-col flex-grow px-4 leading-none">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-2xl">DevMtn</h3>
              <p className="text-sm text-gray-600">2018 - 2019</p>
            </div>

            <p className="text-sm text-gray-600">Web Development Mentor</p>
          </div>
        </div>
      </div>
    </Layout>
  )
}
