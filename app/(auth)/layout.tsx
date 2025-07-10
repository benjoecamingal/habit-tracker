import { Box } from "@mui/material";
import React from "react";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";

export default function RootAuth({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AppRouterCacheProvider>
        <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
          {children}
        </Box>
      </AppRouterCacheProvider>
    </>
  );
}
