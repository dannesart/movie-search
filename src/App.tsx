import { FaFilm, FaHeart } from "react-icons/fa";
import {
  createSearchParams,
  Link,
  Route,
  Routes,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import SearchForm from "./components/SearchForm";
import Details from "./pages/Details";
import Start from "./pages/Start";
import WatchList from "./pages/WatchList";

export default function App() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const query = searchParams.get("q");

  const newSearch = async (value: string) => {
    navigate({
      pathname: "",
      search: createSearchParams({
        q: value,
      }).toString(),
    });
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
          <div className="max-w-[700px] w-full mx-auto">
            <SearchForm
              defaultValue={query as string}
              onSubmit={newSearch}
              onClear={() => newSearch("")}
            />
          </div>
          <Link
            to="/watchlist"
            className="flex items-center gap-4 bg-rose-300 p-4 px-6 rounded-lg text-white"
          >
            <span className="hidden md:block">Watch list</span>
            <FaHeart />
            {/* <div className="w-14 aspect-square bg-rose-400 flex-none text-white rounded-full flex justify-center items-center">
              <FaHeart />
            </div> */}
          </Link>
        </header>
        <main className="p-4 flex flex-col gap-4">
          <Routes>
            <Route path="/" element={<Start />} />
            <Route path="/details/:id" element={<Details />} />
            <Route path="/watchlist" element={<WatchList />} />
          </Routes>
        </main>
      </div>
    </>
  );
}
