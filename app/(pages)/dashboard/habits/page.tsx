"use client";

import { Box } from "@mui/material";
import { useState } from "react";
import CreateHabit from "./createHabit";
import ListHabit from "./listHabit";

export default function Habits() {
  const [reload, setReload] = useState<boolean>(false);

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
        <ListHabit reloadTrigger={reload} />
      </Box>
      <Box
        sx={{
          position: "sticky",
          alignSelf: "flex-end",
          bottom: "25px",
          right: "25px",
          zIndex: 100,
        }}
      >
        <CreateHabit reload={setReload} />
      </Box>
    </Box>
  );
}
