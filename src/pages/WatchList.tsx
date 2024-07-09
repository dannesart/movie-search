import { useState } from "react";
import { Link } from "react-router-dom";
import Error from "../components/Error";
import Movie from "../components/Movie";

export default function WatchList() {
  const [list] = useState(() => {
    const watchList = Object.keys(localStorage)
      .filter((k) => k.startsWith("watch-"))
      .map((k) => ({
        k,
        id: k.replace("watch-", ""),
        v: JSON.parse(localStorage.getItem(k) as string),
      }));
    return watchList || [];
  });
  return (
    <div className="flex flex-col items-center justify-center gap-10">
      <h1 className="text-4xl">Watch list</h1>
      {!list.length && (
        <div className="w-full">
          <Error title="No titles in your list" message="Add some titles" />
        </div>
      )}
      <section className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {list.map((watch, idx) => (
          <Link to={"/details/" + watch.id} className="flex-1" key={idx}>
            <Movie id={watch.id} title={watch.v.title} image={watch.v.image} />
          </Link>
        ))}
      </section>
    </div>
  );
}
