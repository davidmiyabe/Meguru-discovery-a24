import { type HTMLAttributes } from 'react'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  elevated?: boolean
}

export function Card({ elevated = false, className = '', ...props }: CardProps) {
  const base = 'rounded border border-border bg-cream shadow-md transition-all duration-300'
  const elevation = elevated ? 'hover:shadow-lg' : ''
  return <div className={`${base} ${elevation} p-4 sm:p-6 ${className}`} {...props} />
}

