import { useLocation } from 'react-router-dom'

export default function Discover() {
  const { state } = useLocation() as { state: unknown }
  return (
    <pre className="p-4">{JSON.stringify(state, null, 2)}</pre>
  )
}
