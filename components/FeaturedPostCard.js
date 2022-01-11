import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import format from 'date-fns/format'
import { HiLightningBolt } from 'react-icons/hi'

export const FeaturedPostCard = ({ featuredPost }) => {
  const publishedDate = format(new Date(featuredPost.data.publishedAt), 'MMMM dd, yyyy')
  return (
    <Link href={`/blog/${featuredPost.slug}`}>
      <a className="md:col-span-3 flex flex-col items-start p-4 rounded-md bg-zinc-900 border-4 border-zinc-700">
        <div className="flex items-center text-zinc-50 bg-zinc-700 px-2 font-bold rounded-md space-x-1">
          <HiLightningBolt />
          <p>Featured Post</p>
        </div>

        <h3 className="text-3xl text-zinc-50 font-extrabold mt-2">{featuredPost.data.title}</h3>
        <p className="text-sm text-zinc-200 mt-2">{featuredPost.data.excerpt}</p>

        <div className="flex items-start mt-4 text-zinc-200 space-x-2 ">
          <div className="border-2 border-zinc-700 rounded-full flex flex-col items-start">
            <Image
              alt="Tayte Stokes"
              className="rounded-full"
              height={30}
              src="/profile.jpeg"
              width={30}
            />
          </div>
          <div className="flex flex-col text-sm">
            <p className="text-white font-bold">Tayte Stokes</p>
            <p className="text-xs">{publishedDate}</p>
          </div>
        </div>
      </a>
    </Link>
  )
}
