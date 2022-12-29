import {
  Card,
  CardActions,
  CardContent,
  Box,
  TextField,
  Button,
  CardMedia,
  ButtonGroup,
  Grid,
  Typography,
  Alert,
  InputAdornment,
  IconButton,
  VisibilityOff,
  Visibility,
} from "@mui/material";
import axios from 'axios';
import React, { useState } from "react";
import PetsRoundedIcon from '@mui/icons-material/PetsRounded';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import PasswordIcon from '@mui/icons-material/Password';

const Post = () => {
  const [alert, setAlert] = useState(false);
  const [alertContent, setAlertContent] = useState('');
  const [username, setUsername] = useState('');
  const [senha, setSenha] = useState('');
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const submitLogin = () => {

    axios.post("/api/v1/login",
      {

        "username": username,
        "senha": senha,
      }).then(response => {
        if(response.data.result === true){
          window.location="/"
        }else {
          setAlertContent(response.data.content);
          setAlert(true);
        }
      }).catch(error=>{
        console.log(error)
      }) 

  }

  //cria a página
  return (
    <Box sx={{ maxWidth: 900 }}>
      <Grid container spacing={0.2}>
        <Grid item xs={6} md={4}>
          <Card align="center" variante="outlined" sx={{ miniHeight: 600 }}> 
          <CardContent>
            <Box
              sx={{
                mt: '12px',
                mb: '51px'
              }}
            >
              <PetsRoundedIcon color="success" sx={{ fontSize: 90 }}/>
              <Typography variant="subtitle2" gutterBottom>
                 Ei, amigo!
              </Typography>
            </Box>
            
              <Typography variant="body2" gutterBottom>
                 * Faça login e descubra coisas maravilhosas
              </Typography>
              <Typography variant="body2" gutterBottom>
                 * O sistema mais mal codado que já viu
              </Typography>
              <Typography variant="body2" gutterBottom>
                 * Eu mal sei como organiza as grids
              </Typography>
              <Typography variant="body2" gutterBottom>
                 * A tela de login é simples mesmo mas é o que consigo fazer agora
              </Typography>

          </CardContent>
          <CardActions>
              <Box sx={{ fontStyle: 'italic', textAlign: 'right'}}>
                <Typography sx={{fontSize: 12}}> 
                  Versão beta-0.2
                </Typography>
            </Box>
          </CardActions>
          </Card>
          
        </Grid>
        <Grid item xs={10} md={8}>
          <Card variante="outlined">
          <CardMedia
        sx={{ height: 140 }}
        image="/images/contemplative-reptile.jpg"
        title="green iguana"
      />
            <CardContent>
              <Box
              sx={{
                mb: '1px'
              }}
              >
                <TextField
                  onChange={(e) => {
                    setUsername(e.target.value)
                  }}
                  align="center" margin="dense" fullWidth placeholder="Informe seu username" 
                  label="Username" 
                  id="username" 
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AccountBoxIcon />
                      </InputAdornment>
                    ),
                  }}
                  />
                <TextField
                  onChange={(e) => {
                    setSenha(e.target.value)
                  }}
                  align="center" margin="dense" fullWidth 
                  placeholder="Informe sua senha" 
                  label="Senha" 
                  id="senha"
                  type={showPassword ? 'text' : 'password'}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PasswordIcon />
                      </InputAdornment>
                    ),
                  }} 
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  />
              </Box>
              <Box>
                <Grid container>
                  <Grid item xs={6} align="left">
                    
                      <ButtonGroup
                          orientation="vertical"
                        >
                          <Button size="small">Esqueci minha senha</Button>
                          <Button size="small">Não tenho cadastro</Button>
                      </ButtonGroup>
                    
                  </Grid>
                  <Grid item xs={6} align="right">
                    
                  <ButtonGroup align="right">
                  <Button align="right" onClick={submitLogin} color="success">
                    Entrar
                  </Button>
                </ButtonGroup>
                {alert ? <Alert align="right" onClick={() => {
                setAlert(false);
              }} variant="outlined" severity='error'>{alertContent}</Alert> : <></> }
                  </Grid>
                </Grid>
              </Box>
            </CardContent>
            <CardActions>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </Box >
  );

};

export default Post;
