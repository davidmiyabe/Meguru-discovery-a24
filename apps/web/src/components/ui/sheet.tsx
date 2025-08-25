import { type HTMLAttributes } from 'react'

interface SheetProps extends HTMLAttributes<HTMLDivElement> {
  open?: boolean
}

export function Sheet({ open = false, className = '', ...props }: SheetProps) {
  return (
    <div
      className={`fixed left-0 right-0 bottom-0 transform rounded-t-lg bg-cream transition-transform duration-300 ease-in-out sm:p-6 ${
        open ? 'translate-y-0' : 'translate-y-full'
      } ${className}`}
      {...props}
    />
  )
}

