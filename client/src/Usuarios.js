import Sidebar from "./components/Sidebar";
import Feed from "./components/FeedUser";
import { Box, createTheme, Stack, ThemeProvider } from "@mui/material";
import Navbar from "./components/Navbar";
import Error from './components/Error';
import { useState, useEffect } from "react";
import axios from 'axios';

axios.defaults.withCredentials = true;

function App() {

  const [nivel, setNivel] = useState(true);
  
  useEffect(() => {
    axios.get("/api/v1/login/").then((response) => {
      if (response.data.loggedIn === false) {
        window.location = "/login";
      } else 
      if (response.data.user[0].nivel === 1){
        setNivel(false)
         
      }
      else {
        setNivel(true)
   
      }
    });
  }
  , [nivel]);

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

        {nivel ? (
          <Error />
        ) : (
          
          <Feed />
        )}

        </Stack>
      </Box>
    </ThemeProvider>
  );
}

export default App;
