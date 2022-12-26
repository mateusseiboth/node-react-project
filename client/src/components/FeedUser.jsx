import { Box, Stack, Skeleton } from "@mui/material";
import React, { useState } from "react";
import Users from "./Users";
import Add from "./AddUser";
const Feed = () => {
  const [loading, setLoading] = useState(true);

  setTimeout(() => {
    setLoading(false);
  }, [100]);

  return (
    <Box flex={12} p={{ xs: 0, md: 11 }}>
      {loading ? (
        <Stack spacing={1}>
          <Skeleton variant="text" height={100} />
          <Skeleton variant="text" height={20} />
          <Skeleton variant="text" height={20} />
          <Skeleton variant="rectangular" height={300} />
        </Stack>
      ) : (
        <>
          <Users />
          <Add />
        </>
      )}
    </Box>
  );
};

export default Feed;
