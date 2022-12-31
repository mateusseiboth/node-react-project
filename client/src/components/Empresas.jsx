import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { styled } from '@mui/material/styles';
import CircleIcon from '@mui/icons-material/Circle';
import {
  Box,
  Grid,
  Card,
  CardActions,
  CardContent,
  CardHeader,
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
  Alert,
  Avatar,
  CircularProgress,
} from "@mui/material";
const SytledModal = styled(Modal)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
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

const Post = ({ chaveEmpresa, setChaveEmpresa, setLoading, loading }) => {

  //Caso seja clicado em alterar
  const alterar = (id, ativo) => {
    if (ativo === 1) {
      ativo = 0
    } else {
      ativo = 1
    }
    axios.put(" /api/v1/postAtualizaEstado", {
      "id": id,
      "ativo": ativo,
    }).then(() => {

    })
    rerender(); //atualiza a página
  }

  //busca empresas no node
  const [empresas, setEmpresas] = useState([]);
  useEffect(() => {
    axios.get(" /api/v1/getEmpresas/").then(function (response) {
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
    axios.get(" /api/v1/getTipoDeclara").then(function (response) {
      setDeclaracao(response.data)
    })

  }, [])



  const [nome, setNome] = useState("");
  const [id, setId] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [loadingModal, setLoadingModal] = useState(false);


  function setModal(linha, estado) {
    setOpen(estado)
    setLinha(linha)
    setId(linha.id)
    setNome(linha.nome)
    setTelefone(linha.telefone)
    setCnpj(linha.CNPJ)
    setEmail(linha.email)
  }

  const [linha, setLinha] = useState([]);
  const [alert, setAlert] = useState(false);
  const [alertContent, setAlertContent] = useState('');
  const [tipo, setTipo] = useState('');


  const submitEmpresa = () => {
    let stringDeclara = declaracoes.join();

    if (stringDeclara === '' || nome === '' || cnpj === '' || telefone === '' || email === '' || id === '') {
      setTipo('warning')
      setAlertContent('Preencha todos os campos')
      setAlert(true)
    } else {
      setTipo("info")
      setAlertContent("Enviando")
      setAlert(true);
      setLoadingModal(true)
      axios.put(" /api/v1/postAtualizaEmpresa",
        {
          "id": id,
          "declara": stringDeclara,
          "nome": nome,
          "CNPJ": cnpj,
          "email": email,
          "telefone": telefone,
          "ativo": 1,
        }).then(response => {
          if (response.data.result === true) {
            setTimeout(() => {
              setTipo(response.data.tipo)
              setAlertContent(response.data.content);
              setAlert(true);
              setLoadingModal(false);
            }, [1000]);

          } else {
            setTimeout(() => {
              setTipo(response.data.tipo)
              setAlertContent(response.data.content);
              setAlert(true);
              setLoadingModal(false);
            }, [1000]);
          }
        }).catch(error => {
          console.log(error)
        })
    }
  }

  function rerender() {
    setChaveEmpresa(chaveEmpresa === "light" ? "dark" : "light")
    setLoading(true)
  }
  //cria a página
  return (
    <Box sx={{ ml: "5px" }} position="center">
      <Typography align="center" variant="h3" component="div">
        Empresas cadastradas
      </Typography>
      <Grid container spacing={1}>
        {empresas.map((row) => (
          <Grid item xs={6} md={4}>
            <Card sx={{ margin: 1 }}>
              {row.ativo ? (
                <CardHeader
                  title={row.nome}
                />
              ) : (
                <CardHeader
                avatar={
                  <Avatar>
                    <CircleIcon color="error" />
                  </Avatar>
                }
                  title={row.nome}
                />
              )}
              <CardContent>
                <Typography key={row.id} sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                  ID: {row.id}
                </Typography>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                  Email: {row.email}
                </Typography>
                <Typography key={row.id} sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                  Telefone: {row.telefone}
                </Typography>
                <Typography key={row.id} sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                  Declarações feitas: {row.declara}
                </Typography>
                <Typography key={row.id} sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                  CNPJ: {row.CNPJ}
                </Typography>
                <Typography key={row.id} sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                  Status: {row.ativo}
                </Typography>
              </CardContent>
              <CardActions disableSpacing>
                <ButtonGroup
                  variant="outlined"
                  aria-label="outlined button group primary"
                >
                  <Button size="small" onClick={(e) => setModal(row, true)}>Editar</Button>
                  <Button size="small" color="error" onClick={() => alterar(row.id, row.ativo)}>Trocar estado</Button>

                </ButtonGroup>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      <SytledModal
        open={open}
        onClose={(e) => rerender()}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          width={545}
          height={600}
          bgcolor={"background.default"}
          color={"text.primary"}
          p={3}
          borderRadius={5}
        >
          <Typography variant="h6" color="gray" textAlign="center">
            Editar Empresa
          </Typography>
          <Box
            component="form"
            sx={{
              '& > :not(style)': { m: 1, width: '28ch' },
            }}
            noValidate
            autoComplete="off"
          >

            <TextField
              sx={{ width: '15ch', m: 1 }}
              disabled

              required
              id="id"
              label="ID"
              name="id"

              defaultValue={linha.id}
            />
            <TextField
              sx={{ width: '15ch', m: 1 }}
              disabled

              required
              id="ativo"
              label="Ativo"
              name="ativo"
              defaultValue={linha.ativo}
            />

          </Box>
          <Box
            component="form"
            sx={{
              '& .MuiTextField-root': { m: 1, width: '60ch' },
            }}
            noValidate
            autoComplete="off"
          >
            <FormControl sx={{ width: '61ch' }}  >
              <TextField

                onChange={(e) => {
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
            <FormControl sx={{ width: '60ch' }}  >
              <TextField

                onChange={(e) => {
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

            <FormControl sx={{ width: '61ch' }}  >
              <TextField

                onChange={(e) => {
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
            <FormControl sx={{ width: '60ch' }}  >
              <TextField

                onChange={(e) => {
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

          </Box>

          <ButtonGroup
            sx={{ m: 1, width: '10ch' }}
            variant="contained"
            color="success"
            aria-label="outlined primary button group"
          >
            <Button onClick={submitEmpresa}>Atualizar</Button>
          </ButtonGroup>
          {alert ? <Alert align="right" onClick={() => {
            setAlert(false);
          }} variant="outlined" severity={tipo}>{alertContent}</Alert> : <></>}
          <Box sx={{
            position: "fixed",
            bottom: 20,
            right: { xs: "calc(50% - 25px)", md: 30 },
          }}>
            {loadingModal ? <CircularProgress /> : <></>}
          </Box>
        </Box>
      </SytledModal>
    </Box>
  );

};

export default Post;
