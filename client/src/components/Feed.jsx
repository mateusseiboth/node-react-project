import { Box, Stack, Skeleton } from "@mui/material";
import React, { useState } from "react";
import Empresas from "./Empresas";
import Add from "./AddEmpresa";
const Feed = () => {
  const [loading, setLoading] = useState(true);

  setTimeout(() => {
    setLoading(false);
  }, [100]);

  return (
    <Box flex={5} p={{ xs: 0, md: 3 }}>
      {loading ? (
        <Stack spacing={1}>
          <Skeleton variant="text" height={100} />
          <Skeleton variant="text" height={20} />
          <Skeleton variant="text" height={20} />
          <Skeleton variant="rectangular" height={300} />
        </Stack>
      ) : (
        <>
          <Empresas />
          <Add />
        </>
      )}
    </Box>
  );
};

export default Feed;
