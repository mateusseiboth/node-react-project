import {
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";

const Post = () => {

  //cria a página
  return (
    <Card sx={{ margin: 1 }}>
      <CardContent>
      <Typography align="center" variant="h3" gutterBottom>
        Bem-Vindo ao Sistema de Gerenciamento de Empresas
      </Typography>
      <Typography align="center" variant="h5" gutterBottom>
        Este sistema foi desenvolvido para gerenciar as empresas e suas declarações
      </Typography>
      <Typography  align="center" variant="body1" gutterBottom>
        Para acessar os módulos clique no menu ao lado, sinta-se a vontade para explorar e testar as funcionalidades.
      </Typography>

      </CardContent>
      <CardActions disableSpacing>
      </CardActions>
    </Card>
  );

};

export default Post;
