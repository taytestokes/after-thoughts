import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

import { compileMDX } from 'next-mdx-remote/rsc'
import rehypeSlug from 'rehype-slug'
import rehypeHighlight from 'rehype-highlight'

/**
 * Get a collection of all blog post file
 * names
 */
export const getPostSlugs = () => {
  return fs.readdirSync(path.join('app', '_content'))
}

/**
 * Get a collection of all blog posts in an
 * object form after reading the file contents
 */
export const getPosts = async (postSlugs) => {
  return postSlugs.map((slug) => {
    const { data } = matter(fs.readFileSync(path.join('app', '_content', slug), 'utf-8'))

    return {
      slug: slug.replace('.mdx', ''),
      data,
    }
  })
}

/**
 * Get a specific blog post contents by using
 * the post slug
 */
export const getPostBySlug = async (slug) => {
  const { frontmatter, content } = await compileMDX({
    source: fs.readFileSync(path.join('app', '_content', `${slug}.mdx`), 'utf-8'),
    options: {
      parseFrontmatter: true,
      mdxOptions: {
        rehypePlugins: [rehypeSlug, rehypeHighlight],
      },
    },
  })

  return {
    content,
    frontmatter,
  }
}
