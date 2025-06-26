/**
 * Highlight styles from highlight.js for styling
 * the code snippits in the MDX content.
 */
import 'highlight.js/styles/github-dark.css'

import Image from 'next/image'
import { format } from 'date-fns'

import { getPostSlugs, getPostBySlug } from '../../../_lib/mdx'

/**
 * Generate each static blog post page for each
 * slug
 */
export async function generateStaticParams() {
  const postSlugs = getPostSlugs()
  const paths = postSlugs.map((slug) => {
    return {
      slug: slug.replace('.mdx', ''),
    }
  })

  return paths
}

/**
 * Get the blog post from the database for the current static blog post page
 * using it's slug value.
 */
async function getPostData(slug) {
  const post = await getPostBySlug(slug)

  return {
    content: post.content,
    data: post.frontmatter,
  }
}

export default async function PostPage({ params: { slug } }) {
  const { content, data } = await getPostData(slug)
  const publishedDate = format(new Date(data?.publishedAt), 'MMMM do, yyyy')

  return (
    <article>
      <header className="text-center">
        <h1 className="text-2xl font-semibold">{data?.title}</h1>
      </header>

      <div className="relative flex w-full h-[40px] items-center py-2 bg-neutral-800 border border-neutral-700 rounded-md my-16">
        <Image
          aria-hidden
          className="ml-[-5px] rounded-full border border-neutral-700"
          src={'/headshot.jpeg'}
          alt={data?.author}
          width={75}
          height={75}
        />

        <div className="flex grow items-center justify-between px-2">
          <p className="text-xs font-medium text-neutral-400">{data?.author}</p>
          <p className="text-xs font-medium text-neutral-400">{publishedDate}</p>
        </div>
      </div>

      <section className="flex flex-col flex-1 break-words text-md prose prose-p:text-neutral-200 prose-h2:text-neutral-50 prose-h3:text-neutral-50  prose-pre:p-0 prose-img:rounded-md prose-a:text-neutral-50 prose-li:text-neutral-50 prose-code:text-neutral-50">
        {content}
      </section>
    </article>
  )
}
