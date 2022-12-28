import {
  Card,
  CardActions,
  CardContent,
  Typography,
  Box,
  TextField,
  Button,
} from "@mui/material";

const Post = () => {

  //cria a página
  return (
    <Card sx={{ margin: 1 }}>
      <CardContent align="center">
        <Typography align="center" variant="h3" gutterBottom>
          Por favor faça login para acessar o sistema
        </Typography>
        <Box

          sx={{
            width: 500,
            maxWidth: '100%',
          }}
        >
          <TextField align="center" margin="dense" fullWidth placeholder="Informe seu username" label="Username" id="username" />
        </Box>
        <Box
          align="center"
          sx={{
            width: 500,
            maxWidth: '100%',
          }}
        >
          <TextField align="center" margin="dense" fullWidth placeholder="Informe sua senha" label="Senha" id="senha" />
        </Box>
        <Button variant="contained" color="success">
          Entrar
        </Button>
      </CardContent>
      <CardActions disableSpacing>
      </CardActions>
    </Card>
  );

};

export default Post;
