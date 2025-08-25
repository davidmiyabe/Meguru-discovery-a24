import { type HTMLAttributes } from 'react'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  elevated?: boolean
}

export function Card({ elevated = false, className = '', ...props }: CardProps) {
  const base = elevated ? 'card--elevated' : 'card'
  return <div className={`${base} sm:p-6 ${className}`} {...props} />
}

