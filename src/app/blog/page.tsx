import { Suspense } from 'react'
import BlogList from '@/components/BlogList'
import BlogListSkeleton from '@/components/BlogListSkeleton'
import styles from '@/components/BlogList.module.css';

export const revalidate = 60

async function getPosts(){
    const data = await fetch('http://127.0.0.1:8080/posts')
    return await data.json()
}

export default function Page() {
    const posts = getPosts()

    return (
        <div className={styles.mainBody}>
            <header>
                <h1>welcome to the blog and stuff lmao</h1>
                <p>you can like filter by tags below :3</p>
            </header>
            <main>
                    <Suspense fallback={<BlogListSkeleton />}>
                        <BlogList posts={posts}/>
                    </Suspense>
            </main>
        </div>
    )
}