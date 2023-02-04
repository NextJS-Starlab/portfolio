import {Feature} from '@/components/Feature'
import {MailIcon} from '@/components/icons/MailIcon'
import {Button} from '@/components/Button'

export function Subscribe() {
    return (
        <Feature icon={MailIcon} title="Subscribe">
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                Get notified when I publish something new, and unsubscribe at any time.
            </p>
            <div className="mt-6 flex">
                <input
                    type="email"
                    placeholder="Email address"
                    aria-label="Email address"
                    required
                    className="min-w-0 flex-auto appearance-none rounded-md border border-zinc-900/10 bg-white px-3 py-[calc(theme(spacing.2)-1px)] shadow-md shadow-zinc-800/5 placeholder:text-zinc-400 focus:border-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 dark:border-zinc-700 dark:bg-zinc-700/[0.15] dark:text-zinc-200 dark:placeholder:text-zinc-500 dark:focus:border-indigo-400 dark:focus:ring-indigo-400/10 sm:text-sm"
                />
                <Button className="ml-4 flex-none" variant="secondary">
                    Join
                </Button>
            </div>
        </Feature>
    )
}