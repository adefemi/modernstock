import axios from "axios";
import { useEffect, useState } from "react";
import "./App.scss";
import { ApiResponse } from "./lib/utils";
import SearchBar from "./components/SearchBar";
import StockContent from "./components/StockContent";
import StockTable from "./components/StockTable";
import { Card, CardContent } from "./components/ui/card";

function App() {
  const [data, setData] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [symbol, setSymbol] = useState<string>("AAPL");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get<ApiResponse>(
          "https://www.alphavantage.co/query",
          {
            params: {
              function: "TIME_SERIES_INTRADAY",
              symbol: symbol,
              interval: "5min",
              apikey: "GIV4AZYIJXGCZL6C", // Change API when exhausted // Could store in ENV but not necessary
            },
          },
        );
        // check data exhaustion
        if (response.data.Information) {
          setError(response.data.Information);
        } else {
          setData(response.data);
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          setError("Error while fetching data: " + error.message);
        } else {
          setError("An unexpected error occurred");
        }
      }
      setLoading(false);
    };

    fetchData();
  }, [symbol]);

  const handleSearch = (newSymbol: string) => {
    setSymbol(newSymbol);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <header className="bg-gray-800 p-4 border-b border-gray-700">
        <div className="container mx-auto flex flex-col gap-4 md:flex-row justify-between items-center">
          <h1 className="text-2xl font-bold text-white">ModernStock</h1>
          <SearchBar symbol={symbol} onSearch={handleSearch} />
        </div>
      </header>

      <main className="container max-w-screen-xl mx-auto py-8 px-5">
        {loading ? (
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-6">
              <p className="text-center text-white">Loading...</p>
            </CardContent>
          </Card>
        ) : error ? (
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-6">
              <p className="text-red-400 text-center">{error}</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            <StockContent data={data} symbol={symbol} />
            <StockTable data={data} />
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
