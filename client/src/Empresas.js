import Sidebar from "./components/Sidebar";
import Feed from "./components/FeedEmpresa";
import { Box, createTheme, Stack, ThemeProvider } from "@mui/material";
import Navbar from "./components/Navbar";
import { useState, useEffect } from "react";
import axios from 'axios';

axios.defaults.withCredentials = true;



function App() {
  useEffect(() => {
    axios.get("/api/v1/login/").then((response) => {
      if (response.data.loggedIn === false) {
        window.location = "/login";
      } else {
  
      }
    });
  }
  , []);
  const [mode, setMode] = useState("dark");

  const darkTheme = createTheme({
    palette: {
      mode: mode,
    },
  });


  return (
    
    <ThemeProvider theme={darkTheme}>
      <Box bgcolor={"background.default"} color={"text.primary"}>
      <Navbar />
        <Stack direction="row" spacing={2} justifyContent="space-between">
        <Sidebar setMode={setMode} mode={mode}/>
          <Feed />
        </Stack>
      </Box>
    </ThemeProvider>
  );
}

export default App;
