'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState, useMemo, use } from 'react';
import styles from './BlogList.module.css';
import { format } from 'date-fns';

type PostData = {
    title: string;
    post_id: string;
    author: string;
    date: string;
    colors?: string[];
    content: string;
    tags: string[];
}

type PostsData = PostData;

export default function BlogList({ posts }: { posts: Promise<PostsData>; }) {
    const retrievedPosts = use(posts);
    const [selectedTag, setSelectedTag] = useState(null);
    const [selectedAuthor, setSelectedAuthor] = useState(null);

    const filteredPosts = useMemo(() => {
        if (!Array.isArray(retrievedPosts)) {
            return [];
        }
        const postsFiltered = retrievedPosts.filter(post => {
            const matchesTag = selectedTag ? post.tags.includes(selectedTag) : true;
            const matchesAuthor = selectedAuthor ? post.author === selectedAuthor : true;
            return matchesTag && matchesAuthor;
        });

        return postsFiltered.sort((a, b) => Number(b.date) - Number(a.date));
    }, [retrievedPosts, selectedTag, selectedAuthor]);

    const allTags = useMemo(() => {
        if (!Array.isArray(retrievedPosts)) {
            return new Set();
        }
        const allTags = retrievedPosts.flatMap(post => post.tags);
        return new Set(allTags);
    }, [retrievedPosts]);

    const allAuthors = useMemo(() => {
        if (!Array.isArray(retrievedPosts)) {
            return new Set();
        }
        const authors = retrievedPosts.map(post => post.author);
        return new Set(authors);
    }, [retrievedPosts]);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 5 },
        visible: { opacity: 1, y: 0 },
    };

    return (
        <div>

            <hr style={{ margin: `15px 0px` }} />
            <h2>Filter by tags</h2>
            <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
                {Array.from(allTags).map(tag => (
                    <button
                        key={tag}
                        onClick={() => setSelectedTag(tag === selectedTag ? null : tag)}
                        style={{
                            padding: '5px 10px',
                            background: tag === selectedTag ? '#0070f3' : '#eaeaea',
                            color: tag === selectedTag ? 'white' : 'black',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: 'pointer',
                        }}
                    >
                        {tag}
                    </button>
                ))}
            </div>
            <h2>Filter by author</h2>
            <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
                {Array.from(allAuthors).map(author => (
                    <button
                        key={author}
                        onClick={() => setSelectedAuthor(author === selectedAuthor ? null : author)}
                        style={{
                            padding: '5px 10px',
                            background: author === selectedAuthor ? '#0070f3' : '#eaeaea',
                            color: author === selectedAuthor ? 'white' : 'black',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: 'pointer',
                        }}
                    >
                        {author}
                    </button>
                ))}
            </div>

            <motion.ul
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="posts"
                style={{ listStyle: 'none', padding: 0 }}
            >
                {filteredPosts.map((post) => {
                    const colorStyle =
                        post.colors && post.colors.length === 1
                            ? { backgroundColor: post.colors[0] } // Solid color
                            : { background: `linear-gradient(to right, ${post.colors?.join(", ")})` }; // Gradient

                    return (
                        <motion.li key={post.post_id} variants={itemVariants}>
                            <Link href={`/blog/${post.post_id}`}>
                                <div className={styles.postContainer}>
                                    {post.colors ? (
                                        <div
                                            className="colorBar"
                                            style={{
                                                ...colorStyle,
                                                padding: `10px`,
                                                marginBottom: `5px`,
                                            }}
                                        />
                                    ) : null}
                                    <h2 className={styles.postTitle}>{post.title}</h2>
                                    <span>
                                        <span className={styles.postAuthor}>By {post.author} on </span>
                                        <span className={styles.postDate}>{format(new Date(post.date * 1000), 'yyyy-MM-dd HH:mm:ss')}</span>
                                    </span>
                                    <div className={styles.postTags}>
                                        Tags: <span className={styles.tagList}>{post.tags.join(', ')}</span>
                                    </div>
                                </div>
                            </Link>
                        </motion.li>
                    );
                })}
            </motion.ul>
        </div>
    );
}