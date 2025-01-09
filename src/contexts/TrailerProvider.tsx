import { createContext, ReactNode, useContext, useEffect, useState } from 'react';

const TrailerContext = createContext<Trailer[] | null>(null);

export const useTrailers = () => {
  return useContext(TrailerContext);
};

export interface Trailer {
    id: number,
    name: string,
    description: string,
    youtubeId: string,
    categories: string[]
}

interface ApiResponse {
    trailers: Trailer[];
}

interface TrailerProviderProps {
    children: ReactNode;
}
  
export const TrailerProvider: React.FC<TrailerProviderProps> = ({ children }) => {
  const [trailers, setTrailers] = useState<Trailer[] | null>(null);

  useEffect(() => {
    const fetchTrailers = async () => {
      const res = await fetch('https://api-trailerflix.vercel.app/trailers');
      const data: ApiResponse = await res.json();
      setTrailers(data.trailers
        .map((value: Trailer) => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value)
      );
    };

    fetchTrailers();
  }, []);

  return (
    <TrailerContext.Provider value={trailers}>
      {children}
    </TrailerContext.Provider>
  );
};