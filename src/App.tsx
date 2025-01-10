import './styles/main.sass'
import { Outlet, useLocation } from 'react-router-dom'
import Header from './components/Header'
import { TrailerProvider } from './contexts/TrailerProvider'
import { useEffect, useState } from 'react'

function App() {
  const [filteredTrailers, setFilteredTrailers] = useState('')
  const location = useLocation();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => { 
    const searchTerm = e.target.value;
    setFilteredTrailers(searchTerm);
  }

  useEffect(() => {
    setFilteredTrailers('');
  }, [location]);

  return (
    <TrailerProvider filteredTrailers={filteredTrailers}>
      <Header handleInputChange={handleInputChange} filteredTrailers={filteredTrailers} />
      <Outlet />
    </TrailerProvider>
  )
}

export default App
