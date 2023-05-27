import { useEffect, useState, useContext, createContext } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage.js";
import { UserContextProvider } from "./contexts/userContext.js";




function App() {

  return (

    <BrowserRouter>
      <UserContextProvider>
        <Routes>
          <Route path="/" element={<MainPage />} />
        </Routes>
      </UserContextProvider>
    </BrowserRouter>
  );
}

export default App;
