import nextMDX from '@next/mdx'
import remarkGfm from 'remark-gfm'
import rehypePrism from '@mapbox/rehype-prism'

/** @type {import('next').NextConfig} */
const nextConfig = {
    pageExtensions: ['jsx', 'js', 'tsx', 'mdx'],
    reactStrictMode: true,
    swcMinify: true,
    experimental: {
        newNextLinkBehavior: true,
        scrollRestoration: true
    },
    images: {
        domains: ['i.scdn.co']
    },
    async rewrites() {
        return [
            {
                source: '/api/:path',
                destination: 'https://ryanfreeman.dev/:path/',
            }
        ]
    }
}

const withMDX = nextMDX({
    extension: /\.mdx?$/,
    options: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [rehypePrism],
    }
})

export default withMDX(nextConfig)
