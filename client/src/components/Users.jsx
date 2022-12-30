import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { styled } from '@mui/material/styles';
import {
  Paper,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  TableCell,
  Grid,
  TableRow,
  Box,
  Button,
  ButtonGroup,
  tableCellClasses,
  FormControl,
  Modal,
  Typography,
  TextField,
  Alert,
  CircularProgress,
} from "@mui/material";

const SytledModal = styled(Modal)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});


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
const Post = ({ chaveUsers, setChaveUsers, setLoading, loading }) => {

  const alterar = (id, ativo) => {
    if (ativo === 1) {
      ativo = 0
    } else {
      ativo = 1
    }
    axios.put(" /api/v1/postPromoveUser", {
      "id": id,
      "nivel": ativo,
    }).then(() => {
    })
    rerender(); //atualiza a página
  }

  function setModal(linha, estado) {
    setOpen(estado)
    setLinha(linha)
    setId(linha.id)
    setNome(linha.username)
    setNivel(linha.nivel)
    setSenha('')
  }

  const [linha, setLinha] = useState([]);
  const [open, setOpen] = useState(false);
  const [nome, setNome] = useState("");
  const [id, setId] = useState("");
  const [senha, setSenha] = useState("");
  const [nivel, setNivel] = useState("");
  const [loadingModal, setLoadingModal] = useState(false);


  //busca usuarios no node
  const [usuarios, setUsuarios] = useState([]);
  useEffect(() => {
    axios.get("/api/v1/getUsers/").then(function (response) {
      setUsuarios(response.data)
    })

  }, [])

  const [alert, setAlert] = useState(false);
  const [alertContent, setAlertContent] = useState('');
  const [tipo, setTipo] = useState('');
  const submitUser = () => {

    if (id === '' || nome === '' || nivel === '') {
      setTipo('warning')
      setAlertContent('Preencha todos os campos')
      setAlert(true)
    } else {
      setTipo("info")
      setAlertContent("Enviando")
      setAlert(true);
      setLoadingModal(true)

      axios.put("/api/v1/postAtualizaUser", {
        "id": id,
        "nome": nome,
        "senha": senha,
        "nivel": nivel,
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
    setChaveUsers(chaveUsers === "light" ? "dark" : "light")
    setLoading(true)
  }

  //cria a página
  return (
    <Box sx={{ml: "5px"}} position="center">
      <Typography align="center" variant="h3" component="div">
        Usuários atualmente cadastrados
      </Typography>
      <Grid container spacing={1}>
    {usuarios.map((row) => (
      <Grid item xs={4}>
        <Card sx={{ margin: 1 }}>
          <CardHeader
            title={row.username}
          />
          <CardContent>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
              Email: {row.username}
            </Typography>
            <Typography key={row.id} sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
              ID: {row.id}
            </Typography>
            <Typography key={row.id} sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
              Nome para login: {row.username}
            </Typography>
            <Typography key={row.id} sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
              Nivel: {row.nivel}
            </Typography>
          </CardContent>
          <SytledModal
            open={open}
            onClose={(e) => rerender()}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box
              width={545}
              height={400}
              bgcolor={"background.default"}
              color={"text.primary"}
              p={3}
              borderRadius={5}
            >
              <Typography variant="h6" color="gray" textAlign="center">
                Alterar usuário
              </Typography>
              <Box
                component="form"
                sx={{
                  '& .MuiTextField-root': { m: 1, width: '60ch' },
                }}
                noValidate
                autoComplete="off"
              >
                <div>
                  <FormControl sx={{ width: '20ch' }}  >
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
                      id="nivel"
                      label="Nível"
                      name="nivel"
                      defaultValue={linha.nivel}
                    />
                  </FormControl>
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
                      defaultValue={linha.username}
                    />
                  </FormControl>
                  <FormControl sx={{ width: '60ch' }}  >
                    <TextField

                      onChange={(e) => {
                        setSenha(e.target.value)
                      }}
                      required
                      fullWidth
                      name="senha"
                      id="senha"
                      label="Senha"
                      type="password"
                      placeholder='*******************'
                      defaultValue=""
                    />
                  </FormControl>
                </div>
              </Box>

              <ButtonGroup
                sx={{ m: 1, width: '10ch' }}
                variant="contained"
                color="success"
                aria-label="outlined primary button group"
              >
                <Button onClick={submitUser}>Atualizar</Button>
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

          <CardActions disableSpacing>
            <ButtonGroup
              variant="outlined"
              aria-label="outlined button group primary"
            >
              <Button size="small" onClick={(e) => setModal(row, true)}>Editar</Button>
              <Button size="small" color="error" onClick={() => alterar(row.id, row.nivel)}>Trocar nível</Button>
            </ButtonGroup>
          </CardActions>
        </Card>
      </Grid>
      ))}
</Grid>
    </Box>
  );

};

export default Post;
