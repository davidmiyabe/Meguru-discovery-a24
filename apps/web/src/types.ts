export interface EventItem {
  id: string
  title: string
  start: number
  end: number
  category: string
  position: { x: number; y: number }
  alternates?: EventItem[]
  suggested?: boolean
}
