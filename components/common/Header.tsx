import {useRouter} from 'next/router'
import {useEffect, useRef} from 'react'
import {Container} from './Container'
import {MobileNavigation, DesktopNavigation} from '@/components/ui/Navigation'
import {Avatar, AvatarContainer} from '@/components/ui/Avatar'
import {MoonIcon} from '@/components/icons/MoonIcon'
import {SunIcon} from '@/components/icons/SunIcon'

function ModeToggle() {
    function disableTransitionsTemporarily() {
        document.documentElement.classList.add('[&_*]:!transition-none')
        window.setTimeout(() => {
            document.documentElement.classList.remove('[&_*]:!transition-none')
        }, 0)
    }

    function toggleMode() {
        disableTransitionsTemporarily()

        let darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
        let isSystemDarkMode = darkModeMediaQuery.matches
        let isDarkMode = document.documentElement.classList.toggle('dark')

        if (isDarkMode === isSystemDarkMode) {
            delete window.localStorage.isDarkMode
        } else {
            window.localStorage.isDarkMode = isDarkMode
        }
    }

    return (
        <button
            type="button"
            aria-label="Toggle dark mode"
            className="group rounded-full bg-white/90 px-3 py-2 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur transition dark:bg-zinc-800/90 dark:ring-white/10 dark:hover:ring-white/20"
            onClick={toggleMode}
        >
            <SunIcon
                className="h-6 w-6 fill-zinc-100 stroke-zinc-500 transition group-hover:fill-zinc-200 group-hover:stroke-zinc-700 dark:hidden [@media(prefers-color-scheme:dark)]:fill-indigo-50 [@media(prefers-color-scheme:dark)]:stroke-indigo-500 [@media(prefers-color-scheme:dark)]:group-hover:fill-indigo-50 [@media(prefers-color-scheme:dark)]:group-hover:stroke-indigo-600"/>
            <MoonIcon
                className="hidden h-6 w-6 fill-zinc-700 stroke-zinc-500 transition dark:block [@media(prefers-color-scheme:dark)]:group-hover:stroke-zinc-400 [@media_not_(prefers-color-scheme:dark)]:fill-indigo-400/10 [@media_not_(prefers-color-scheme:dark)]:stroke-indigo-500"/>
        </button>
    )
}

function clamp(num: number, a: number, b: number) {
    let min = Math.min(a, b)
    let max = Math.max(a, b)
    return Math.min(Math.max(num, min), max)
}

