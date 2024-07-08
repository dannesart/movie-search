import { useNavigate, useParams } from "react-router-dom";
import { FaAngleLeft } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Loader from "../components/Loader";
import Error from "../components/Error";
import Image from "../components/Image";

export default function Details() {
  const navigate = useNavigate();
  const { id } = useParams();

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
  const { poster_path, backdrop_path, title, overview, vote_average } = data;
  return (
    <div className="flex flex-col gap-10">
      <div className="absolute top-0 left-0 right-0 h-[700px]  overflow-hidden">
        <div className="bg-black/60 absolute inset-0"></div>
        <Image path={backdrop_path} />
      </div>
      <button
        onClick={() => navigate(-1)}
        className="flex gap-4 items-center relative z-20 text-white"
      >
        <div className="w-12 aspect-square rounded-full bg-rose-50 text-rose-900 flex items-center justify-center">
          <FaAngleLeft />
        </div>
        Go back
      </button>
      <div className="flex gap-10 max-w-[1000px] mx-auto relative z-20">
        <div className="w-96">
          <Image path={poster_path} />
        </div>
        <div className="flex flex-col gap-4 text-white">
          <h1 className="text-4xl">{title}</h1>
          <p>
            <span className="text-gray-100">R:</span>{" "}
            <span className="font-black">{vote_average} / 10</span>
          </p>
          <p className="max-w-[600px]">{overview}</p>
        </div>
      </div>
    </div>
  );
}
