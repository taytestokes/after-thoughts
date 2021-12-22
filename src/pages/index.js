import Image from 'next/image'

import { Layout } from '../components/Layout'

import profilePhoto from '..//public/images/profile.jpeg'

export default function Home() {
  return (
    <Layout>
      <div className="w-full flex flex-col flex-grow items-center justify-center">
        <div className="flex items-center rounded-full border-4 border-gray-200 dark:border-gray-800 ">
          <Image
            alt="Profile photo of Tayte Stokes"
            className="rounded-full"
            height={125}
            src={profilePhoto}
            width={125}
          />
        </div>

        <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mt-4">Tayte Stokes</h1>
        <p className="text-gray-800 dark:text-gray-400">Software Engineer</p>
      </div>
    </Layout>
  )
}
