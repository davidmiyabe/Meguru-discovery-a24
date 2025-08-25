import { FormEvent, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../components/ui'
import { useTripCriteria } from '../stores/tripCriteria'
import { useCitySearch } from '../hooks/useCitySearch'

const companionOptions = ['Solo', 'Partner', 'Family', 'Friends']

function CityAutocomplete({
  value,
  onChange,
}: {
  value: string
  onChange: (v: string) => void
}) {
  const [open, setOpen] = useState(false)
  const { data: suggestions = [] } = useCitySearch(value)

  useEffect(() => {
    if (value.length < 2) {
      setOpen(false)
    }
  }, [value])

  return (
    <div className="relative">
      <input
        value={value}
        onChange={(e) => {
          onChange(e.target.value)
          setOpen(true)
        }}
        className="border p-2 w-full"
      />
      {open && suggestions.length > 0 && (
        <ul className="absolute z-10 w-full bg-white border max-h-40 overflow-auto">
          {suggestions.map((s) => (
            <li
              key={s}
              onMouseDown={() => {
                onChange(s)
                setOpen(false)
              }}
              className="p-2 cursor-pointer hover:bg-gray-100"
            >
              {s}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default function Start() {
  const navigate = useNavigate()
  const {
    city,
    setCity,
    dateMode,
    setDateMode,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    month,
    setMonth,
    nights,
    setNights,
    companions,
    toggleCompanion,
  } = useTripCriteria()

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    const errors: string[] = []
    if (!city) errors.push('City is required')
    if (dateMode === 'range') {
      if (!startDate || !endDate) {
        errors.push('Start and end dates are required')
      } else if (new Date(startDate) > new Date(endDate)) {
        errors.push('End date must be after start date')
      }
    } else {
      if (!month) errors.push('Month is required')
      if (nights < 1) errors.push('Nights must be at least 1')
    }
    if (errors.length) {
      alert(errors.join('\n'))
      return
    }
    const criteria = {
      city,
      dateMode,
      startDate,
      endDate,
      month,
      nights,
      companions,
    }
    navigate('/discover', { state: criteria })
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto flex max-w-md flex-col gap-4 p-4"
    >
      <div>
        <label className="mb-1 block font-display text-gold">City</label>
        <CityAutocomplete value={city} onChange={setCity} />
      </div>

      <div className="flex gap-4 items-center">
        <label className="flex items-center gap-1">
          <input
            type="radio"
            name="dateMode"
            value="range"
            checked={dateMode === 'range'}
            onChange={() => setDateMode('range')}
          />
          Exact dates
        </label>
        <label className="flex items-center gap-1">
          <input
            type="radio"
            name="dateMode"
            value="flex"
            checked={dateMode === 'flex'}
            onChange={() => setDateMode('flex')}
          />
          Month + nights
        </label>
      </div>

      {dateMode === 'range' ? (
        <div className="flex gap-4">
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
            <label className="block mb-1">End date</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="border p-2"
            />
          </div>
        </div>
      ) : (
        <div className="flex gap-4">
          <div>
            <label className="block mb-1">Month</label>
            <input
              type="month"
              value={month}
              onChange={(e) => setMonth(e.target.value)}
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
        </div>
      )}

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
