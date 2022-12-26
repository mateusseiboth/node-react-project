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
  //busca tipos de declaração no node
  const [tipos, setTipos] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:8086/api/v1/getTipoDeclara/").then(function (response) {
      setTipos(response.data)
    })

  }, [])

  //cria a página
  return (
    <Card sx={{ margin: 1 }}>
      <CardHeader
        title="Tipos de declaração cadastrados"
      />
      <CardContent>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="center">ID</StyledTableCell>
                <StyledTableCell align="center">Nome</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tipos.map((row) => (
                <StyledTableRow key={row.id}>
                  <StyledTableCell align="center" name="id" value={row.id}>{row.id}</StyledTableCell>
                  <StyledTableCell align="center">{row.nome}</StyledTableCell>
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
