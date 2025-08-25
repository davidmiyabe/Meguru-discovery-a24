import { type HTMLAttributes } from 'react'

interface SheetProps extends HTMLAttributes<HTMLDivElement> {
  open?: boolean
}

export function Sheet({ open = false, className = '', ...props }: SheetProps) {
  return (
    <div
      className={`fixed left-0 right-0 bottom-0 transform rounded-t-lg bg-night text-cream transition-transform transition-opacity duration-300 sm:p-6 ${
        open ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
      } ${className}`}
      {...props}
    />
  )
}

