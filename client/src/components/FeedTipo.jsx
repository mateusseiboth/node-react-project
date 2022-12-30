import { Box, Stack, Skeleton } from "@mui/material";
import React, { useState } from "react";
import Tipos from "./Tipos";
import Add from "./AddTipo";
const Feed = () => {
  const [loading, setLoading] = useState(true);
  const [chaveTipos, setChaveTipos] = useState(1);

  setTimeout(() => {
    setLoading(false);
  }, [1000]);

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
          <Tipos />
          <Add setLoading={setLoading} loading={loading} setChaveTipos={setChaveTipos} chaveTipos={chaveTipos} key={chaveTipos}/>
        </>
      )}
    </Box>
  );
};

export default Feed;
