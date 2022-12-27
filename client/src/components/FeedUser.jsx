import { Box, Stack, Skeleton } from "@mui/material";
import React, { useState } from "react";
import Users from "./Users";
import Add from "./AddUser";
const Feed = () => {
  const [loading, setLoading] = useState(true);
  const [chaveUsers, setChaveUsers] = useState(1);

  setTimeout(() => {
    setLoading(false);
  }, [1000]);

  return (
    <Box flex={12} p={{ xs: 0, md: 11 }} minHeight="900px">
      {loading ? (
        <Stack spacing={1}>
          <Skeleton variant="text" height={100} />
          <Skeleton variant="text" height={20} />
          <Skeleton variant="text" height={20} />
          <Skeleton variant="rectangular" height={300} />
        </Stack>
      ) : (
        <>
          <Users setLoading={setLoading} loading={loading} setChaveUsers={setChaveUsers} chaveUsers={chaveUsers} key={chaveUsers}/>
          <Add setLoading={setLoading} loading={loading} setChaveUsers={setChaveUsers} chaveUsers={chaveUsers} key={chaveUsers}/>
        </>
      )}
    </Box>
  );
};

export default Feed;
