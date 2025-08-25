import { type HTMLAttributes } from 'react'

export function Chip({ className = '', ...props }: HTMLAttributes<HTMLSpanElement>) {
  return <span className={`chip sm:px-3 sm:py-1.5 sm:text-sm ${className}`} {...props} />
}

