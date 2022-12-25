import {
  Avatar,
  Button,
  ButtonGroup,
  Fab,
  Modal,
  Stack,
  styled,
  TextField,
  Tooltip,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import React, { useState } from "react";
import {
  Add as AddIcon,
  DateRange,
  EmojiEmotions,
  Image,
  PersonAdd,
  VideoCameraBack,
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

const Add = () => {
  const [open, setOpen] = useState(false);

  const [empresa, setEmpresa] = React.useState('');

  const handleChange = (event) => {
    setEmpresa(event.target.value);
  };
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
          width={600}
          height={550}
          bgcolor={"background.default"}
          color={"text.primary"}
          p={3}
          borderRadius={5}
        >
          <Typography variant="h6" color="gray" textAlign="center">
            Nova (Função da página)
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
            fullWidth
            required
            id="nome"
            label="Nome"
            placeholder="Informe o nome da empresa"
            defaultValue=""
          />
        </FormControl>
        <FormControl sx={{width: '60ch' }}  >
          <TextField
            required
            fullWidth
            id="telefone"
            label="Telefone"
            type="number"
            placeholder="Informe o telefone da empresa"
            defaultValue=""
          />
        </FormControl>

        <FormControl sx={{width: '61ch' }}  >
          <TextField
            required
            id="cnpj"
            label="CNPJ"
            type="number"
            placeholder="Informe o cnpj da empresa"
            defaultValue=""
          />
        </FormControl>
        <FormControl sx={{width: '60ch' }}  >
          <TextField
            required
            id="email"
            label="Email"
            type="mail"
            placeholder="Informe o email da empresa"
            defaultValue=""
          />
        </FormControl>
        <FormControl sx={{m: 1, width: '60ch' }}>
          <InputLabel id="demo-simple-select-label">Empresa</InputLabel>
            <Select
              labelId="empresa-label-id"
              id="empresa"
              value={empresa}
              label="Empresa"
              onChange={handleChange}
            >
              <MenuItem value={10}>Se leu mamou</MenuItem>
              <MenuItem value={20}>Mamou mesmo</MenuItem>
              <MenuItem value={30}>Ainda tá mamando</MenuItem>
            </Select>
        </FormControl>
        <FormControl sx={{width: '60ch' }}>
        <TextField
            required
            id="declara"
            label="Declarações"
            type="text"
            placeholder="Informe as declarações que a empresa faz"
            defaultValue=""
          />

        </FormControl>
      </div>  
    </Box>

          <ButtonGroup
            fullWidth
            variant="contained"
            color="success"
            aria-label="outlined primary button group"
          >
            <Button>Cadastrar</Button>
          </ButtonGroup>
        </Box>
      </SytledModal>
    </>
  );
};

export default Add;
