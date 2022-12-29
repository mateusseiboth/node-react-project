import { Pets } from "@mui/icons-material";
import {
  AppBar,
  Avatar,
  Box,
  Menu,
  MenuItem,
  styled,
  Toolbar,
  Typography,
} from "@mui/material";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
const StyledToolbar = styled(Toolbar)({
  display: "flex",
  justifyContent: "space-between",
});
const Icons = styled(Box)(({ theme }) => ({
  display: "none",
  alignItems: "center",
  gap: "20px",
  [theme.breakpoints.up("sm")]: {
    display: "flex",
  },
}));
const UserBox = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: "10px",
  [theme.breakpoints.up("sm")]: {
    display: "none",
  },
}));

const Navbar = () => {
  const [username, setUsername] = useState('');
  const [userId, setUserId] = useState('');

  useEffect(() => {
    axios.get(" /api/v1/login/").then(function(response){
      setUsername(response.data.user[0].username)
      setUserId(response.data.user[0].id)
    })
}, [userId]) 

  const [open, setOpen] = useState(false);
  return (
    <AppBar position="sticky">
      <StyledToolbar>
        <Typography variant="h6" sx={{ display: { xs: "none", sm: "block" } }}>
          DeclaraWeb
        </Typography>
        <Pets sx={{ display: { xs: "block", sm: "none" } }} />
        <Icons>
          <Avatar
            sx={{ width: 30, height: 30 }}
            src="/images/avatar.jpg"
            onClick={(e) => setOpen(true)}
          />
        </Icons>
        <UserBox onClick={(e) => setOpen(true)}>
          <Avatar
            sx={{ width: 30, height: 30 }}
            src="/images/avatar.jpg"
          />
          <Typography variant="span">{username}</Typography>
        </UserBox>
      </StyledToolbar>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        open={open}
        onClose={(e) => setOpen(false)}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
     
          <MenuItem component="a" href='/tipoDeclara' >Tipos de declarações</MenuItem>
          <MenuItem component="a" href='/declaracao'>Todas as declarações</MenuItem>  
          <MenuItem component="a" href='/suasDeclaracao'>Suas declarações</MenuItem>
          <MenuItem component="a" href='/usuarios'>Usuários</MenuItem>
          <MenuItem component="a" href='/empresas'>Empresas</MenuItem>
          <MenuItem component="a" href='/'>Index</MenuItem>
        {/* Deve ser mostrado apenas ao admin */}
        <MenuItem>Painel do admin</MenuItem>
        <MenuItem component="a" href="/sair">Logout</MenuItem>
      </Menu>
    </AppBar>
  );
};

export default Navbar;
