import Head from 'next/head'
import {usePathname} from 'next/navigation'
import {Container} from './Container'
import {formatDate} from '@/lib/formatDate'
import {Prose} from './Prose'
import {ReactNode} from 'react'

export function ArticleLayout({
                                  children,
                                  isRssFeed = false,
                                  title,
                                  description,
                                  ogImage,
                                  date
                              }:
                                  {
                                      children?: ReactNode,
                                      isRssFeed: boolean,
                                      title: string,
                                      description: string,
                                      ogImage: string,
                                      date: string
                                  }) {
    const pathname = usePathname()

    if (isRssFeed) {
        return children
    }

    return (
        <>
            <Head>
                <title>{`${title} - Ryan Freeman`}</title>
                <meta name="description" content={description}/>
                <meta
                    property="og:url"
                    content={`${process.env.NEXT_PUBLIC_SITE_URL}${pathname}`}
                />
                <meta
                    property="og:type"
                    content="website"
                />
                <meta
                    property="og:title"
                    content={title}
                />
                <meta
                    property="og:description"
                    content={description}
                />
                {ogImage &&
                    <>
                        <meta
                            property="og:image"
                            content={ogImage}
                        />
                        <meta
                            name="twitter:card"
                            content="summary_large_image"
                        />
                        <meta
                            name="twitter:image"
                            content={ogImage}
                        />
                    </>
                }
                <meta
                    property="twitter:domain"
                    content="ryanfreeman.dev"
                />
                <meta
                    property="twitter:url"
                    content={`${process.env.NEXT_PUBLIC_SITE_URL}${pathname}`}
                />
                <meta
                    name="twitter:title"
                    content={title}
                />
                <meta
                    name="twitter:description"
                    content={description}
                />
            </Head>
            <Container className="mt-16 lg:mt-32">
                <div className="xl:relative">
                    <div className="mx-auto max-w-2xl">
                        <article>
                            <header className="flex flex-col">
                                <h1 className="mt-6 text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
                                    {title}
                                </h1>
                                <time
                                    dateTime={date}
                                    className="order-first flex items-center text-base text-zinc-500 dark:text-zinc-400"
                                >
                                    <span>{formatDate(date)}</span>
                                </time>
                            </header>
                            <Prose className="mt-8">{children}</Prose>
                        </article>
                    </div>
                </div>
            </Container>
        </>
    )
}