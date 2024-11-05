import * as React from 'react';
import Homepage from "./Pages/Homepage";
import "./App.css";
import { BrowserRouter as  Router, Route,Routes } from "react-router-dom";
import Header from "./Components/Header";
import CoinPage from "./Pages/CoinPage";
import { Box } from "@mui/system";
import Aalert from "./Components/Aalert";


function App() {

  return (
    <Router>
      <Box 
        component='div'
        sx={{
          backgroundColor: "#14161a",
          color: "white",
          minHeight: "100vh",
        }} >
      <Header />
      <Routes>
        <Route path="/" element={<Homepage />}  />
        <Route path="/coins/:id" element={<CoinPage />}  />
        {/* <Route path="*" element={<Homepage />} /> */}
      </Routes>
      </Box>
      <Aalert/>
    </Router>
  );
}

export default App;
