import { marked } from 'marked'

import { TableOfContents } from '../_components/TableOfContents'

import { getPostSlugs, getPostBySlug } from '../../../../utils/blog'

/**
 * Generate each static blog post page for each
 * slug
 */
export async function generateStaticParams() {
  const postSlugs = getPostSlugs()
  const paths = postSlugs.map((slug) => {
    return {
      slug: slug.replace('.md', ''),
    }
  })

  return paths
}

/**
 * Get the blog post from the database for the current static blog post page
 * using it's slug value.
 */
function getPostData(slug) {
  const post = getPostBySlug(slug)

  return {
    postContent: post.content,
    postData: post.data,
  }
}

export default function PostPage({ params: { slug } }) {
  const { postContent, postData } = getPostData(slug)

  return (
    <article className="container flex flex-col mx-auto px-4 py-8">
      <div className="lg:p-12 rounded-md text-center">
        <h1 className="text-3xl font-bold">{postData.title}</h1>
      </div>
      <div className="w-full flex mt-8 gap-8">
        <div className="hidden lg:flex min-w-[250px] max-w-[250px]">
          <TableOfContents />
        </div>
        <div
          className="w-1/2 flex flex-col flex-1 break-words prose prose-invert prose-pre:bg-zinc-800 prose-img:rounded-md prose-img:border-4 prose-img:border-zinc-600"
          dangerouslySetInnerHTML={{ __html: marked(postContent) }}
        />
      </div>
    </article>
  )
}
