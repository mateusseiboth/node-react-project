import Sidebar from "./components/Sidebar";
import Feed from "./components/FeedLogin";
import { Box, createTheme, Stack, ThemeProvider } from "@mui/material";
import Navbar from "./components/Navbar";
import { useState, useEffect } from "react";
import axios from 'axios';

function App() {
  useEffect(() => {
    axios.get(" /api/v1/logout/").then(function(response){
      if (response.data.loggedIn === false) {
        window.location = "/login";
      }
    })
}, []) 

  const darkTheme = createTheme({
    palette: {
    },
  });
  return (
    
    <ThemeProvider theme={darkTheme}>
      
    </ThemeProvider>
  );
}

export default App;
