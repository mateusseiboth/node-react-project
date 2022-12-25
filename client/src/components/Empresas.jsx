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
  TablePagination,
  TableRow,
  tableCellClasses,
  Checkbox,
  IconButton,
  Typography,
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

function createData(nome, email, telefone, declara, cnpj, status) {
  return { nome, email, telefone, declara, cnpj, status };
}

const rows = [
  createData('Empresa1', 'empresa@empresa.com', '67 9999-9999', 'SeLeuMamou', '98645414274/0001', 'Ativo'),
  createData('Empresa2', 'empresa@empresa.com', '67 9999-9999', 'SeLeuMamou', '98645414274/0001', 'Ativo'),
  createData('Empresa3', 'empresa@empresa.com', '67 9999-9999', 'SeLeuMamou', '98645414274/0001', 'Ativo'),
  createData('Empresa4', 'empresa@empresa.com', '67 9999-9999', 'SeLeuMamou', '98645414274/0001', 'Ativo'),
  createData('Empresa5', 'empresa@empresa.com', '67 9999-9999', 'SeLeuMamou', '98645414274/0001', 'Ativo'),
];
const Post = () => {
  return (
    <Card sx={{ margin: 1 }}>
      <CardHeader
        title="Pegar título da página que está"
      />
      <CardContent>
      <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Nome da empresa</StyledTableCell>
            <StyledTableCell align="center">Email</StyledTableCell>
            <StyledTableCell align="center">Telefone&nbsp;(g)</StyledTableCell>
            <StyledTableCell align="center">Declarações feitas&nbsp;(g)</StyledTableCell>
            <StyledTableCell align="center">CNPJ&nbsp;(g)</StyledTableCell>
            <StyledTableCell align="center">Status&nbsp;(g)</StyledTableCell>
            <StyledTableCell align="center">Opções</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.name}>
              <StyledTableCell align="right">{row.nome}</StyledTableCell>
              <StyledTableCell align="right">{row.email}</StyledTableCell>
              <StyledTableCell align="right">{row.telefone}</StyledTableCell>
              <StyledTableCell align="right">{row.declara}</StyledTableCell>
              <StyledTableCell align="right">{row.cnpj}</StyledTableCell>
              <StyledTableCell align="right">{row.status}</StyledTableCell>
              <StyledTableCell align="right"> 
              <Container maxWidth="sm">
                  <ButtonGroup
                    maxWidth="sm"
                    variant="contained"
                    aria-label="outlined primary button group"
                  >
                  <Button>Editar</Button>
                  </ButtonGroup>
                  <ButtonGroup
                    maxWidth="sm"
                    variant="contained"
                    aria-label="outlined primary button group"
                    color="error"
                  >
                    <Button>Trocar estado</Button>
                  </ButtonGroup>
                </Container>
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
