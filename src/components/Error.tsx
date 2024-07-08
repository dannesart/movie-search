export default function Error({
  title,
  message,
}: {
  title: string;
  message: string;
}) {
  return (
    <div className="p-3 rounded-xl bg-rose-50  flex flex-col gap-2">
      <h3 className="text-2xl font-bold text-rose-500">{title}</h3>
      <p className="text-rose-400">{message}</p>
    </div>
  );
}
