import { Suspense } from "react"
import Post from '@/app/blog/[id]/client'

async function getPost(id: number){
    const data = await fetch('http://127.0.0.1:8080/posts/' + id)
    return await data.json()
  }

export default async function Page({
    params,
}: {
    params: Promise<{ id: number }>
}) {
    const id = (await params).id
    const post = getPost(id)
    return(
        <Suspense fallback={<div>Loading...</div>}>
            <Post post={post} />
        </Suspense>
    )
}