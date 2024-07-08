import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Movie, { type TMovie } from "../components/Movie";

export default function Start() {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q");

  const { data, isLoading, error } = useQuery({
    queryKey: ["search", query],
    queryFn: async () => {
      const { data } = await axios.get(
        "https://api.themoviedb.org/3/search/movie?api_key=a9140565055d3ede92484414a8760660",
        {
          params: {
            query,
          },
        }
      );
      return data;
    },
  });

  if (isLoading) return <div>Loading ...</div>;
  if (error) return <div>Error</div>;
  if ((!data || !data.results || !data.results.length) && query)
    return <p>Empty</p>;
  if (!query) return <p>Welcome to My Movies</p>;
  const results = data.results;
  const total = data.total_results;
  return (
    query &&
    results &&
    !isLoading && (
      <>
        <h1>
          Search result for <span className="font-bold underline">{query}</span>{" "}
          with a total of <span className="font-bold underline">{total}</span>{" "}
          results
        </h1>
        <section className="grid grid-cols-5 gap-4">
          {results.map((movie: TMovie) => (
            <Link to={"/details/472384"} className="flex-1">
              <Movie title={movie.title} image={movie.poster_path} />
            </Link>
          ))}
        </section>
      </>
    )
  );
}
