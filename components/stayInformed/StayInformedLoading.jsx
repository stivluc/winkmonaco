import { Box, Skeleton } from "@mui/material";
import React from "react";

const StayInformedLoading = () => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Skeleton animation='wave' variant='rectangular' sx={{ fontSize: "1rem", borderRadius: "10px", margin: "2rem 0 0.5rem" }} />
      <Skeleton animation='wave' variant='rectangular' sx={{ fontSize: "1rem", borderRadius: "10px", margin: "0.5rem auto", width: "80%" }} />
      <Skeleton animation='wave' variant='rectangular' sx={{ fontSize: "1rem", borderRadius: "10px", margin: "0.5rem auto", width: "90%" }} />
      <Skeleton animation='wave' variant='rectangular' sx={{ fontSize: "1rem", borderRadius: "10px", margin: "0.5rem auto", width: "50%" }} />
      <Skeleton animation='wave' variant='rectangular' sx={{ fontSize: "15rem", borderRadius: "10px", margin: "2rem auto", width: "90%" }} />
      <Skeleton animation='wave' variant='rectangular' sx={{ fontSize: "1rem", borderRadius: "10px", margin: "0.5rem auto", width: "80%" }} />
      <Skeleton animation='wave' variant='rectangular' sx={{ fontSize: "1rem", borderRadius: "10px", margin: "0.5rem auto", width: "90%" }} />
      <Skeleton animation='wave' variant='rectangular' sx={{ fontSize: "1rem", borderRadius: "10px", margin: "0.5rem auto", width: "50%" }} />
    </Box>
  );
};

export default StayInformedLoading;
