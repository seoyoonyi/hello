'use client'

import { useState } from 'react'

import { useRouter } from 'next/navigation'

import CategoryList from '@/components/category/category-list'
import { BlogPosts } from '@/components/posts'
import { CategoryDetail } from '@/config/types'

interface CategoryPageProps {
  categoryList: CategoryDetail[]
  allPostCount: number
}

export default function Page({ categoryList, allPostCount }: CategoryPageProps) {
  const [currentCategory, setCurrentCategory] = useState<string>('all')
  const router = useRouter()

  const categoryToURL = (category: string) => category.toLowerCase()

  const onCategoryChange = (category: string) => {
    setCurrentCategory(category)
    router.push(category === 'all' ? '/' : `/blog/category/${categoryToURL(category)}`)
  }

  return (
    <section>
      <div className='my-8'>
        <CategoryList />
        <BlogPosts currentCategory={currentCategory} />
      </div>
    </section>
  )
}
