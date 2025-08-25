import { FormEvent, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Card } from '../components/ui'
import { useTripCriteria } from '../stores/tripCriteria'
import { useCitySearch } from '../hooks/useCitySearch'

const companionOptions = ['Solo', 'Partner', 'Family', 'Friends']
const tasteOptions = ['Foodie', 'Art', 'Nature']

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
        className="w-full"
      />
      {open && suggestions.length > 0 && (
        <ul className="absolute z-10 mt-1 w-full max-h-40 overflow-auto rounded border border-border bg-cream shadow-md">
          {suggestions.map((s) => (
            <li
              key={s}
              onMouseDown={() => {
                onChange(s)
                setOpen(false)
              }}
              className="cursor-pointer p-2 hover:bg-gold/20"
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
    tasteProfile,
    toggleTaste,
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
      tasteProfile,
    }
    navigate('/discover', { state: criteria })
  }

  return (
    <Card elevated className="mx-auto max-w-md">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div>
        <label className="mb-1 block font-display text-gold">City</label>
        <CityAutocomplete value={city} onChange={setCity} />
      </div>

      <div className="flex items-center gap-4">
        <label className="flex items-center gap-1 font-display">
          <input
            type="radio"
            name="dateMode"
            value="range"
            checked={dateMode === 'range'}
            onChange={() => setDateMode('range')}
            className="accent-gold"
          />
          Exact dates
        </label>
        <label className="flex items-center gap-1 font-display">
          <input
            type="radio"
            name="dateMode"
            value="flex"
            checked={dateMode === 'flex'}
            onChange={() => setDateMode('flex')}
            className="accent-gold"
          />
          Month + nights
        </label>
      </div>

      {dateMode === 'range' ? (
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="mb-1 block font-display">Start date</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full"
            />
          </div>
          <div className="flex-1">
            <label className="mb-1 block font-display">End date</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full"
            />
          </div>
        </div>
      ) : (
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="mb-1 block font-display">Month</label>
            <input
              type="month"
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              className="w-full"
            />
          </div>
          <div className="flex-1">
            <label className="mb-1 block font-display">Nights</label>
            <input
              type="number"
              min={1}
              value={nights}
              onChange={(e) => setNights(Number(e.target.value))}
              className="w-full"
            />
          </div>
        </div>
      )}

      <div className="flex flex-wrap gap-2">
        {companionOptions.map((c) => (
          <label key={c} className="inline-flex cursor-pointer items-center gap-1 font-display text-sm">
            <input
              type="checkbox"
              checked={companions.includes(c)}
              onChange={() => toggleCompanion(c)}
              className="accent-gold"
            />
            {c}
          </label>
        ))}
      </div>

      <div className="flex flex-wrap gap-2">
        {tasteOptions.map((t) => (
          <label key={t} className="inline-flex cursor-pointer items-center gap-1 font-display text-sm">
            <input
              type="checkbox"
              checked={tasteProfile.includes(t)}
              onChange={() => toggleTaste(t)}
              className="accent-gold"
            />
            {t}
          </label>
        ))}
      </div>

      <Button type="submit" className="mt-2">
        Discover
      </Button>
      </form>
    </Card>
  )
}
