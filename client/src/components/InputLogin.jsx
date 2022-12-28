import {
  Card,
  CardActions,
  CardContent,
  Typography,
  Box,
  TextField,
  Button,
} from "@mui/material";
import axios from 'axios';
import React, { useState } from "react";

const Post = () => {
  const [username, setUsername] = useState('');
  const [senha, setSenha] = useState('');

  const submitLogin = () => {

    axios.post("/api/v1/login", 
    {
      
      "username": username,
      "senha": senha,
    }).then(()=> {
        window.location = "/";
      })

  }

  //cria a página
  return (
    <Card sx={{ margin: 1 }}>
      <CardContent align="center">
        <Typography align="center" variant="h3" gutterBottom>
          Por favor faça login para acessar o sistema
        </Typography>
        <Box

          sx={{
            width: 500,
            maxWidth: '100%',
          }}
        >
          <TextField
           onChange={(e) =>{
            setUsername(e.target.value)
          }}
           align="center" margin="dense" fullWidth placeholder="Informe seu username" label="Username" id="username" />
        </Box>
        <Box
          align="center"
          sx={{
            width: 500,
            maxWidth: '100%',
          }}
        >
          <TextField 
          onChange={(e) =>{
            setSenha(e.target.value)
          }}
          align="center" margin="dense" fullWidth placeholder="Informe sua senha" label="Senha" id="senha" />
        </Box>
        <Button onClick={submitLogin} variant="contained" color="success">
          Entrar
        </Button>
      </CardContent>
      <CardActions disableSpacing>
      </CardActions>
    </Card>
  );

};

export default Post;
