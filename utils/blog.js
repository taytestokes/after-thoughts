import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

/**
 * Get a collection of all blog post file
 * names
 */
export const getPostSlugs = () => {
  return fs.readdirSync(path.join('data', 'blog'))
}

/**
 * Get a collection of all blog posts in an
 * object form after reading the file contents
 */
export const getPosts = (postSlugs) => {
  return postSlugs.map((slug) => {
    const { data } = matter(fs.readFileSync(path.join('data', 'blog', slug), 'utf-8'))

    return {
      slug: slug.replace('.md', ''),
      data,
    }
  })
}

/**
 * Get a specific blog post contents by using
 * the post slug
 */
export const getPostBySlug = (slug) => {
  const { data, content } = matter(
    fs.readFileSync(path.join('data', 'blog', `${slug}.md`), 'utf-8'),
  )

  return {
    content,
    data,
  }
}
