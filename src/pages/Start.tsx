import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Error from "../components/Error";
import Loader from "../components/Loader";
import Movie, { type TMovie } from "../components/Movie";
import Splash from "../components/Splash";

export default function Start() {
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
            include_adult: false,
          },
        }
      );
      return data;
    },
  });

  if (isLoading) return <Loader />;
  if (error)
    return (
      <Error
        title="Error"
        message="Something went wrong. Please try again later"
      />
    );

  if (!query) return <Splash />;
  if ((!data || !data.results || !data.results.length) && query)
    return <Error title="No results" message="No results could be found" />;

  const results = data.results;
  const total = data.total_results;
  return (
    query &&
    results &&
    !isLoading && (
      <>
        <h1 className="bg-gray-50 p-3 rounded-lg">
          Search result for <span className="font-bold underline">{query}</span>{" "}
          with a total of <span className="font-bold underline">{total}</span>{" "}
          results
        </h1>
        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {results.map((movie: TMovie, idx: number) => (
            <Link to={"/details/" + movie.id} className="flex-1" key={idx}>
              <Movie title={movie.title} image={movie.poster_path} />
            </Link>
          ))}
        </section>
      </>
    )
  );
}
