import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import Card from "../components/Card";

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
        setTrailers(data.trailers)
        setTrailer(data.trailers.find((trailer: Trailers) => trailer.id === trailerId))
        console.log(trailer)
    }
    
    fetchTrailers();
  }, []);

  return (
    <main className="trailer">
      {trailer && trailers ? (
        <>
          <section className="main_trailer">
            <iframe width="560" height="315" src={`https://www.youtube.com/embed/${trailer.youtubeId}?si=l66iGm3XYwGtjHNK`} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
          </section>
          <section className="other_trailers">
            {trailers.map((trailer) => (
                          <Card id={trailer.id} name={trailer.name} categories={trailer.categories} youtubeId={trailer.youtubeId} />
            ))}
          </section>
        </>
      ) : (
        <h1>Carregando...</h1>
      )}
    </main>
  )
}