export function Header() {
    const router = useRouter()
    const isHomePage = router.pathname === '/'

    const headerRef = useRef<HTMLDivElement>(null)
    const avatarRef = useRef<HTMLImageElement>(null)
    const isInitial = useRef(true)

    const headerPosition: Object = {
        position: 'var(--header-position)'
    }
    const headerInnerPosition: Object = {
        position: 'var(--header-inner-position)'
    }

    useEffect(() => {
        let downDelay = avatarRef.current?.offsetTop ?? 0
        let upDelay = 64

        function setProperty(property: string, value: string) {
            document.documentElement.style.setProperty(property, value.toString())
        }

        function removeProperty(property: string) {
            document.documentElement.style.removeProperty(property)
        }

        function updateHeaderStyles() {
            const headerBoundingRect = headerRef.current?.getBoundingClientRect()
            let top = headerBoundingRect?.top!
            let height = headerBoundingRect?.height!

            let scrollY = clamp(
                window.scrollY,
                0,
                document.body.scrollHeight - window.innerHeight
            )

            if (isInitial.current) {
                setProperty('--header-position', 'sticky')
            }

            setProperty('--content-offset', `${downDelay}px`)

            if (isInitial.current || scrollY < downDelay) {
                setProperty('--header-height', `${downDelay + height}px`)
                setProperty('--header-mb', `${-downDelay}px`)
            } else if (top + height < -upDelay) {
                let offset = Math.max(height, scrollY - upDelay)
                setProperty('--header-height', `${offset}px`)
                setProperty('--header-mb', `${height - offset}px`)
            } else if (top === 0) {
                setProperty('--header-height', `${scrollY + height}px`)
                setProperty('--header-mb', `${-scrollY}px`)
            }

            if (top === 0 && scrollY > 0 && scrollY >= downDelay) {
                setProperty('--header-inner-position', 'fixed')
                removeProperty('--header-top')
                removeProperty('--avatar-top')
            } else {
                removeProperty('--header-inner-position')
                setProperty('--header-top', '0px')
                setProperty('--avatar-top', '0px')
            }
        }

        function updateAvatarStyles() {
            if (!isHomePage) {
                return
            }

            let fromScale = 1
            let toScale = 36 / 64
            let fromX = 0
            let toX = 2 / 16

            let scrollY = downDelay - window.scrollY

            let scale = (scrollY * (fromScale - toScale)) / downDelay + toScale
            scale = clamp(scale, fromScale, toScale)

            let x = (scrollY * (fromX - toX)) / downDelay + toX
            x = clamp(x, fromX, toX)

            setProperty(
                '--avatar-image-transform',
                `translate3d(${x}rem, 0, 0) scale(${scale})`
            )

            let borderScale = 1 / (toScale / scale)
            let borderX = (-toX + x) * borderScale
            let borderTransform = `translate3d(${borderX}rem, 0, 0) scale(${borderScale})`

            setProperty('--avatar-border-transform', borderTransform)
            setProperty('--avatar-border-opacity', (scale === toScale ? 1 : 0).toString())
        }

        function updateStyles() {
            updateHeaderStyles()
            updateAvatarStyles()
            isInitial.current = false
        }

        updateStyles()

        const opts: AddEventListenerOptions & EventListenerOptions = {passive: true}
        window.addEventListener('scroll', updateStyles, opts)
        window.addEventListener('resize', updateStyles)

        return () => {
            window.removeEventListener('scroll', updateStyles, opts)
            window.removeEventListener('resize', updateStyles)
        }
    }, [isHomePage])

    return (
        <>
            <header
                className="pointer-events-none relative z-50 flex flex-col"
                style={{
                    height: 'var(--header-height)',
                    marginBottom: 'var(--header-mb)',
                }}
            >
                {isHomePage && (
                    <>
                        <div
                            ref={avatarRef}
                            className="order-last mt-[calc(theme(spacing.16)-theme(spacing.3))]"
                        />
                        <Container
                            className="top-0 order-last -mb-3 pt-3"
                            style={{position: 'var(--header-position)'}}
                        >
                            <div className="top-[var(--avatar-top,theme(spacing.3))] w-full"
                                 style={headerInnerPosition}>
                                <div className="relative">
                                    <AvatarContainer
                                        className="absolute left-0 top-3 origin-left transition-opacity"
                                        style={{
                                            opacity: 'var(--avatar-border-opacity, 0)',
                                            transform: 'var(--avatar-border-transform)',
                                        }}
                                    />
                                    <Avatar
                                        large
                                        className="block h-16 w-16 origin-left"
                                        style={{transform: 'var(--avatar-image-transform)'}}
                                    />
                                </div>
                            </div>
                        </Container>
                    </>
                )}
                <div
                    ref={headerRef}
                    className="top-0 z-10 h-16 pt-6"
                    style={headerPosition}
                >
                    <Container
                        className="top-[var(--header-top,theme(spacing.6))] w-full"
                        style={{position: 'var(--header-inner-position)'}}
                    >
                        <div className="relative flex gap-4">
                            <div className="flex flex-1">
                                {!isHomePage && (
                                    <AvatarContainer>
                                        <Avatar/>
                                    </AvatarContainer>
                                )}
                            </div>
                            <div className="flex flex-1 justify-end md:justify-center">
                                <MobileNavigation className="pointer-events-auto md:hidden"/>
                                <DesktopNavigation className="pointer-events-auto hidden md:block"/>
                            </div>
                            <div className="flex justify-end md:flex-1">
                                <div className="pointer-events-auto">
                                    <ModeToggle/>
                                </div>
                            </div>
                        </div>
                    </Container>
                </div>
            </header>
            {isHomePage && <div style={{height: 'var(--content-offset)'}}/>}
        </>
    )
}
