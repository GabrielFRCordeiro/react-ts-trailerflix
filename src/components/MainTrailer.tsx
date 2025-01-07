import '../styles/components/maintrailer.sass'

interface Trailer {
    id: number,
    name: string,
    description: string,
    youtubeId: string,
    categories: string[]
}

export default function MainTrailer({id, name, youtubeId, description, categories}: Trailer) {
  return (
    <section className="main_trailer" key={id}>
        <iframe width="560" height="315" src={`https://www.youtube.com/embed/${youtubeId}?si=l66iGm3XYwGtjHNK`} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
        <div className="trailer_details">
          <h1 className="title">{name}</h1>
          <p className="description">{description}</p>
          <div className="categories">
              {categories.map((category) => (
              <p><span>{category}</span></p>
              ))}
          </div>
        </div>
    </section>
  )
}
