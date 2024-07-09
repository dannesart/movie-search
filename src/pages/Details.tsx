import { useNavigate, useParams } from "react-router-dom";
import { FaAngleLeft, FaStar } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Loader from "../components/Loader";
import Error from "../components/Error";
import Image from "../components/Image";
import Movie from "../components/Movie";
import { useState } from "react";

export default function Details() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [inWatchList, setWatchList] = useState(() => {
    const localData = localStorage.getItem(`watch-${id}`);
    return localData ? JSON.parse(localData) : false;
  });

  const toDollars = (amount: number) => {
    return amount.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
  };

  const handleClickWatchList = (toggle: boolean) => {
    localStorage.setItem(`watch-${id}`, toggle.toString());
    setWatchList(toggle);
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ["details", id],
    queryFn: async () => {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/movie/${id}?api_key=a9140565055d3ede92484414a8760660`
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
  const {
    poster_path,
    backdrop_path,
    title,
    overview,
    vote_average,
    genres,
    belongs_to_collection,
    status,
    revenue,
    release_date,
    budget,
  } = data;
  return (
    <div className="flex flex-col gap-10">
      <div className="absolute top-0 left-0 right-0 h-96 md:h-[700px]  overflow-hidden">
        <div className="bg-black/60 absolute inset-0"></div>
        <Image path={backdrop_path} />
      </div>
      <button
        onClick={() => navigate(-1)}
        className="flex gap-4 items-center relative  text-white bg-black/70 w-12 justify-center aspect-square rounded-lg"
      >
        <FaAngleLeft />
      </button>
      <div className="flex flex-col md:flex-row gap-10 max-w-[1000px] mx-auto relative z-20">
        <div className="w-60 md:w-96 mx-auto">
          <Image path={poster_path} />
        </div>
        <div className="flex flex-col gap-4 md:text-white">
          <h1 className="text-4xl">{title}</h1>
          <p className="flex gap-2 items-center">
            <FaStar />{" "}
            <span className="font-black">{vote_average.toFixed(1)} / 10</span>
          </p>
          <p>{genres.map((g: { name: string }) => g.name).join(", ")}</p>
          <p className="max-w-[600px]">{overview}</p>
          <button
            className="bg-rose-300 rounded-lg p-4 w-full md:max-w-fit"
            onClick={() => handleClickWatchList(!inWatchList)}
          >
            {inWatchList ? "Remove from watchlist" : "Add to watchlist"}
          </button>
        </div>
      </div>
      <div className="bg-white shadow-lg p-4 py-6 flex flex-col gap-6 w-full max-w-[1000px] min-h-96 mx-auto relative z-20 rounded-xl">
        <h3 className="text-3xl">More information</h3>
        <table>
          <tbody>
            <tr className="bg-gray-50">
              <td className="p-3">Status</td>
              <td className="p-3">{status}</td>
            </tr>
            <tr>
              <td className="p-3">Revenue</td>
              <td className="p-3">{toDollars(revenue)}</td>
            </tr>
            <tr className="bg-gray-50">
              <td className="p-3">Release date</td>
              <td className="p-3">{release_date}</td>
            </tr>
            <tr>
              <td className="p-3">Budget</td>
              <td className="p-3">{toDollars(budget)}</td>
            </tr>
          </tbody>
        </table>
        {belongs_to_collection && (
          <>
            <h3 className="text-3xl">Belongs to</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              <Movie
                title={belongs_to_collection.title}
                image={belongs_to_collection.poster_path}
                id={belongs_to_collection.id}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
