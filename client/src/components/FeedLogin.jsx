import { Box, Stack, Skeleton } from "@mui/material";
import React, { useState } from "react";
import Input from "./InputLogin";

const Feed = () => {
  const [loading, setLoading] = useState(true);

  setTimeout(() => {
    setLoading(false);
  }, [1000]);

  return (
    <Box align="center" flex={12} p={{ xs: 0, md: 17 }} minHeight="1fr">
      {loading ? (
        <Stack spacing={1}>
          <Skeleton variant="rectangular" height={400} width={1200} />
        </Stack>
      ) : (
        <>
          
          <Input />
        </>
      )}
    </Box>
  );
};

export default Feed;
