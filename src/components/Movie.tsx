import { useState } from "react";
import { FaHeart } from "react-icons/fa";
import Image from "./Image";

export type TMovie = {
  title: string;
  overview: string;
  poster_path: string;
  id: string;
};

export default function Movie({
  title,
  image,
  id,
}: {
  title: string;
  image: string;
  id: string;
}) {
  const [inWatchList, setWatchList] = useState(() => {
    const localData = localStorage.getItem(`watch-${id}`);
    return localData ? JSON.parse(localData) : false;
  });

  const handleClickWatchList = (e: React.MouseEvent, toggle: boolean) => {
    e.preventDefault();
    e.stopPropagation();
    if (toggle) {
      localStorage.setItem(
        `watch-${id}`,
        JSON.stringify({
          title,
          image,
          id,
        })
      );
    } else {
      localStorage.removeItem(`watch-${id}`);
    }

    setWatchList(toggle);
  };
  return (
    <article className=" border border-gray-200 rounded-xl  w-full h-92 hover:shadow-md transition-all hover:scale-105  cursor-pointer flex flex-col gap-3 relative overflow-hidden">
      <div className="absolute bottom-0 left-0 right-0 top-0 bg-black/60 flex items-end px-4 py-8">
        <h2 className="text-xl  text-white">{title || "Missing title"}</h2>
      </div>
      <Image path={image} />
      <button
        onClick={(e) => handleClickWatchList(e, !inWatchList)}
        className={
          "bg-black/70 w-12 aspect-square flex items-center justify-center rounded-full absolute top-4 right-4 " +
          (inWatchList ? "text-rose-400" : "text-white")
        }
      >
        <FaHeart />
      </button>
    </article>
  );
}
