import Image from 'next/image'

import { Layout } from '../components/Layout'

import profilePhoto from '..//public/images/profile.jpeg'

export default function Home() {
  return (
    <Layout>
      <div className="w-full flex flex-col items-start py-8 rounded-md">
        <div className="flex items-center rounded-full border-4 border-gray-100 dark:border-gray-900 ">
          <Image
            alt="Profile photo of Tayte Stokes"
            className="rounded-full"
            height={125}
            src={profilePhoto}
            width={125}
          />
        </div>

        <div className="mt-8 flex flex-col items-start">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100">Tayte Stokes</h1>
          <p className="text-gray-800 dark:text-gray-400">Software Engineer</p>
          <p className="text-gray-600 mt-4">
            Hey! I'm Tayte. I'm a Software Engineer currently working at Podium. Welcome to my site
            where you can follow my journey as a digital craftsman.
          </p>
        </div>
      </div>
    </Layout>
  )
}
