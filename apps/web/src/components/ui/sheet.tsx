import { type HTMLAttributes } from 'react'

interface SheetProps extends HTMLAttributes<HTMLDivElement> {
  open?: boolean
}

export function Sheet({ open = false, className = '', ...props }: SheetProps) {
  return (
    <div
      className={`sheet transform sm:p-6 ${open ? 'translate-y-0' : 'translate-y-full'} ${className}`}
      {...props}
    />
  )
}

