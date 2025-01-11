import { use } from "react";
import ReactMarkdown from "react-markdown";
import { format } from 'date-fns';
import styles from './client.module.css';
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";

type PostData = {
  title: string;
  post_id: string;
  author: string;
  date: number;
  colors?: string[];
  content: string;
};

export default function Post({
  post,
}: {
  post: Promise<PostData>;
}) {
  const resolvedPost = use(post);

  const processedContent = resolvedPost.content.replace(/\n/g, (match) =>
    Array(match.length).fill('<br />').join('')//.join('<br />')
  );
  console.log(processedContent)

  // Determine whether we have one color or a gradient
  const colorStyle = resolvedPost.colors?.length === 1
    ? { backgroundColor: resolvedPost.colors[0] } // Solid color
    : { background: `linear-gradient(to right, ${resolvedPost.colors?.join(", ")})` }; // Gradient

  return (
    <div className={styles.mainBody}>
      <h1>{resolvedPost.title}</h1>
      <h2 style={{ fontStyle: 'italic' }}>
        By {resolvedPost.author} on {format(new Date(resolvedPost.date * 1000), 'yyyy-MM-dd HH:mm:ss')}
      </h2>
      {resolvedPost.colors ? (
        <div
          className="colorBar"
          style={{
            ...colorStyle,
            padding: `10px`,
            borderRadius: `8px`,
            marginBottom: `5px`,
            border: `2px solid rgba(0, 0, 0, 0.7)`,
          }}
        />
      ) : <hr />}
      <div className={styles.content}>
        <ReactMarkdown
          className={styles.markdownContent}
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeRaw]}
          components={{
            blockquote: ({ node, children, ...props }) => (
              <blockquote
                style={{
                  borderLeft: "4px solid #ccc",
                  paddingLeft: "10px",
                  fontStyle: "italic",
                  color: "#666",
                  marginBottom: "10px",
                }}
                {...props}
              >
                {children}
              </blockquote>
            ),
          }}
        >
          {processedContent}
        </ReactMarkdown>
      </div>
    </div>
  );
}
