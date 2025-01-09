import './styles/main.sass'
import { Outlet } from 'react-router-dom'
import Header from './components/Header'
import { TrailerProvider } from './contexts/TrailerProvider'
import { useState } from 'react'

function App() {
  const [filteredUsers, setFilteredUsers] = useState('')
  
  const handleInputChange = (e) => { 
    const searchTerm = e.target.value;
    setFilteredUsers(searchTerm);
  }

  return (
    <TrailerProvider filteredTrailers={filteredUsers}>
      <Header handleInputChange={handleInputChange} />
      <Outlet />
    </TrailerProvider>
  )
}

export default App
