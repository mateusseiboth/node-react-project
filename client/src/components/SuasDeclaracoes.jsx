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
      axios.get(" /api/v1/login/").then(function(response){
        setUsername(response.data.user[0].username)
        setUserId(response.data.user[0].id)
      })

      axios.post(" /api/v1/getDeclaracaoUser/", {
        id: userId
      }).then(function(response){
        console.log(response.data)
        setUserDeclaracoes(response.data)
    })
  }, [userId]) 
  //cria a página
  return (
      <Card sx={{ margin: 1 }}>
        <CardHeader
          title="Suas declarações cadastradas"
        />
        <CardContent>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell align="center">ID</StyledTableCell>
                  <StyledTableCell align="center">Nome da empresa</StyledTableCell>
                  <StyledTableCell align="center">Tipo da declaração</StyledTableCell>
                  <StyledTableCell align="center">Mês de referência</StyledTableCell>
                  <StyledTableCell align="center">CNPJ</StyledTableCell>
                  <StyledTableCell align="center">Data de entrega</StyledTableCell>
                  <StyledTableCell align="center">Enviada por</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {userDeclaracoes.map((row) => (
                  <StyledTableRow key={row.id}>
                    <StyledTableCell align="center" name="id" value={row.id}>{row.id}</StyledTableCell>
                    <StyledTableCell align="center">{row.empresa}</StyledTableCell>
                    <StyledTableCell align="center">{row.tipo}</StyledTableCell>
                    <StyledTableCell align="center">{row.mes}</StyledTableCell>
                    <StyledTableCell align="center">{row.CNPJ}</StyledTableCell>
                    <StyledTableCell align="center">{row.data}</StyledTableCell>
                    <StyledTableCell align="center">{row.usuario}</StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
        <CardActions disableSpacing>
        </CardActions>
      </Card>
  );
  
};

export default Post;
