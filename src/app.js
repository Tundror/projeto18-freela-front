import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage.js";
import { UserContextProvider } from "./contexts/userContext.js";
import TicketsPage from "./pages/TicketsPage.js";
import HotelsPage from "./pages/HotelsPage.js";




function App() {

  return (

    <BrowserRouter>
      <UserContextProvider>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/tickets/:id" element={<TicketsPage />} />
          <Route path="/hotels/:id" element={<HotelsPage />} />
        </Routes>
      </UserContextProvider>
    </BrowserRouter>
  );
}

export default App;
