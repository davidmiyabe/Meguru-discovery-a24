import { type ButtonHTMLAttributes } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'ghost'
}

export function Button({ variant = 'primary', className = '', ...props }: ButtonProps) {
  const base = 'inline-flex items-center justify-center rounded font-medium transition-colors'
  const variantStyles = {
    primary: 'bg-forest text-cream hover:bg-gold',
    outline: 'border border-slate text-night hover:bg-slate/10',
    ghost: 'text-night hover:bg-slate/10',
  }[variant]

  return (
    <button
      className={`${base} ${variantStyles} px-4 py-2 sm:px-6 sm:py-3 ${className}`}
      {...props}
    />
  )
}

