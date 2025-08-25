import { useRef } from 'react'

export function useLongPress(callback: () => void, ms = 500) {
  const timer = useRef<number | undefined>(undefined)

  const start = () => {
    timer.current = window.setTimeout(callback, ms)
  }

  const clear = () => {
    if (timer.current !== undefined) {
      clearTimeout(timer.current)
      timer.current = undefined
    }
  }

  return {
    onPointerDown: start,
    onPointerUp: clear,
    onPointerLeave: clear,
  }
}
