import {Container} from '@/components/Container'
import clsx from 'clsx'

export function SimpleLayout({title, intro, children, gradient}) {
    return (
        <Container className="mt-16 sm:mt-32">
            <header className="max-w-2xl">
                <h1
                    className={clsx(gradient
                        ? `${gradient} bg-clip-text dark:text-transparent`
                        : '', 'text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl')}>
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