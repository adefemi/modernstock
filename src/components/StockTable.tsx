import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ApiResponse } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

type StockTableProps = {
  data: ApiResponse | null;
};

const StockTable: React.FC<StockTableProps> = ({ data }) => {
  return (
    <Card className="bg-gray-800 border-gray-700 col-span-3">
      <CardHeader>
        <CardTitle className="text-white">Recent Data</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow className="border-b border-gray-700">
              <TableHead className="text-gray-300">Time</TableHead>
              <TableHead className="text-gray-300">Open</TableHead>
              <TableHead className="text-gray-300">High</TableHead>
              <TableHead className="text-gray-300">Low</TableHead>
              <TableHead className="text-gray-300">Close</TableHead>
              <TableHead className="text-gray-300">Volume</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data && data["Time Series (5min)"] ? (
              Object.entries(data["Time Series (5min)"])
                .slice(0, 10)
                .map(([time, value]) => (
                  <TableRow key={time} className="border-b border-gray-700">
                    <TableCell className="text-gray-300">{time}</TableCell>
                    <TableCell className="text-gray-300">
                      {value["1. open"]}
                    </TableCell>
                    <TableCell className="text-gray-300">
                      {value["2. high"]}
                    </TableCell>
                    <TableCell className="text-gray-300">
                      {value["3. low"]}
                    </TableCell>
                    <TableCell className="text-gray-300">
                      {value["4. close"]}
                    </TableCell>
                    <TableCell className="text-gray-300">
                      {value["5. volume"]}
                    </TableCell>
                  </TableRow>
                ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center text-gray-300">
                  No data available
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default StockTable;
