import type { FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
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
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-4">
      <div>
        <label className="block mb-1">City</label>
        <input
          list="cities"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="border p-2"
        />
        <datalist id="cities">
          {cityOptions.map((c) => (
            <option key={c} value={c} />
          ))}
        </datalist>
      </div>

      <div>
        <label className="block mb-1">Start date</label>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="border p-2"
        />
      </div>

      <div>
        <label className="block mb-1">Nights</label>
        <input
          type="number"
          min={1}
          value={nights}
          onChange={(e) => setNights(Number(e.target.value))}
          className="border p-2"
        />
      </div>

      <div className="flex gap-2 flex-wrap">
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

      <button type="submit" className="bg-blue-500 text-white p-2 rounded">
        Discover
      </button>
    </form>
  )
}
