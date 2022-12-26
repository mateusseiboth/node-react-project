import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Favorite, FavoriteBorder, MoreVert, Share } from "@mui/icons-material";
import { styled } from '@mui/material/styles';
import { DateRange, Add as AddIcon } from "@mui/icons-material";

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
  Box,
  Button,
  Container,
  ButtonGroup,
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

const alterar = (id, ativo) => {
  if(ativo == 1){
    ativo = 0
  }else{
    ativo = 1
  }
   axios.put("http://localhost:8086/api/v1/postAtualizaEstado", {
    "id": id,
    "ativo": ativo,
   }).then(()=> {
    alert("Status alterado")
  })
  }

const [empresas, setEmpresas] = useState([]);

useEffect(() => {
    axios.get("http://localhost:8086/api/v1/getEmpresas/").then(function(response){
    setEmpresas(response.data)
    console.log(response.data)
  })

}, [])
  return (
    <Card sx={{ margin: 1 }}>
      <CardHeader
        title="Empresas cadastradas"
      />
      <CardContent>
      <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>ID</StyledTableCell>
            <StyledTableCell>Nome da empresa</StyledTableCell>
            <StyledTableCell align="center">Email</StyledTableCell>
            <StyledTableCell align="center">Telefone</StyledTableCell>
            <StyledTableCell align="center">Declarações feitas</StyledTableCell>
            <StyledTableCell align="center">CNPJ</StyledTableCell>
            <StyledTableCell align="center">Status</StyledTableCell>
            <StyledTableCell align="center">Opções</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {empresas.map((row) => (
            <StyledTableRow key={row.id}>
              <StyledTableCell align="center" name="id" value={row.id}>{row.id}</StyledTableCell>
              <StyledTableCell align="center">{row.nome}</StyledTableCell>
              <StyledTableCell align="center">{row.email}</StyledTableCell>
              <StyledTableCell align="center">{row.telefone}</StyledTableCell>
              <StyledTableCell align="center">{row.declara}</StyledTableCell>
              <StyledTableCell align="center">{row.CNPJ}</StyledTableCell>
              <StyledTableCell align="center">{row.ativo}</StyledTableCell>
              <StyledTableCell align="center"> 
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    '& > *': {
                      m: 1,
                    },
                  }}
                >
                  <ButtonGroup
                   variant="contained" 
                   aria-label="outlined button group primary"

                  >
                    <Button>Editar</Button>
                    <Button color="error" onClick={() => alterar(row.id, row.ativo)}>Trocar estado</Button>
                  </ButtonGroup>
                </Box>
              </StyledTableCell>
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
