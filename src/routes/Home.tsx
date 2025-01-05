import { useEffect, useState } from "react"
import Card from "../components/Card";

interface Trailer {
    id: number,
    name: string,
    description: string,
    youtubeId: string,
    categories: string[]
}

interface ApiResponse {
    trailers: Trailer[];
}

export default function Home() {
  const [trailers, setTrailers] = useState<Trailer[] | null>(null);

  useEffect(() => {
    const fetchTrailers = async () => {
        const res = await fetch('https://api-trailerflix.vercel.app/trailers')
        const data: ApiResponse = await res.json()
        setTrailers(data.trailers)
    }
    
    fetchTrailers();
  }, []);

  return (
    <main className="home">
        <section className="cards">
          {trailers ? (
            trailers.map((trailer) => (
              <Card id={trailer.id} name={trailer.name} categories={trailer.categories} youtubeId={trailer.youtubeId} />
          ))
          ) : (
            <h1>Carregando...</h1>
          )}
        </section>
    </main>
  )
}
