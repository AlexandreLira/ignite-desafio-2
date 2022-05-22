import { useEffect, useState } from "react";
// Components
import { Header } from "./Header";
import { MovieCard } from "./MovieCard";
// Services
import { api } from "../services/api";
// Styles
import '../styles/content.scss';

interface ContentProps {
  selectedGenreId: number
}

interface MovieProps {
  imdbID: string;
  Title: string;
  Poster: string;
  Ratings: Array<{
    Source: string;
    Value: string;
  }>;
  Runtime: string;
}

export interface GenreResponseProps {
  id: number;
  name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
  title: string;
}


export function Content({selectedGenreId}: ContentProps) {
  // Complete aqui
  const [movies, setMovies] = useState<MovieProps[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<GenreResponseProps>({} as GenreResponseProps);

  useEffect(() => {
    api.get<MovieProps[]>(`movies/?Genre_id=${selectedGenreId}`).then(response => {
      setMovies(response.data);
    });

    api.get<GenreResponseProps>(`genres/${selectedGenreId}`).then(response => {
      setSelectedGenre(response.data);
    })
  },[selectedGenreId])

  return (
    <div className="container">
        <Header title={selectedGenre.title}/>

        <main>
          <div className="movies-list">
            {movies.map(movie => (
              <MovieCard 
                key ={movie.imdbID} 
                title={movie.Title} 
                poster={movie.Poster} 
                runtime={movie.Runtime} 
                rating={movie.Ratings[0].Value}
              />
            ))}
          </div>
        </main>
      </div>
  )
}