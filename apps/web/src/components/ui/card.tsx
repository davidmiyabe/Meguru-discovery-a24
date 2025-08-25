import { type HTMLAttributes } from 'react'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  elevated?: boolean
}

export function Card({ elevated = false, className = '', ...props }: CardProps) {
  const base = 'rounded border border-border bg-cream transition-shadow'
  const elevation = elevated ? 'shadow-md hover:shadow-lg' : ''
  return <div className={`${base} ${elevation} p-4 sm:p-6 ${className}`} {...props} />
}

