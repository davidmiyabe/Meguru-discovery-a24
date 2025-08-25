import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Draft from './routes/draft'
import Discover from './routes/discover'


function Home() {
  const [count, setCount] = useState(0)
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Discover />} />
        <Route path='/discover' element={<Discover />} />
      </Routes>
    </BrowserRouter>
  )
}
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/draft" element={<Draft />} />
      </Routes>
    </BrowserRouter>
  )
}
