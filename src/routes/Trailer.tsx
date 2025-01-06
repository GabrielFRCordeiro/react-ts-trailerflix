import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import Card from "../components/Card";
import MainTrailer from "../components/MainTrailer";
import { CircularProgress } from "@mui/material";

interface Trailers {
    id: number,
    name: string,
    description: string,
    youtubeId: string,
    categories: string[]
}

interface ApiResponse {
    trailers: Trailers[];
}

export default function Trailer() {
  const params = useParams().id;
  const trailerId = params ? parseInt(params) : 0;
  const [trailer, setTrailer] = useState<Trailers | null | undefined>(null);
  const [trailers, setTrailers] = useState<Trailers[] | null | undefined>(null);

  useEffect(() => {
    const fetchTrailers = async () => {
        const res = await fetch(`https://api-trailerflix.vercel.app/trailers`)
        const data: ApiResponse = await res.json()
        setTrailers(data.trailers
          .filter((trailer) => trailer.id !== trailerId)
          .map(value => ({ value, sort: Math.random() }))
          .sort((a, b) => a.sort - b.sort)
          .map(({ value }) => value)
        )
        setTrailer(data.trailers.find((trailer: Trailers) => trailer.id === trailerId))
    }
    
    fetchTrailers();
  }, []);

  return (
    <>
      {trailer && trailers ? (
        <main className="trailer">
          <MainTrailer id={trailer.id} name={trailer.name} description={trailer.description} youtubeId={trailer.youtubeId} categories={trailer.categories} />
          <section className="other_trailers">
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
