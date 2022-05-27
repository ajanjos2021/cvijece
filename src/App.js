import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/header";
import AuthContextProvider from "./contexts/authContext";
import ErrorPage from "./pages/errorPage";
import FavoritesPage from "./pages/favoritesPage";
import FlowersDetailPage from "./pages/flowerDetailPage";
import HomePage from "./pages/homePage";

function App() {
  return (
    <AuthContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/flower/:id" element={<FlowersDetailPage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="/error" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    </AuthContextProvider>
  );
}

export default App;
