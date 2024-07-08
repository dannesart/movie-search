export type TMovie = {
  title: string;
  overview: string;
  poster_path: string;
};

export default function Movie({
  title,
  image,
}: {
  title: string;
  image: string;
}) {
  const fullImage = "https://image.tmdb.org/t/p/original/" + image;
  return (
    <article className="p-4 border border-gray-200 rounded-xl  w-full h-92 hover:shadow-md cursor-pointer flex flex-col gap-3">
      <h2 className="text-xl h-20">{title}</h2>
      {image ? (
        <img
          src={fullImage}
          className="w-full aspect-square object-cover rounded-lg"
        />
      ) : (
        <div className="w-full aspect-square object-cover bg-gray-100 rounded-lg"></div>
      )}
    </article>
  );
}
