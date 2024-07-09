import { FaFilm } from "react-icons/fa";
import { Link, Route, Routes, useSearchParams } from "react-router-dom";
import SearchForm from "./components/SearchForm";
import Details from "./pages/Details";
import Start from "./pages/Start";

export default function App() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("q");

  const newSearch = async (value: string) => {
    if (value) {
      setSearchParams({
        q: value,
      });
    } else {
      setSearchParams({});
    }
  };

  return (
    <>
      <div className="flex flex-col gap-4 h-screen ">
        <header className="flex gap-4 items-center border-b p-4 sticky top-0 bg-white z-50">
          <Link to="/">
            <div className="text-2xl min-w-max text-gray-800 flex gap-2 items-center font-black">
              <FaFilm />
              MM
            </div>
          </Link>
          <SearchForm
            defaultValue={query as string}
            onSubmit={newSearch}
            onClear={() => newSearch("")}
          />
        </header>
        <main className="p-4 flex flex-col gap-4">
          <Routes>
            <Route path="/" element={<Start />} />
            <Route path="/details/:id" element={<Details />} />
          </Routes>
        </main>
      </div>
    </>
  );
}
