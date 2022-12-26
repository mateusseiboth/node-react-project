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

const Add = () => {
  const [nome, setNome] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");


  //envia o formulário
  const submitEmpresa = () => {
    let stringDeclara = declaracoes.join();
    axios.post("http://localhost:8086/api/v1/postEmpresa", 
    {
      "declara": stringDeclara,
      "nome": nome,
      "CNPJ": cnpj,
      "email": email,
      "telefone": telefone,
      "ativo": 1,}).then(()=> {
      alert("Empresa cadastrada com sucesso!")
      window.location.reload(); //atualiza a página
      })
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
    axios.get("http://localhost:8086/api/v1/getTipoDeclara").then(function(response){
    setDeclaracao(response.data)
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
            placeholder="Informe o nome da empresa"
            defaultValue=""
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
            placeholder="Informe o telefone da empresa"
            defaultValue=""
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
            placeholder="Informe o cnpj da empresa"
            defaultValue=""
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
        </Box>
      </SytledModal>
    </>
  );
};

export default Add;
