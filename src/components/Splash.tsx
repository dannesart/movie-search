import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Loader from "./Loader";
import { Link } from "react-router-dom";
import Error from "../components/Error";
import Movie, { type TMovie } from "../components/Movie";

const useMovieQuery = () => {
  return useQuery({
    queryKey: ["popular"],
    queryFn: async () => {
      const { data } = await axios.get(
        "https://api.themoviedb.org/3/movie/popular?api_key=a9140565055d3ede92484414a8760660",
        {
          params: {
            include_adult: false,
          },
        }
      );
      return data;
    },
  });
};

export default function Splash() {
  const { data, isLoading, error } = useMovieQuery();
  if (isLoading)
    return (
      <div className="w-full flex items-center justify-center p-10">
        <Loader />
      </div>
    );
  if (error)
    return (
      <Error
        title="Error"
        message="Something went wrong. Please try again later"
      />
    );
  if (!data || !data.results || !data.results.length)
    return <Error title="No results" message="No movies could be found" />;
  const results = data.results;
  return (
    <div className="flex flex-col items-center justify-center gap-10">
      <h1 className="text-4xl">Welcome to My Movies</h1>
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {results.map((movie: TMovie, idx: number) => (
          <Link to={"/details/" + movie.id} className="flex-1" key={idx}>
            <Movie
              title={movie.title}
              image={movie.poster_path}
              id={movie.id}
            />
          </Link>
        ))}
      </section>
    </div>
  );
}
