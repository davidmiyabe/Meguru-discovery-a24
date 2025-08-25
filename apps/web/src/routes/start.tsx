import type { FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../components/ui'
import { useTripCriteria } from '../stores/tripCriteria'

const cityOptions = ['Paris', 'Tokyo', 'New York', 'London']
const companionOptions = ['Solo', 'Partner', 'Family', 'Friends']

export default function Start() {
  const navigate = useNavigate()
  const {
    city,
    setCity,
    startDate,
    setStartDate,
    nights,
    setNights,
    companions,
    toggleCompanion,
  } = useTripCriteria()

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    const criteria = { city, startDate, nights, companions }
    navigate('/discover', { state: criteria })
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto flex max-w-md flex-col gap-4 p-4">
      <div>
        <label className="mb-1 block font-display text-gold">City</label>
        <input
          list="cities"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="w-full border border-slate bg-cream p-2"
        />
        <datalist id="cities">
          {cityOptions.map((c) => (
            <option key={c} value={c} />
          ))}
        </datalist>
      </div>

      <div>
        <label className="mb-1 block font-display text-gold">Start date</label>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="w-full border border-slate bg-cream p-2"
        />
      </div>

      <div>
        <label className="mb-1 block font-display text-gold">Nights</label>
        <input
          type="number"
          min={1}
          value={nights}
          onChange={(e) => setNights(Number(e.target.value))}
          className="w-full border border-slate bg-cream p-2"
        />
      </div>

      <div className="flex flex-wrap gap-2">
        {companionOptions.map((c) => (
          <label key={c} className="cursor-pointer">
            <input
              type="checkbox"
              checked={companions.includes(c)}
              onChange={() => toggleCompanion(c)}
              className="mr-1"
            />
            {c}
          </label>
        ))}
      </div>

      <Button type="submit" className="mt-2">
        Discover
      </Button>
    </form>
  )
}
