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

  //busca declaracoes no node
  const [declaracoes, setDeclaracoes] = useState([]);
  useEffect(() => {
      axios.post("http://localhost:8086/api/v1/getDeclaracaoUser/", {id: "6"}).then(function(response){
      setDeclaracoes(response.data)
    })

  }, [])
  
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
                {declaracoes.map((row) => (
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