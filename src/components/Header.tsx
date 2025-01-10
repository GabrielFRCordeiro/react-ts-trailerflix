import '../styles/components/header.sass'
import logo from '../assets/img_logo.svg'
import { Link } from 'react-router-dom'

interface handleInputChange {
  handleInputChange: (e: any) => void;
  filteredTrailers: string;
}

export default function Header({ handleInputChange, filteredTrailers }: handleInputChange) {
  return (
    <section className="header">
        <Link to='/'>
          <img src={logo} alt="TrailerFlix logo" className='img_logo' />
          <h1>TrailerFlix</h1>
        </Link>
        <label htmlFor="t_field_search">
          <input 
            type="text" 
            name="t_field_search" 
            id="t_field_search" 
            placeholder='Search trailer...' 
            onChange={handleInputChange}
            value={filteredTrailers}
          />
          <i className="bi bi-search"></i>
        </label>
    </section>
  )
}
