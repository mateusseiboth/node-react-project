import { Box, Stack, Skeleton } from "@mui/material";
import React, { useState } from "react";
import Declaracoes from "./SuasDeclaracoes";
import Add from "./AddDeclaracao";
const Feed = () => {
  const [loading, setLoading] = useState(true);
  const [chaveDeclaracoes, setChaveDeclaracoes] = useState(1);

  setTimeout(() => {
    setLoading(false);
  }, [1000]);

  return (
    <Box flex={12} p={{ xs: 0, md: 17 }} minHeight="900px">
      {loading ? (
        <Stack spacing={1}>
          <Skeleton variant="text" height={100} />
          <Skeleton variant="text" height={20} />
          <Skeleton variant="text" height={20} />
          <Skeleton variant="rectangular" height={300} />
        </Stack>
      ) : (
        <>
          
          <Declaracoes />
          <Add setLoading={setLoading} loading={loading} setChaveDeclaracoes={setChaveDeclaracoes} chaveDeclaracoes={chaveDeclaracoes} key={chaveDeclaracoes}/>
        </>
      )}
    </Box>
  );
};

export default Feed;
