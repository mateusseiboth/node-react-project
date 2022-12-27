import React, { useState, useEffect, useReducer  } from 'react';
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
  Box,
  Button,
  ButtonGroup,
  Modal,
  TextField,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  OutlinedInput,
  ListItemText,
  Checkbox,
} from "@mui/material";
const SytledModal = styled(Modal)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

const UserBox = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "20px",
  marginBottom: "2px",
});

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};


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


const Post = ({chaveEmpresa, setChaveEmpresa, setLoading, loading}) => {

  //Caso seja clicado em alterar
  const alterar = (id, ativo) => {
    if(ativo == 1){
      ativo = 0
    }else{
      ativo = 1
    }
    axios.put(" /api/v1/postAtualizaEstado", {
      "id": id,
      "ativo": ativo,
    }).then(()=> {
      alert("Status alterado")
      window.location.reload();
    })
  }

  //busca empresas no node
  const [empresas, setEmpresas] = useState([]);
  useEffect(() => {
      axios.get(" /api/v1/getEmpresas/").then(function(response){
      setEmpresas(response.data)
    })

  }, [])

  const [declaracoes, setDeclaracoes] = React.useState([]);
  const handleChangeCheck = (event) => {
    const {
      target: { value },
    } = event;
    setDeclaracoes(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

const [open, setOpen] = useState(false);

//chama declaracoes
const [declaracao, setDeclaracao] = useState([]);

useEffect(() => {
  axios.get(" /api/v1/getTipoDeclara").then(function(response){
  setDeclaracao(response.data)
})

}, [])



  const [nome, setNome] = useState("");
  const [id, setId] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");


  function setModal(linha, estado){
    setOpen(estado)
    setLinha(linha)
    setId(linha.id)
    setNome(linha.nome)
    setTelefone(linha.telefone)
    setCnpj(linha.CNPJ)
    setEmail(linha.email)
  }

  const [linha, setLinha] = useState([]);


  const submitEmpresa = () => {
    let stringDeclara = declaracoes.join();
    //console.log(nome, cnpj, email, telefone, stringDeclara, linha.id)
    axios.put(" /api/v1/postAtualizaEmpresa", 
    {
      "id": id,
      "declara": stringDeclara,
      "nome": nome,
      "CNPJ": cnpj,
      "email": email,
      "telefone": telefone,
      "ativo": 1,}).then(()=> {
      alert("Empresa cadastrada com sucesso!")
      window.location.reload(); 
      })
  }

function rerender(){
  setChaveEmpresa(chaveEmpresa === "light" ? "dark" : "light")
  setLoading(true)

}
  //cria a página
  return (
      <Card sx={{ margin: 1 }}>
        <CardHeader
          title="Empresas cadastradas"
        >
        </CardHeader>
        <CardContent>
        <ButtonGroup
          variant="contained" 
          aria-label="outlined button group primary"
          >
            <Button onClick={rerender}>Recarregar</Button>
          </ButtonGroup>
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
                  <StyledTableCell align="center">
                  </StyledTableCell>
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
                          <Button onClick={(e) => setModal(row, true) }>Editar</Button>
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
        <SytledModal
                              open={open}
                              onClose={(e) => setOpen(false)}
                              aria-labelledby="modal-modal-title"
                              aria-describedby="modal-modal-description"
                          >
                              <Box
                                width={545}
                                height={590}
                                bgcolor={"background.default"}
                                color={"text.primary"}
                                p={3}
                                borderRadius={5}
                              >
                                <Typography variant="h6" color="gray" textAlign="center">
                                  Nova Empresa
                                </Typography>
                                <UserBox>
                                  <Typography fontWeight={500} variant="span">
                                    Nome de quem tá logado
                                  </Typography>
                                </UserBox>
                                <Box
                                  component="form"
                                  sx={{
                                    '& .MuiTextField-root': { m: 1, width: '60ch' },
                                  }}
                                  noValidate
                                  autoComplete="off"
                                >
                                <div>
                                <FormControl sx={{width: '20ch' }}  >
                                    <TextField
                                      disabled
                                      fullWidth
                                      required
                                      id="id"
                                      label="ID"
                                      name="id"
                                     
                                      defaultValue={linha.id}
                                    />
                                    <TextField
                                      disabled
                                      fullWidth
                                      required
                                      id="ativo"
                                      label="Ativo"
                                      name="ativo"
                                      defaultValue={linha.ativo}
                                    />
                                  </FormControl>
                                  <FormControl sx={{width: '61ch' }}  >
                                    <TextField
                                      
                                      onChange={(e) =>{
                                        setNome(e.target.value)
                                      }}
                                      fullWidth
                                      required
                                      id="nome"
                                      label="Nome"
                                      name="nome"
                                      defaultValue={linha.nome}
                                    />
                                  </FormControl>
                                  <FormControl sx={{width: '60ch' }}  >
                                    <TextField
                                    
                                    onChange={(e) =>{
                                      setTelefone(e.target.value)
                                    }}
                                      required
                                      fullWidth
                                      name="telefone"
                                      id="telefone"
                                      label="Telefone"
                                      type="number"
                                      defaultValue={linha.telefone}
                                    />
                                  </FormControl>

                                  <FormControl sx={{width: '61ch' }}  >
                                    <TextField
                                    
                                    onChange={(e) =>{
                                      setCnpj(e.target.value)
                                    }}
                                      required
                                      id="cnpj"
                                      name="cnpj"
                                      label="CNPJ"
                                      type="number"
                                      defaultValue={linha.CNPJ}
                                    />
                                  </FormControl>
                                  <FormControl sx={{width: '60ch' }}  >
                                    <TextField
                                    
                                    onChange={(e) =>{
                                      setEmail(e.target.value)
                                    }}
                                      required
                                      id="email"
                                      name="email"
                                      label="Email"
                                      type="mail"
                                      defaultValue={linha.email}
                                    />
                                  </FormControl>
                                <div>
                                <FormControl sx={{ m: 1, width: '60ch' }}>
                                  <InputLabel id="checkbox-label">Declarações</InputLabel>
                                  <Select
                                    name="declaracoes"
                                    labelId="declaracoes-label"
                                    id="declaracoes"
                                    multiple
                                    value={declaracoes}
                                    onChange={handleChangeCheck}
                                    input={<OutlinedInput label="Declarações" />}
                                    renderValue={(selected) => selected.join(', ')}
                                    MenuProps={MenuProps}>
                                    {declaracao.map((row) => (
                                    <MenuItem key={row.id} value={row.nome}>
                                      <Checkbox checked={declaracoes.indexOf(row) > -1} />
                                      <ListItemText primary={row.nome} />
                                    </MenuItem>
                                ))}
                                  </Select>
                                </FormControl>
                            </div>
                            </div>  
                              </Box>

                                <ButtonGroup
                                  sx={{ m: 1, width: '10ch' }}
                                  variant="contained"
                                  color="success"
                                  aria-label="outlined primary button group"
                                >
                                  <Button onClick={submitEmpresa}>Atualizar</Button>
                                </ButtonGroup>
                              </Box>
                          </SytledModal>

        </CardActions>
      </Card>
  );
  
};

export default Post;
