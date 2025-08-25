import { Routes, Route } from 'react-router-dom';
import DraftPage from './pages/DraftPage';
import ProfilePage from './pages/ProfilePage';
import TripPage from './pages/TripPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<DraftPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/trip/:id" element={<TripPage />} />
    </Routes>
  );
}

export default App;
