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
}: {
  title: string;
  image: string;
}) {
  return (
    <article className=" border border-gray-200 rounded-xl  w-full h-92 hover:shadow-md transition-all hover:scale-105  cursor-pointer flex flex-col gap-3 relative overflow-hidden">
      <div className="absolute bottom-0 left-0 right-0 top-0 bg-black/60 flex items-end px-4 py-8">
        <h2 className="text-xl  text-white">{title}</h2>
      </div>
      <Image path={image} />
    </article>
  );
}
