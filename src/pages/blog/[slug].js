import React from 'react'

import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { marked } from 'marked'

export default function PostPage({ content, data, slug }) {
  return (
    <div className="w-screen min-h-screen flex flex-col bg-gray-900 text-white">
      <div className="h-2 bg-gradient-to-r from-violet-500  to-pink-500" />

      <div className="container mt-8 px-2 mx-auto">
        <div dangerouslySetInnerHTML={{ __html: marked(content) }} />
      </div>
    </div>
  )
}

export async function getStaticPaths() {
  const blogFolders = fs.readdirSync(path.join('blog'))
  const paths = blogFolders.map((folderName) => {
    return {
      params: {
        slug: folderName,
      },
    }
  })

  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps({ params: { slug } }) {
  const { data, content } = matter(fs.readFileSync(path.join('blog', slug, 'index.md'), 'utf-8'))

  return {
    props: {
      content,
      data,
      slug,
    },
  }
}
