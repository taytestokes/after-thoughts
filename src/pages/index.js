import Image from 'next/image'
import { FiGithub, FiTwitter, FiLinkedin, FiCoffee } from 'react-icons/fi'
import { PodiumIcon } from '../components/icons/PodiumIcon'
import { DevMtnIcon } from '../components/icons/DevMtnIcon'
import { MXIcon } from '../components/icons/MXIcon'

import { Layout } from '../components/Layout'
import { CareerCard } from '../components/CareerCard'

import profilePhoto from '../public/images/profile.jpeg'

export default function Home() {
  return (
    <Layout>
      {/* Introduction Section */}
      <div className="w-full flex flex-col flex-grow items-center justify-center text-center py-8">
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

      {/* Career Section */}
      <div className="w-full flex flex-col py-8">
        <h1 className="font-bold text-4xl mt-4">Career</h1>
        <CareerCard
          companyName="Podium"
          endYear="Present"
          Icon={PodiumIcon}
          position="Software Engineer"
          startYear="2021"
          technologies={['Javascript', 'Typescript', 'React', 'Chakra', 'Graphql']}
        />

        <CareerCard
          companyName="MX"
          endYear="2021"
          Icon={MXIcon}
          position="Software Engineer"
          startYear="2019"
          technologies={['Javascript', 'React', 'Redux', 'Axios', 'RxJS', 'D3', 'Storybook']}
        />

        <CareerCard
          companyName="DevMountain"
          endYear="2018"
          Icon={DevMtnIcon}
          position="Web Development Mentor"
          startYear="2019"
          technologies={[
            'Html',
            'Css',
            'Javascript',
            'React',
            'Redux',
            'Node',
            'Express',
            'PostgreSQL',
          ]}
        />
      </div>
    </Layout>
  )
}
