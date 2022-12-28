import {
  Button,
  ButtonGroup,
  Fab,
  Modal,
  styled,
  Tooltip,
  Typography,
  FormControl,
  Radio,
  RadioGroup,
  TextField,
  FormControlLabel,
  FormLabel,
} from "@mui/material";
import React, { useState } from "react";
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

const Add = ({chaveUsers, setChaveUsers, setLoading, loading}) => {

  const handleChange = (event) => {
    setNivel(event.target.value);
  };


  const [nome, setNome] = useState("");
  const [senha, setSenha] = useState("");
  const [nivel, setNivel] = useState("");

  //envia o formulário
  const submitUser = () => {
    axios.post(" /api/v1/postUsers",
      {
        "nome": nome,
        "senha": senha,
        "nivel": nivel,
      }).then(() => {
        console.log(nome, senha, nivel)
        alert("Usuário cadastrado com sucesso!")
        
      })
      rerender(); //atualiza a página
  }

  const [open, setOpen] = useState(false);


  function rerender(){
    setChaveUsers(chaveUsers === "light" ? "dark" : "light")
    setLoading(true)
  
  }
  //Cria a página
  return (
    <>
      <Tooltip
        onClick={(e) => setOpen(true)}
        title="Adicionar Usuário"
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
            Novo Usuário
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
              <FormControl sx={{ m: 1, width: 300 }}>
                <TextField
                  onChange={(e) => {
                    setNome(e.target.value)
                  }}
                  fullWidth
                  required
                  id="nome"
                  label="Nome"
                  name="nome"
                  placeholder="Informe o nome de usuário"
                  defaultValue=""
                />

              </FormControl>

              <FormControl sx={{ m: 1, width: 300 }}>
                <TextField
                  onChange={(e) => {
                    setSenha(e.target.value)
                  }}
                  fullWidth
                  required
                  id="senha"
                  label="Senha"
                  name="senha"
                  placeholder="Insira a senha do usuário"
                  defaultValue=""
                  type="password"
                />

              </FormControl>

              <FormControl>
                <FormLabel id="nivel-label">Nível do usuário</FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="nivel-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                  value={nivel}
                  onChange={handleChange}
                >
                  <FormControlLabel value="1" control={<Radio />} label="Administrador" />
                  <FormControlLabel value="0" control={<Radio />} label="Usuário comum" />
                </RadioGroup>
              </FormControl>

            </div>
          </Box>

          <ButtonGroup
            sx={{ m: 1, width: '10ch' }}
            variant="contained"
            color="success"
            aria-label="outlined primary button group"
          >
            <Button onClick={submitUser}>Cadastrar</Button>
          </ButtonGroup>
        </Box>
      </SytledModal>
    </>
  );
};

export default Add;
