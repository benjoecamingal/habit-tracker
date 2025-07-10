"use client";

import { useEffect, useState } from "react";
import { getProfile } from "./(request)/request";
import {
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  Link,
  Typography,
} from "@mui/material";
import React from "react";
import { usePathname } from "next/navigation";
import HomeFilledIcon from "@mui/icons-material/HomeFilled";
import ChecklistIcon from "@mui/icons-material/Checklist";
import PersonIcon from "@mui/icons-material/Person";
import ArchiveIcon from "@mui/icons-material/Archive";
import MenuIcon from "@mui/icons-material/Menu";
import { DrawerLists } from "./drawerList";

interface Profile {
  nickname: string;
}

export default function RootDashboard({
  children,
}: {
  children: React.ReactNode;
}) {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const [openDrawer, setOpenDrawer] = useState<boolean>(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsMounted(true);
    async function fetchData() {
      const data = await getProfile();

      if (data) setProfile(data);
    }

    fetchData();
  }, []);

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateRows: "auto 1fr",
        minHeight: "90vh",
      }}
    >
      <Box
        sx={{
          width: "100%",
          backgroundColor: "rgb(123, 64, 25)",
          display: "flex",
          position: "relative",
        }}
      >
        <IconButton onClick={() => setOpenDrawer(!openDrawer)}>
          <MenuIcon
            sx={{
              display: {
                lg: "none",
                position: "absolute",
                top: "50%",
                left: "10px",
                transform: "translateY(-50%)",
                color: "white",
              },
            }}
          />
        </IconButton>
        <Drawer
          open={openDrawer}
          onClose={() => setOpenDrawer(!openDrawer)}
          anchor="top"
        >
          {DrawerLists}
        </Drawer>
        <Typography
          variant="h4"
          sx={{
            my: "10px",
            color: "rgb(223, 223, 223)",
            typography: { xs: "h5", lg: "h4" },
            margin: "auto",
          }}
        >
          Habit Tracker
        </Typography>
      </Box>
      <Box
        sx={{
          display: { xs: "", lg: "grid" },
          gridTemplateColumns: "1fr 3fr",
          height: "100%",
        }}
      >
        <Box
          sx={{
            display: { xs: "none", lg: "flex" },
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-between",
            backgroundColor: "rgb(255, 191, 120)",
          }}
        >
          <Box
            sx={{
              display: "grid",
              gridTemplateRows: "1fr auto 1fr",
              width: "100%",
            }}
          >
            <Link href="/dashboard/home">
              <Button
                startIcon={<HomeFilledIcon />}
                fullWidth={true}
                sx={{
                  backgroundColor:
                    pathname.startsWith("/dashboard/home") && isMounted
                      ? "rgb(255, 125, 41)"
                      : "rgb(255, 191, 120)",
                  color: "black",
                  fontWeight: "bold",
                  borderTopRightRadius: "0",
                  borderBottomRightRadius: "0",
                }}
              >
                Home
              </Button>
            </Link>
            <Divider />
            <Link href="/dashboard/habits">
              <Button
                startIcon={<ChecklistIcon />}
                fullWidth={true}
                sx={{
                  backgroundColor:
                    pathname.startsWith("/dashboard/habits") && isMounted
                      ? "rgb(255, 125, 41)"
                      : "rgb(255, 191, 120)",
                  color: "black",
                  fontWeight: "bold",
                  borderTopRightRadius: "0",
                  borderBottomRightRadius: "0",
                }}
              >
                Habits
              </Button>
            </Link>
            <Divider />
            <Link href="/dashboard/archives">
              <Button
                startIcon={<ArchiveIcon />}
                fullWidth={true}
                sx={{
                  backgroundColor:
                    pathname.startsWith("/dashboard/archives") && isMounted
                      ? "rgb(255, 125, 41)"
                      : "rgb(255, 191, 120)",
                  color: "black",
                  fontWeight: "bold",
                  borderTopRightRadius: "0",
                  borderBottomRightRadius: "0",
                }}
              >
                Archives
              </Button>
            </Link>
          </Box>
          <Link href="/dashboard/profile" sx={{ width: "70%", mb: "10px" }}>
            <Button
              startIcon={<PersonIcon />}
              fullWidth
              sx={{
                backgroundColor:
                  pathname.startsWith("/dashboard/profile") && isMounted
                    ? "rgb(255, 125, 41)"
                    : "rgb(248, 158, 56)",
                color: "black",
                fontWeight: "bold",
              }}
            >
              Profile
            </Button>
          </Link>
        </Box>
        <Box sx={{ backgroundColor: "rgb(255, 238, 169)", height: "100%" }}>
          {children}
        </Box>
      </Box>
    </Box>
  );
}
