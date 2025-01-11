import Link from 'next/link'
import './globals.css'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        {/* Layout UI */}
        {/* Place children where you want to render a page or nested layout */}
        <div style={{
          display: `block`,
          backgroundColor: `rgb(0,0,0,0.5)`,
          padding: `1px`,
          margin: `5px`,
          borderRadius: `15px`,
          textAlign: `left`,
          backdropFilter: `blur(4px)`
        }}>
          <Link style={{margin: `15px`}} href={`/`}>Home</Link>
          {/* <hr></hr> */}
          <Link href={`/blog`}>Blog</Link>
        </div>
        <main>{children}</main>
      </body>
    </html>
  )
}