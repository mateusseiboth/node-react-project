import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  Box,
  Grid,
} from "@mui/material";

const Post = () => {
  //busca tipos de declaração no node
  const [tipos, setTipos] = useState([]);
  useEffect(() => {
    axios.get(" /api/v1/getTipoDeclara/").then(function (response) {
      setTipos(response.data)
    })

  }, [])

  //cria a página
  return (
    <Box sx={{ ml: "5px" }} position="center">
      <Typography align="center" variant="h3" component="div">
        Tipos de declarações atualmente cadastrados
      </Typography>
      <Grid container spacing={1}>
        {tipos.map((row) => (
          <Grid item xs={4}>
            <Card sx={{ margin: 1 }}>
              <CardHeader
                title={row.nome}
              />
              <CardContent>
                <Typography key={row.id} sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                  ID: {row.id}
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
