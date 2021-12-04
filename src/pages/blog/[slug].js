import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { marked } from 'marked'

import { Layout } from '../../components/Layout'

export default function PostPage({ content, data, slug }) {
  return (
    <Layout>
      <div className="container mt-8 px-2 mx-auto">
        <div dangerouslySetInnerHTML={{ __html: marked(content) }} />
      </div>
    </Layout>
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
