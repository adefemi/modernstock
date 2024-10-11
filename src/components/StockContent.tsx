import { ApiResponse } from "@/lib/utils";
import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { BarChart2, DollarSign, TrendingDown, TrendingUp } from "lucide-react";

type StockChartProps = {
  data: ApiResponse | null;
  symbol: string;
};

const StockContent: React.FC<StockChartProps> = ({ data, symbol }) => {
  const chartData =
    data && data["Time Series (5min)"]
      ? Object.entries(data["Time Series (5min)"])
          .slice(0, 20)
          .map(([time, value]) => ({
            time,
            close: parseFloat(value["4. close"]),
          }))
          .reverse()
      : [];

  const getLastPrice = () => {
    if (data) {
      const lastTime = Object.keys(data["Time Series (5min)"])[
        Object.keys(data["Time Series (5min)"]).length - 1
      ];
      return parseFloat(
        data["Time Series (5min)"][lastTime]["4. close"],
      ).toFixed(2);
    }
    return "N/A";
  };

  const getPercentChange = (): string => {
    if (data) {
      const timeSeries = data["Time Series (5min)"];
      const lastTimes = Object.keys(timeSeries);
      if (lastTimes.length > 0) {
        const lastTime = lastTimes.at(-1);
        if (lastTime) {
          const lastEntry = timeSeries[lastTime];
          const open = parseFloat(lastEntry["1. open"]);
          const close = parseFloat(lastEntry["4. close"]);
          return (((close - open) / open) * 100).toFixed(2);
        }
      }
    }
    return "0";
  };

  const isUp = parseFloat(getPercentChange()) > 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card className="bg-gray-800 border-gray-700 md:col-span-2">
        <CardHeader>
          <CardTitle className="text-white">{symbol} Stock Price</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <XAxis dataKey="time" stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" />
              <Tooltip
                contentStyle={{ backgroundColor: "#1F2937", border: "none", color: "white" }}
              />
              <Line
                type="monotone"
                dataKey="close"
                stroke="#60A5FA"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="space-y-6">
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Market Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between text-gray-100">
              <div className="flex items-center">
                {isUp ? (
                  <TrendingUp className="h-6 w-6 text-green-400" />
                ) : (
                  <TrendingDown className="h-6 w-6 text-red-400" />
                )}
                <span className="ml-1">Market is Up</span>
              </div>
              <span
                className={isUp ? "text-green-400" : "text-red-400"}
              >
                {getPercentChange()}%
              </span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Latest Price</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between text-gray-100">
              <DollarSign className="h-6 w-6" />
              <span className="text-2xl font-bold">{getLastPrice()}</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Volume</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between text-gray-100">
              <BarChart2 className="h-6 w-6" />
              <span className="text-2xl font-bold">
                {data && data["Time Series (5min)"]
                  ? Object.values(data["Time Series (5min)"])[0]["5. volume"]
                  : "N/A"}
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StockContent;
