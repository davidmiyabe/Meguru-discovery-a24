import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Discover from './routes/discover'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Discover />} />
        <Route path='/discover' element={<Discover />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
