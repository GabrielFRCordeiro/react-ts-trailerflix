import './styles/main.sass'
import { Outlet } from 'react-router-dom'
import Header from './components/Header'
import { TrailerProvider } from './contexts/TrailerProvider'
import { useState } from 'react'

function App() {
  const [filteredTrailers, setFilteredTrailers] = useState('')

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => { 
    const searchTerm = e.target.value;
    setFilteredTrailers(searchTerm);
  }

  return (
    <TrailerProvider filteredTrailers={filteredTrailers}>
      <Header handleInputChange={handleInputChange} />
      <Outlet />
    </TrailerProvider>
  )
}

export default App
