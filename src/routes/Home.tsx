import { useEffect, useState } from "react"
import Card from "../components/Card";
import { CircularProgress } from "@mui/material";

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
        setTrailers(data.trailers
          .map(value => ({ value, sort: Math.random() }))
          .sort((a, b) => a.sort - b.sort)
          .map(({ value }) => value)
        )
    }
    
    fetchTrailers();
  }, []);

  return (
    <>
      {trailers ? (
        <main className="home">
          <section className="cards">
            {trailers.map((trailer) => (
              <Card id={trailer.id} name={trailer.name} categories={trailer.categories} youtubeId={trailer.youtubeId} />
            ))}
          </section>
        </main>
      ) : (
        <CircularProgress size={250} className="loading" />
      )}
    </>
  )
}
