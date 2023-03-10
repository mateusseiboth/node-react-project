import {
  Button,
  ButtonGroup,
  Fab,
  Modal,
  styled,
  TextField,
  Tooltip,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  OutlinedInput,
  ListItemText,
  Checkbox,
  Alert,
  CircularProgress,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Add as AddIcon,
} from "@mui/icons-material";
import { Box } from "@mui/system";

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

const Add = ({ chaveEmpresa, setChaveEmpresa, setLoading, loading }) => {
  const [nome, setNome] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [alert, setAlert] = useState(false);
  const [alertContent, setAlertContent] = useState('');
  const [tipo, setTipo] = useState('');
  const [loadingModal, setLoadingModal] = useState(false);

  //envia o formulário
  const submitEmpresa = () => {
    let stringDeclara = declaracoes.join();

    if (stringDeclara === '' || nome === '' || cnpj === '' || telefone === '' || email === '') {
      setTipo('warning')
      setAlertContent('Preencha todos os campos')
      setAlert(true)
    } else {
      setTipo("info")
      setAlertContent("Enviando")               
      setAlert(true);
      setLoadingModal(true)
      axios.post("/api/v1/postEmpresa",
        {
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
  //Varias seleções  serão concatenadas em uma string

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
    axios.get("/api/v1/getTipoDeclara").then(function (response) {
      setDeclaracao(response.data)
    })

  }, [])


  function rerender() {
    setChaveEmpresa(chaveEmpresa === "light" ? "dark" : "light")
    setLoading(true)
  }

  return (
    <>
      <Tooltip
        onClick={(e) => setOpen(true)}
        title="Delete"
        sx={{
          position: "fixed",
          bottom: 20,
          left: { xs: "calc(50% - 25px)", md: 30 },
        }}
      >
        <Fab color="primary" aria-label="add">
          <AddIcon />
        </Fab>
      </Tooltip>
      <SytledModal
        open={open}
        onClose={(e) => rerender()}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          width={545}
          height={510}
          bgcolor={"background.default"}
          color={"text.primary"}
          p={3}
          borderRadius={5}
        >
          <Typography variant="h6" color="gray" textAlign="center">
            Nova Empresa
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
                  placeholder="Informe o nome da empresa"
                  defaultValue=""
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
                  placeholder="Informe o telefone da empresa"
                  defaultValue=""
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
                  placeholder="Informe o cnpj da empresa"
                  defaultValue=""
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
                  placeholder="Informe o email da empresa"
                  defaultValue=""
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
                    MenuProps={MenuProps}
                  >
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
            <Button onClick={submitEmpresa}>Cadastrar</Button>
          </ButtonGroup>
          {alert ? <Alert align="right" onClick={() => {
            setAlert(false);
          }} variant="outlined" severity={tipo}>{alertContent}</Alert> : <></>}
          <Box sx={{
          position: "fixed",
          bottom: 20,
          right: { xs: "calc(50% - 25px)", md: 30 },
          }}>
            {loadingModal ? <CircularProgress /> : <></> }
          </Box>
        </Box>

      </SytledModal>
    </>
  );
};

export default Add;
