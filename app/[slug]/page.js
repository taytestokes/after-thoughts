import { marked } from 'marked'

import { getPostSlugs, getPostBySlug } from '../../utils/blog'

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
      <h1 className="text-4xl font-extrabold">{postData.title}</h1>
      <div
        className="prose prose-invert prose-pre:bg-zinc-900 mt-8 prose-img:rounded-md prose-img:border-4 prose-img:border-zinc-600"
        dangerouslySetInnerHTML={{ __html: marked(postContent) }}
      />
    </article>
  )
}
