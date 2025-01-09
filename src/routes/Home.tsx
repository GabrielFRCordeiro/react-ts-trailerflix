import Card from "../components/Card";
import { CircularProgress } from "@mui/material";
import { Trailer, useTrailers } from "../contexts/TrailerProvider";

export default function Home() {
  const trailers = useTrailers();

  return (
    <>
      {trailers ? (
        <main className="home">
          <section className="cards">
            {trailers.map((trailer: Trailer) => (
              <div key={trailer.id}>
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
