import { useEffect, useState } from "react"

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
    <div>
        {trailers ? (
          trailers.map((trailer) => (
            <p key={trailer.id}>{trailer.name}</p>
        ))
        ) : (
          <p>Carregando...</p>
        )}
    </div>
  )
}
