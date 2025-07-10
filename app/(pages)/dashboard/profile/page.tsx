"use client";

import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
} from "@mui/material";
import { Logout } from "../logout";
import { getProfile, updateProfile } from "../(request)/request";
import { useEffect, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";

interface Profile {
  nickname?: string;
  email?: string;
  creation: string;
}

interface Conversion {
  (dateTime: string): string;
}

const convertUTCtoPHT: Conversion = function (dateTime) {
  const date = new Date(dateTime);
  return date.toLocaleString("en-PH", {
    timeZone: "Asia/Manila",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export default function Profile() {
  const [profile, setProfile] = useState<Profile>();
  const [edit, setEdit] = useState(false);
  const [updateData, setUpdateData] = useState<string>("");

  useEffect(() => {
    async function fetchData() {
      const data = await getProfile();

      setProfile(data);
    }

    fetchData();
  }, [profile]);
  return (
    <>
      <Box
        sx={{
          width: "100%",
          height: { xs: "30%", lg: "50%" },
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: "bold", mt: "10px" }}>
          Profile Menu
        </Typography>
        <Card sx={{ minWidth: "350px" }}>
          {!profile ? (
            <CardContent>
              <Typography variant="h5">Please wait...</Typography>
            </CardContent>
          ) : (
            <CardContent
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              {edit ? (
                <TextField
                  size="small"
                  placeholder={profile?.nickname}
                  onChange={(e) => setUpdateData(e.target.value)}
                />
              ) : (
                <Typography
                  variant="h4"
                  sx={{ display: "flex", alignItems: "center" }}
                >
                  {profile?.nickname}
                  <Button
                    onClick={() => setEdit(true)}
                    startIcon={<EditIcon />}
                    sx={{
                      minWidth: 0,
                      padding: 0,
                      marginLeft: 1,
                      "& .MuiButton-startIcon": { marginRight: 0 },
                    }}
                  />
                </Typography>
              )}

              <Typography>{profile?.email}</Typography>
              <Typography sx={{ fontSize: "14px", mb: "5px" }}>
                created on{" "}
                {profile?.creation ? convertUTCtoPHT(profile?.creation) : ""}
              </Typography>
              {edit ? (
                <Box sx={{ display: "flex", gap: 2 }}>
                  <Button
                    onClick={() => setEdit(false)}
                    variant="contained"
                    sx={{ backgroundColor: "red" }}
                  >
                    Cancel Editing
                  </Button>
                  <Button
                    onClick={async () => {
                      const nickname = await updateProfile(updateData);

                      setProfile((prevData) =>
                        prevData
                          ? { ...prevData, nickname: nickname }
                          : undefined
                      );
                      setEdit(false);
                    }}
                    variant="contained"
                  >
                    Submit Update
                  </Button>
                </Box>
              ) : (
                ""
              )}
            </CardContent>
          )}
        </Card>
        <Logout />
      </Box>
    </>
  );
}
