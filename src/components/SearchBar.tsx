import React from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from 'lucide-react';

type SearchBarProps = {
  symbol: string;
  onSearch: (symbol: string) => void;
};

const SearchBar: React.FC<SearchBarProps> = ({ symbol, onSearch }) => {
  const [inputValue, setInputValue] = React.useState(symbol);

  return (
    <div className="flex items-center space-x-2">
      <Input
        type="text"
        placeholder="Enter stock symbol"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        className="bg-gray-700 text-white placeholder-gray-400 border-gray-600"
      />
      <Button
        variant="secondary"
        className="bg-blue-600 text-white hover:bg-blue-700"
        onClick={() => onSearch(inputValue)}
      >
        <Search className="mr-2 h-4 w-4" /> Search
      </Button>
    </div>
  );
};

export default SearchBar;