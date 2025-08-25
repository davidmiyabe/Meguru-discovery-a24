import { type HTMLAttributes } from 'react'

export function Chip({ className = '', ...props }: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={`inline-block rounded-full bg-gold px-2 py-1 text-xs text-forest sm:px-3 sm:py-1.5 sm:text-sm ${className}`}
      {...props}
    />
  )
}

