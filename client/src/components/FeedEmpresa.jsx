import { Box, Stack, Skeleton } from "@mui/material";
import React, { useState } from "react";
import Empresas from "./Empresas";
import Add from "./AddEmpresa";

const Feed = () => {
  const [loading, setLoading] = useState(true);

  setTimeout(() => {
    setLoading(false);
  }, [1000]);


  const [chaveEmpresa, setChaveEmpresa] = useState(1);
  return (
    <Box flex={6} p={{ xs: 0, md: 3 }} minHeight="900px">
      {loading ? (
        <Stack spacing={1}>
          <Skeleton variant="text" height={100} />
          <Skeleton variant="text" height={20} />
          <Skeleton variant="text" height={20} />
          <Skeleton variant="rectangular" height={300} />
        </Stack>
      ) : (
        <>
          <Empresas setLoading={setLoading} loading={loading} setChaveEmpresa={setChaveEmpresa} chaveEmpresa={chaveEmpresa} key={chaveEmpresa}/>
          <Add setLoading={setLoading} loading={loading} setChaveEmpresa={setChaveEmpresa} chaveEmpresa={chaveEmpresa} />
        </>
      )}
      
    </Box>
  );
};

export default Feed;
