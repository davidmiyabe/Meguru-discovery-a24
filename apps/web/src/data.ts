import type { EventItem } from './lib/types'

const breakfastAlt: EventItem = {
  id: 'alt-breakfast',
  title: 'Brunch',
  start: 9 * 60,
  end: 10 * 60,
  category: 'food',
  position: { x: 60, y: 40 },
  suggested: true,
}

const museumAlt: EventItem = {
  id: 'alt-museum',
  title: 'Gallery',
  start: 11 * 60,
  end: 12 * 60,
  category: 'culture',
  position: { x: 140, y: 60 },
  suggested: true,
}

export const initialEvents: EventItem[] = [
  {
    id: 'breakfast',
    title: 'Breakfast',
    start: 9 * 60,
    end: 10 * 60,
    category: 'food',
    position: { x: 40, y: 40 },
    alternates: [breakfastAlt],
  },
  {
    id: 'museum',
    title: 'Museum',
    start: 11 * 60,
    end: 12 * 60,
    category: 'culture',
    position: { x: 120, y: 80 },
    alternates: [museumAlt],
  },
]

export const suggestionEvents: EventItem[] = [
  {
    id: 'park',
    title: 'Park',
    start: 13 * 60,
    end: 14 * 60,
    category: 'outdoor',
    position: { x: 200, y: 120 },
    suggested: true,
  },
  breakfastAlt,
  museumAlt,
]
