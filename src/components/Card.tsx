import { Link } from 'react-router-dom'
import '../styles/components/card.sass'

interface Trailer {
    id: number,
    name: string,
    youtubeId: string,
    categories: string[]
}

export default function Card({id, name, categories, youtubeId}: Trailer) {
  return (
    <section key={id}>
        <Link to={`/trailers/${id}`}>
            <div className="thumbnail_container">
                <img src={`https://i.ytimg.com/vi/${youtubeId}/maxresdefault.jpg`} alt="" />
            </div>
            <h3 className='title'>{name}</h3>
        </Link>
        <p className='category'>{categories[0]}</p>
    </section>
  )
}
