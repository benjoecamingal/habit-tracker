"use client";

import { Box, Button, Link, TextField, Typography } from "@mui/material";
import { createClient } from "../../(supabase)/client";
import { useState } from "react";

export default function Register() {
  const supabase = createClient();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  async function handleSubmit(e: any) {
    e.preventDefault();
    try {
      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
      });
      if (error) throw error.message;

      alert("Please check your email address. ");
    } catch (error) {
      alert(error);
    }
  }
  return (
    <>
      <Box
        sx={{
          width: "80%",
          display: "flex",

          justifyContent: "center",
          borderRight: "1px solid rgb(112, 112, 112)",
          borderLeft: "1px solid rgb(112, 112, 112)",
          borderBottom: "1px solid rgb(112, 112, 112)",
          py: "80px",
          borderRadius: "20px",
        }}
      >
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            width: "80%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{
              backgroundColor: "orange",
              py: "10px",
              px: "8px",
              borderRadius: "13px",
              typography: { xs: "h5", lg: "h4" },
            }}
            gutterBottom={true}
          >
            Habit Checker
          </Typography>
          <Typography variant="h6">Register</Typography>
          <TextField
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            variant="outlined"
            label="Email"
            size="small"
            margin="dense"
            sx={{ maxWidth: "350px" }}
            fullWidth={true}
          />
          <TextField
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            variant="outlined"
            label="Password"
            type="password"
            size="small"
            margin="dense"
            sx={{ maxWidth: "350px", mb: "20px" }}
            fullWidth={true}
          />
          <Button variant="contained" sx={{ mb: "10px" }} type="submit">
            Submit
          </Button>
          <Typography>
            Already has an account.{" "}
            <Link href="/login" color="textPrimary" sx={{ fontWeight: "bold" }}>
              Login
            </Link>
          </Typography>
        </Box>
      </Box>
    </>
  );
}
