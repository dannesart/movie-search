export default function Image({ path }: { path: string }) {
  const fullImage = "https://image.tmdb.org/t/p/original/" + path;
  return path ? (
    <img
      src={fullImage}
      className="w-full aspect-square object-cover rounded-lg bg-center"
    />
  ) : (
    <div className="w-full aspect-square object-cover bg-gray-100 rounded-lg"></div>
  );
}
