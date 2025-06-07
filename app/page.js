import React from 'react'
import Link from 'next/link'

import { getPostSlugs, getPosts } from './_lib/mdx'

async function getPostData() {
  const postSlugs = getPostSlugs()
  const posts = await getPosts(postSlugs)

  // Sorts the posts by publish date going from latest to oldest
  const sortedPostsByAscDate = posts.sort((a, b) => {
    return Number(new Date(b.data.publishedAt)) - Number(new Date(a.data.publishedAt))
  })

  return {
    posts: sortedPostsByAscDate,
  }
}

export default async function Page() {
  const { posts } = await getPostData()

  return (
    <section>
      <ul className="w-full flex flex-col gap-4">
        {posts.map((post, index) => {
          return (
            <li key={`${post.slug} - ${index}}`}>
              <Link href={`/blog/${post.slug}`}>
                <div
                  className="bg-neutral-800 py-4 px-4 rounded-md group border border-neutral-700 hover:border-neutral-600 transition-colors duration-100 ease-in animate-fade-in"
                  style={{ animationDelay: `${index * 150}ms`, animationFillMode: 'both' }}
                >
                  <h2 className="text-md text-lg">{post.data.title}</h2>
                  <p className="text-sm text-neutral-400">{post.data.excerpt}</p>
                  <p className="text-sm text-neutral-400 mt-4 group-hover:text-neutral-200 transition-colors duration-100 ease-in">
                    Read More
                  </p>
                </div>
              </Link>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
