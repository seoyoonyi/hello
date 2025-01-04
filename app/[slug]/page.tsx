import { Suspense } from 'react'

import { notFound } from 'next/navigation'

import { baseUrl } from '@/app/sitemap'
import BlogComments from '@/components/blog/blog-comments'
import { CustomMDX } from '@/components/mdx'
import { ViewCount } from '@/components/view-count'
import { getBlogPosts } from '@/lib/api/mdx'
import { formatDate } from '@/lib/utils/date-utils'

export async function generateStaticParams() {
  let posts = getBlogPosts()

  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export function generateMetadata({ params }) {
  let post = getBlogPosts().find((post) => post.slug === params.slug)
  if (!post) {
    return
  }

  let { title, publishedAt: publishedTime, summary: description, image } = post.metadata
  let ogImage = image ? image : `${baseUrl}/og?title=${encodeURIComponent(title)}`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
      publishedTime,
      url: `${baseUrl}/${post.slug}`,
      images: [
        {
          url: ogImage,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
  }
}

export default async function Blog({ params }) {
  let post = getBlogPosts().find((post) => post.slug === params.slug)

  if (!post) {
    notFound()
  }

  const content = await CustomMDX({ source: post.content })

  return (
    <article className='mx-auto max-w-[750px]'>
      <section className='mb-10'>
        <script
          type='application/ld+json'
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'BlogPosting',
              headline: post.metadata.title,
              datePublished: post.metadata.publishedAt,
              dateModified: post.metadata.publishedAt,
              description: post.metadata.summary,
              image: post.metadata.image
                ? `${baseUrl}${post.metadata.image}`
                : `/og?title=${encodeURIComponent(post.metadata.title)}`,
              url: `${baseUrl}/${post.slug}`,
              author: {
                '@type': 'Person',
                name: 'My Portfolio',
              },
            }),
          }}
        />
        <h1 className='title text-2xl font-semibold tracking-tighter'>{post.metadata.title}</h1>
        <div className='mb-8 mt-2 flex items-center justify-between text-sm'>
          <p className='text-sm text-neutral-600 dark:text-neutral-400'>
            {formatDate(post.metadata.publishedAt)}
          </p>
          <Suspense>
            <ViewCount slug={post.slug} />
          </Suspense>
        </div>

        <section className='prose'>{content}</section>
      </section>

      <BlogComments />
    </article>
  )
}
