import {ReactNode} from 'react'
import {Container} from '@/components/common/Container'
import {twMerge} from 'tailwind-merge'

type SimpleLayout = {
    title: string
    intro: string
    children: ReactNode
    gradient: string
}

export function SimpleLayout({
                                 title,
                                 intro,
                                 children,
                                 gradient
                             }: SimpleLayout) {
    return (
        <Container className="mt-16 sm:mt-32">
            <header className="max-w-2xl">
                <h1
                    className={twMerge(`
                        text-4xl
                        font-bold
                        tracking-tight
                        text-zinc-800
                        dark:text-zinc-100
                        sm:text-5xl
                        ${gradient ? `${gradient} bg-clip-text dark:text-transparent` : ''}
                    `)}>
                    {title}
                </h1>
                <p className="mt-6 text-base text-zinc-600 dark:text-zinc-400">
                    {intro}
                </p>
            </header>
            <div className="mt-16 sm:mt-20">{children}</div>
        </Container>
    )
}
