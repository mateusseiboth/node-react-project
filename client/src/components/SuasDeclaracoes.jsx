import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  Grid,
  Box,
} from "@mui/material";

const Post = () => {
  const [username, setUsername] = useState('');
  const [userId, setUserId] = useState('');

  //busca declaracoes no node
  const [userDeclaracoes, setUserDeclaracoes] = useState([]);

  useEffect(() => {
    axios.get(" /api/v1/login/").then(function (response) {
      setUsername(response.data.user[0].username)
      setUserId(response.data.user[0].id)
    })

    axios.post(" /api/v1/getDeclaracaoUser/", {
      id: userId
    }).then(function (response) {
      console.log(response.data)
      setUserDeclaracoes(response.data)
    })
  }, [userId])
  //cria a página
  return (
    <Box sx={{ ml: "5px" }} position="center">
      <Typography align="center" variant="h3" component="div">
        Declarações cadastradas por você
      </Typography>
      <Grid container spacing={1}>
        {userDeclaracoes.map((row) => (
          <Grid item xs={6} md={4}>
            <Card sx={{ margin: 1 }}>
              <CardHeader
                title={row.empresa}
              />
              <CardContent>
                <Typography key={row.id} sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                  ID: {row.id}
                </Typography>
                <Typography key={row.id} sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                  Tipo de declração: {row.tipo}
                </Typography>
                <Typography key={row.id} sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                  Mês de referencia: {row.mes}
                </Typography>
                <Typography key={row.id} sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                  CNPJ: {row.CNPJ}
                </Typography>
                <Typography key={row.id} sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                  Data de entrega: {row.data}
                </Typography>
                <Typography key={row.id} sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                  Entregue por: {username}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );

};

export default Post;
