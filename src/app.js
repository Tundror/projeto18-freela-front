import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage.js";
import { UserContextProvider } from "./contexts/userContext.js";
import TicketsPage from "./pages/TicketsPage.js";
import HotelsPage from "./pages/HotelsPage.js";
import TicketsIndividualPage from "./pages/TicketIndividualPage.js";
import HotelIndividualPage from "./pages/HotelIndividualPage.js";




function App() {

  return (

    <BrowserRouter>
      <UserContextProvider>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/tickets/:id" element={<TicketsPage />} />
          <Route path="/hotels/:id" element={<HotelsPage />} />
          <Route path="/tickets/selected/:id" element={<TicketsIndividualPage />} />
          <Route path="/hotels/selected/:id" element={<HotelIndividualPage />} />
        </Routes>
      </UserContextProvider>
    </BrowserRouter>
  );
}

export default App;
