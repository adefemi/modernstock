# ModernStock

ModernStock is a modern React-based stock tracker application that allows users to search for real-time stock information. The app fetches data from the Alpha Vantage API and presents it in a visually appealing, easy-to-use interface.

## Deployed
- Test app on https://modernstock.netlify.app/

## Features

- **Search Stock Symbols**: Users can search for stock symbols like AAPL (Apple), TSLA (Tesla), etc.
- **Real-Time Stock Data**: Uses Alpha Vantage API to retrieve the latest stock market information.
- **Interactive UI**: Provides users with stock content and a data table with modern UI components.

## Technologies Used

- **React**: JavaScript library for building user interfaces.
- **Axios**: HTTP client for making API requests.
- **SCSS**: Preprocessor for styling the application.
- **Alpha Vantage API**: Data provider for real-time stock information.
- **Typescript**: Static typing for better code quality and reliability.

## Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/adefemi/modernstock.git
   cd ModernStock
   ```

2. Install the dependencies:

   ```sh
   npm install
   ```

3. Create a .env file in the root directory and add your Alpha Vantage API key:

  ```sh
  REACT_APP_ALPHA_VANTAGE_API_KEY=YOUR_API_KEY
  ```

4. Start the application:

   ```sh
   npm start
   ```

   The application will run on `http://localhost:3000`.

## Usage

1. Visit the app at `http://localhost:3000` after starting it.
2. Use the search bar to look up stock information for companies like Apple (AAPL), Google (GOOGL), etc.
3. View the real-time (Could not create real-time polling due to API limitation) stock data and additional information presented on the screen.

## Project Structure

- `src/components` - Contains the React components used throughout the application.
- `src/lib/utils.ts` - Contains utility functions and TypeScript types such as `ApiResponse`.
- `src/App.tsx` - The main application component where state management and API integration are handled.

## Dependencies

- **axios**: For making HTTP requests to Alpha Vantage API.
- **react**: Core library for building UI.
- **typescript**: Provides type safety for JavaScript code.

## API Limitations

The application uses the Alpha Vantage API for fetching stock data. Please note that the API has a request limit, and you may need to replace the API key if it gets exhausted. You can register for a free API key at [Alpha Vantage](https://www.alphavantage.co/support/#api-key).


## Contact

For any questions or support, please contact:

- **Your Name** - [oseni.adefemigreat@gmail.com]
- GitHub - [@adefemi](https://github.com/adefemi)

Enjoy using ModernStock, and happy stock tracking!

