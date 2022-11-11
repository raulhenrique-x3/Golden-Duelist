import "./App.css";
import Header from "./Components/Header/Header";
import { ChakraProvider } from "@chakra-ui/react";
import { Section01 } from "./Components/Carousel/Section01";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import { Cart } from "./Pages/Cart/Cart";
import { LoginPage } from "./Pages/Login/LoginPage";
import { CardSearch } from "./Pages/CardSearch/CardSearch";
import { SearchedCard } from "./Pages/SearchedCard/SearchedCard";

function App() {
  return (
    <ChakraProvider>
      <div className="App">
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<Section01 />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/loginPage" element={<LoginPage />} />
            <Route path="/cardSearch/:cardName" element={<CardSearch />} />
            <Route path="/searchedCard/:cardName" element={<SearchedCard />} />
          </Routes>
        </BrowserRouter>
      </div>
    </ChakraProvider>
  );
}

export default App;
