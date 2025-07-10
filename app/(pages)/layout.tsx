import { Container } from "@mui/material";
import React from "react";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";

export default function RootPage({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AppRouterCacheProvider>
        <Container>{children}</Container>
      </AppRouterCacheProvider>
    </>
  );
}
