import * as ReactDOM from "react-dom/client";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import LandingPage from "./Pages/LandingPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import GlobalScorePage from "./Pages/GlobalScorePage";
import ScorerStatsPage from "./Pages/ScorerStatsPage";
const client = new ApolloClient({
  uri: "http://localhost:4000",
  cache: new InMemoryCache(),
});

// Supported in React 18+
const root = ReactDOM.createRoot(document.getElementById("root")!);

root.render(
  <ApolloProvider client={client}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/globalScore" element={<GlobalScorePage />} />
        <Route path="/scorerStats" element={<ScorerStatsPage />} />
      </Routes>
    </BrowserRouter>
  </ApolloProvider>
);
