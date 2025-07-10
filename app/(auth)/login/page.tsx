"use client";

import { Box, Button, Divider, TextField, Typography } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import Link from "@mui/material/Link";
import { useState } from "react";
import { createClient } from "../../(supabase)/client";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();
  const supabase = createClient();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  async function handleSubmit(e: any) {
    e.preventDefault();
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });

      if (error) throw error.message;
      console.log(data);
      alert("Successfully Log In.");
      router.push("/dashboard/home");
    } catch (error) {
      alert(error);
    }
  }

  async function handleLoginGoogle() {
    const currentOrigin = "http://localhost:3000";
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${currentOrigin}/callback`,
        queryParams: {
          access_type: "offline",
          prompt: "consent",
        },
      },
    });
  }
  return (
    <>
      <Box
        sx={{
          width: { xs: "100%", lg: "80%" },
          display: "grid",
          gridTemplateColumns: { xs: "none", lg: "repeat(2, 1fr)" },
          borderRight: "1px solid rgb(112, 112, 112)",
          borderLeft: "1px solid rgb(112, 112, 112)",
          borderRadius: "20px",
        }}
      >
        <Box
          sx={{
            bgcolor: "rgb(158, 163, 163)",
            height: { lg: "100vh" },
            py: { xs: "20px", lg: "none" },
            display: "flex",
            justifyContent: "center",
            alignItems: "center",

            borderBottomRightRadius: { xs: "20px", lg: "none" },
            borderTopLeftRadius: { xs: "none", lg: "20px" },
            borderBottomLeftRadius: "20px",
          }}
        >
          <Typography
            sx={{
              backgroundColor: "orange",
              px: "20px",
              py: "10px",
              borderRadius: "15px",
              typography: { xs: "h4", lg: "h2" },
            }}
          >
            Habit Tracker
          </Typography>
        </Box>
        <Box
          sx={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              mb: "20px",
            }}
          >
            <Typography variant="h6">Login</Typography>
            <Typography
              sx={{
                color: "rgb(82, 76, 75)",
                fontSize: "16px",
                fontStyle: "italic",
              }}
            >
              Your habit partner.
            </Typography>
            <TextField
              variant="outlined"
              label="Email"
              size="small"
              sx={{ maxWidth: "350px" }}
              margin="dense"
              fullWidth={true}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
            <TextField
              variant="outlined"
              label="Password"
              type="password"
              size="small"
              sx={{ maxWidth: "350px", mb: "20px" }}
              margin="dense"
              fullWidth={true}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
            <Button variant="contained" type="submit">
              Submit
            </Button>
          </Box>
          <Divider variant="middle" flexItem={true} sx={{ mb: "20px" }}>
            or
          </Divider>
          <Button
            onClick={handleLoginGoogle}
            variant="contained"
            size="large"
            sx={{ bgcolor: "green", mb: "10px" }}
          >
            <GoogleIcon sx={{ mr: "10px" }} />
            Login with Google
          </Button>
          <Typography>
            Don't have an account?{" "}
            <Link
              href="/register"
              color="textPrimary"
              sx={{ fontWeight: "bold" }}
            >
              Register.
            </Link>
          </Typography>
        </Box>
      </Box>
    </>
  );
}
