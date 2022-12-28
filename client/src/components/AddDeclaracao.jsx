import {
  Button,
  ButtonGroup,
  Fab,
  Modal,
  styled,
  Tooltip,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
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

const Add = ({chaveDeclaracao, setChaveDeclaracao, setLoading, loading}) => {

  const handleChangeEmpresa = (event) => {
    setEmpresa(event.target.value);
  };
  const [empresa, setEmpresa] = useState("");

  const handleChangeDeclaracao = (event) => {
    setDeclaracao(event.target.value);
  };

  const [declaracao, setDeclaracao] = useState("");

  const handleChangeMes = (event) => {
    setMes(event.target.value);
  };

  const [mes, setMes] = useState("");

  //envia o formulário
  const submitDeclaracao = () => {
    axios.post("/api/v1/postDeclaracao",
      {
        "nome": mes,
        "tipoID": declaracao,
        "empresa_id": empresa,
        "usuario_id": userId,
      }).then(() => {
        alert("Declaração cadastrada com sucesso!")
      })
      rerender(); //atualiza a página
  }

  const [open, setOpen] = useState(false);

  //Recupera os tipos de declarações cadastradas
  const [declaracoes, setDeclaracoes] = useState([]);

  useEffect(() => {
    axios.get("/api/v1/getTipoDeclara").then(function (response) {
      setDeclaracoes(response.data)
    })

  }, [])

  const [empresas, setEmpresas] = useState([]);

  //recupera as empresas cadastradas
  useEffect(() => {
    axios.get("/api/v1/getEmpresas").then(function (response) {
      setEmpresas(response.data)
    })

  }, [])

  function rerender(){
    setChaveDeclaracao(chaveDeclaracao === "light" ? "dark" : "light")
    setLoading(true)
  
  }

  const [username, setUsername] = useState('');
  const [userId, setUserId] = useState('');

  useEffect(() => {
    axios.get(" /api/v1/login/").then(function(response){
      console.log(response.data.user[0])
      setUsername(response.data.user[0].username)
      setUserId(response.data.user[0].id)
  })

}, [])


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
        onClose={(e) => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          width={545}
          height={500}
          bgcolor={"background.default"}
          color={"text.primary"}
          p={3}
          borderRadius={5}
        >
          <Typography variant="h6" color="gray" textAlign="center">
            Nova Declaração
          </Typography>
          <UserBox>
            <Typography fontWeight={500} variant="span">
              cadastrando como {username}
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
              <FormControl sx={{ m: 1, width: 300 }}>
                <InputLabel id="empresa-label">Empresa</InputLabel>
                <Select
                  labelId="select-label-empresa"
                  id="id-empresa"
                  value={empresa}
                  label="Empresa"
                  onChange={handleChangeEmpresa}
                >
                  {empresas.map((row) => (
                    <MenuItem value={row.id}>{row.nome}</MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl sx={{ m: 1, width: 300 }}>
                <InputLabel id="declaracao-label">Declaração</InputLabel>
                <Select
                  labelId="select-label-declaracao"
                  id="id-declaracao"
                  value={declaracao}
                  label="Declaração"
                  onChange={handleChangeDeclaracao}
                >
                  {declaracoes.map((row) => (
                    <MenuItem value={row.id}>{row.nome}</MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl sx={{ m: 1, width: 300 }}>
                <InputLabel id="mes-label">Mês de Referência</InputLabel>
                <Select
                  labelId="select-label-mes"
                  id="id-mes"
                  value={mes}
                  label="Mês de Referência"
                  onChange={handleChangeMes}
                >
                  <MenuItem value="Janeiro">Janeiro</MenuItem>
                  <MenuItem value="Fevereiro">Fevereiro</MenuItem>
                  <MenuItem value="Março">Março</MenuItem>
                  <MenuItem value="Abril">Abril</MenuItem>
                  <MenuItem value="Maio">Maio</MenuItem>
                  <MenuItem value="Junho">Junho</MenuItem>
                  <MenuItem value="Julho">Julho</MenuItem>
                  <MenuItem value="Agosto">Agosto</MenuItem>
                  <MenuItem value="Setembro">Setembro</MenuItem>
                  <MenuItem value="Outubro">Outubro</MenuItem>
                  <MenuItem value="Novembro">Novembro</MenuItem>
                  <MenuItem value="Dezembro">Dezembro</MenuItem>
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
            <Button onClick={submitDeclaracao}>Cadastrar</Button>
          </ButtonGroup>
        </Box>
      </SytledModal>
    </>
  );
};

export default Add;
