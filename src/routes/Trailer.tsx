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
  const [featuredTrailerId, setFeaturedTrailerId] = useState<number>(trailerId);

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
  }, [trailerId]);

  const handleCardClick = (id: number) => {
    setFeaturedTrailerId(id);
  };

  return (
    <>
      {trailer && trailers ? (
        <main className="trailer">
          <MainTrailer 
            id={featuredTrailerId || trailer.id} 
            name={trailers.find(t => t.id === featuredTrailerId)?.name || trailer.name} 
            description={trailers.find(t => t.id === featuredTrailerId)?.description || trailer.description} 
            youtubeId={trailers.find(t => t.id === featuredTrailerId)?.youtubeId || trailer.youtubeId} 
            categories={trailers.find(t => t.id === featuredTrailerId)?.categories || trailer.categories} 
          />
          <section className="other_trailers">
            {trailers.map((trailer) => (
                <div key={trailer.id} onClick={() => handleCardClick(trailer.id)}>
                  <Card 
                  id={trailer.id} 
                  name={trailer.name} 
                  categories={trailer.categories} 
                  youtubeId={trailer.youtubeId} 
                />
                </div>
            ))}
          </section>
        </main>
      ) : (
        <CircularProgress size={250} className="loading" />
      )}
    </>
  )
}
