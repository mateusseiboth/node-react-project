import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { styled } from '@mui/material/styles';

import {
  Paper,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  tableCellClasses,
  Typography,
  Grid,
  Box,

} from "@mui/material";
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));
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
          <Grid item xs={4}>
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
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );

};

export default Post;
