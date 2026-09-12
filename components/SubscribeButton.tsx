'use client'

import { FormEvent, useState } from 'react'
import { Headphones, Check, Loader2 } from 'lucide-react'

type Status = 'idle' | 'open' | 'submitting' | 'success' | 'error'

interface Props {
  source: string
}

export default function SubscribeButton({ source }: Props) {
  const [status, setStatus] = useState<Status>('idle')
  const [email, setEmail] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setStatus('submitting')
    setErrorMessage('')

    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source }),
      })
      const data = await res.json().catch(() => ({}))

      if (!res.ok) {
        setErrorMessage(data.error ?? 'Something went wrong.')
        setStatus('error')
        return
      }
      setStatus('success')
    } catch {
      setErrorMessage('Something went wrong. Please try again.')
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="hidden sm:flex items-center gap-2 px-4 py-2.5 border border-up/40 bg-up/10 text-up text-sm flex-shrink-0 mt-2">
        <Check className="w-4 h-4" />
        You&apos;re subscribed
      </div>
    )
  }

  if (status === 'open' || status === 'submitting' || status === 'error') {
    return (
      <div className="hidden sm:block flex-shrink-0 mt-2">
        <form onSubmit={handleSubmit} className="flex items-center gap-2">
          <input
            type="email"
            required
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@email.com"
            className="px-3 py-2.5 border border-border bg-bg-surface text-sm text-txt-primary placeholder:text-txt-muted focus:outline-none focus:border-accent/60 w-52"
          />
          <button
            type="submit"
            disabled={status === 'submitting'}
            className="flex items-center gap-2 px-4 py-2.5 border border-accent/50 bg-accent/10 text-accent text-sm font-medium hover:bg-accent/20 transition-all disabled:opacity-60 whitespace-nowrap"
          >
            {status === 'submitting' ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Join'}
          </button>
        </form>
        {status === 'error' && <p className="text-xs text-down mt-1.5">{errorMessage}</p>}
        <p className="text-xs text-txt-dim mt-1.5">New episode alerts only. Unsubscribe anytime.</p>
      </div>
    )
  }

  return (
    <button
      type="button"
      onClick={() => setStatus('open')}
      className="hidden sm:flex items-center gap-2 px-4 py-2.5 border border-border bg-bg-surface text-txt-secondary text-sm hover:border-border-bright hover:text-txt-primary transition-all cursor-pointer flex-shrink-0 mt-2"
    >
      <Headphones className="w-4 h-4" />
      Subscribe
    </button>
  )
}
