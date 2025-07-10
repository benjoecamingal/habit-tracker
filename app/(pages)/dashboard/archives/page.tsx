"use client";

import { Box } from "@mui/material";
import { useState } from "react";
import ListArchiveHabit from "./listArchiveHabit";

export default function Archives() {
  return (
    <Box
      sx={{
        width: "100%",
        height: "80vh",
        position: "relative",
        overflowY: "auto",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box sx={{ flex: 1 }}>
        <ListArchiveHabit />
      </Box>
    </Box>
  );
}
