import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import Card from "../components/Card";
import MainTrailer from "../components/MainTrailer";
import { CircularProgress } from "@mui/material";
import { Trailer as TrailerType, useTrailers } from "../contexts/TrailerProvider";

export default function Trailer() {
  const allTrailers = useTrailers();
  const [trailers, setTrailers] = useState<TrailerType[] | null>(null);
  const params = useParams().id;
  const trailerId = params ? parseInt(params) : 0;
  const [trailer, setTrailer] = useState<TrailerType | null | undefined>(null);
  const [featuredTrailerId, setFeaturedTrailerId] = useState<number>(trailerId);

  useEffect(() => {
    if (allTrailers) {
      const filteredTrailers = allTrailers
        .filter((trailer: TrailerType) => trailer.id !== trailerId)
        .map((value: TrailerType) => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value);

      setTrailers(filteredTrailers);
      const foundTrailer = allTrailers.find((trailer: TrailerType) => trailer.id === trailerId);
      setTrailer(foundTrailer);
    }
  }, [trailerId, allTrailers]);

  const handleCardClick = (id: number) => {
    setFeaturedTrailerId(id);
  };

  return (
    <>
      {trailer && trailers ? (
        <main className="trailer">
          <MainTrailer 
            id={featuredTrailerId || trailer.id} 
            name={trailers.find((t: TrailerType) => t.id === featuredTrailerId)?.name || trailer.name} 
            description={trailers.find((t: TrailerType) => t.id === featuredTrailerId)?.description || trailer.description} 
            youtubeId={trailers.find((t: TrailerType) => t.id === featuredTrailerId)?.youtubeId || trailer.youtubeId} 
            categories={trailers.find((t: TrailerType) => t.id === featuredTrailerId)?.categories || trailer.categories} 
          />
          <section className="other_trailers">
            {trailers.map((trailer: TrailerType) => (
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
