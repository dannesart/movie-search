import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Link, Route, Routes, useSearchParams } from "react-router-dom";
import SearchForm from "./components/SearchForm";
import Details from "./pages/Details";
import Start from "./pages/Start";

export default function App() {
  const queryClient = useQueryClient();
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("q");
  //   const { data, isLoading, error } = useQuery({
  //     queryKey: ["transactions"],
  //     queryFn: async () => {
  //       const { data } = await axios.get(
  //         "https://infra.devskills.app/api/accounting/transactions"
  //       );
  //       return data;
  //     },
  //   });

  //   const searchMutation = useMutation({
  //     mutationFn: async (transaction: { account_id: string; amount: number }) => {
  //       const { data } = await axios.post<>(
  //         "https://api.themoviedb.org/3/search/movie",
  //         {
  //           ...transaction,
  //         }
  //       );
  //       return data;
  //     },
  //   });

  const newSearch = async (value: string) => {
    if (value) {
      setSearchParams({
        q: value,
      });
    } else {
      setSearchParams({});
    }
    // const transaction = { amount, account_id };
    // transactionMutation.mutate(transaction);
    // // This should be inserted after the mutation is completed/successed. But then cypress fails.
    // queryClient.setQueryData(["transactions"], [transaction, ...(data || [])]);
  };

  return (
    <>
      <div className="flex flex-col gap-4 h-screen">
        <header className="flex gap-4 items-center border-b p-4">
          <Link to="/">
            <div className="text-2xl min-w-max text-gray-800">My Movies</div>
          </Link>
          <SearchForm
            defaultValue={query}
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
