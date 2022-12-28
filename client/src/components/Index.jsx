import {
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import axios from 'axios';

const Post = () => {

  const [username, setUsername] = useState('');

  useEffect(() => {
    axios.get(" /api/v1/login/").then(function(response){
      console.log(response.data.user[0])
      setUsername(response.data.user[0].username)
  })

}, [])


  //cria a página
  return (
    <Card sx={{ margin: 1 }}>
      <CardContent>
      <Typography align="center" variant="h3" gutterBottom>
        Bem-Vindo ao Sistema de Gerenciamento de Empresas, {username}
      </Typography>
      <Typography align="center" variant="h5" gutterBottom>
        Este sistema foi desenvolvido para gerenciar as empresas e suas declarações
      </Typography>
      <Typography  align="center" variant="body1" gutterBottom>
        Para acessar os módulos clique no menu ao lado, sinta-se a vontade para explorar e testar as funcionalidades.
      </Typography>

      </CardContent>
      <CardActions disableSpacing>
      </CardActions>
    </Card>
  );

};

export default Post;
