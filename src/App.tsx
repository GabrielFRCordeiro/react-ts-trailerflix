import './styles/main.sass'
import { Outlet } from 'react-router-dom'
import Header from './components/Header'
import { TrailerProvider } from './contexts/TrailerProvider'

function App() {
  // const [searchItem, setSearchItem] = useState<string>('')
  // const [filteredUsers, setFilteredUsers] = useState<Trailer[]>([])
  // const [trailers, setTrailers] = useState<Trailer[] | null>(null);
  
  // useEffect(() => {
  //   const fetchTrailers = async () => {
  //       const res = await fetch('https://api-trailerflix.vercel.app/trailers')
  //       const data: ApiResponse = await res.json()
  //       setTrailers(data.trailers
  //         .map(value => ({ value, sort: Math.random() }))
  //         .sort((a, b) => a.sort - b.sort)
  //         .map(({ value }) => value)
  //       )
  //   }
    
  //   fetchTrailers();
  // }, []);

  // const handleInputChange = (e) => { 
  //   const searchTerm = e.target.value;
  //   setSearchItem(searchTerm)

  //   const filteredItems = trailers?.filter((trailer) =>
  //     trailer.name.toLowerCase().includes(searchTerm.toLowerCase())
  //   ) || [];

  //   setFilteredUsers(filteredItems);
  // }

  //  handleInputChange={handleInputChange}
  return (
    <TrailerProvider>
      <Header />
      <Outlet />
    </TrailerProvider>
  )
}

export default App
