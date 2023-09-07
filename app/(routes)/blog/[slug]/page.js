import { TableOfContents } from '../_components/TableOfContents'
import { MDXContent } from '../_components/MDXContent'

import { getPostSlugs, getPostBySlug } from '../../../_utils/blog'

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

  return (
    <article className="container flex flex-col mx-auto px-4 py-8">
      <div className="lg:p-12 rounded-md text-center">
        <h1 className="text-3xl font-bold">{data?.title}</h1>
      </div>
      <div className="w-full flex mt-8 gap-8">
        <div className="hidden lg:flex min-w-[250px] max-w-[250px]">
          <TableOfContents />
        </div>
        <MDXContent content={content} />
      </div>
    </article>
  )
}
