import { Box, Stack, Skeleton } from "@mui/material";
import React, { useState } from "react";
import Tipos from "./Tipos";
import Add from "./AddTipo";
const Feed = () => {
  const [loading, setLoading] = useState(true);

  setTimeout(() => {
    setLoading(false);
  }, [3000]);

  return (
    <Box flex={12} p={{ xs: 0, md: 10 }} minHeight="900px">
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
          <Add />
        </>
      )}
    </Box>
  );
};

export default Feed;
