import '../styles/components/header.sass'
import logo from '../assets/img_logo.svg'

export default function Header() {
  return (
    <section className="header">
        <img src={logo} alt="TrailerFlix logo" className='img_logo' />
        <label htmlFor="t_field_search">
          <input type="text" name="t_field_search" id="t_field_search" placeholder='Search trailer...' />
          <i className="bi bi-search"></i>
        </label>
    </section>
  )
}
