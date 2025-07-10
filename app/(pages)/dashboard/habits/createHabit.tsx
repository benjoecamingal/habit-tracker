import { Modal, TextField, Typography, Box, Button } from "@mui/material";
import React, { useState } from "react";
import { insertHabit } from "./(request)/request";
import { useRouter } from "next/navigation";

interface HabitFormData {
  name: string;
  description?: string;
}

interface CreateHabitProps {
  reload: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function CreateHabit({ reload }: CreateHabitProps) {
  const [formData, setFormData] = useState<HabitFormData>({
    name: "",
    description: "",
  });
  const [open, setOpen] = useState<boolean>(false);

  async function handleSubmit(e: any) {
    e.preventDefault();
    await insertHabit(formData.name, formData.description);
    setFormData((prevData) => ({ ...prevData, name: "", description: "" }));
    setOpen(!open);
    reload((prevData) => !prevData);
  }
  return (
    <>
      <Button
        onClick={() => setOpen(!open)}
        variant="contained"
        sx={{
          height: "50px",
          minWidth: "50px",
          maxWidth: "50px",
          padding: 0,
          borderRadius: "25px",
          fontSize: "25px",
          backgroundColor: "rgb(248, 158, 56)",
          color: "black",
        }}
      >
        +
      </Button>
      <Modal
        open={open}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: { xs: "flex-start", lg: "center" },
          paddingTop: { xs: "100px", lg: "none" },
        }}
      >
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            minWidth: { xs: "300px", lg: "500px" },
            backgroundColor: "rgb(255, 245, 204)",
            padding: "20px ",
            borderRadius: "12px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "20px",
          }}
        >
          <Typography variant="h5">Create your next Habit.</Typography>
          <TextField
            label="Name of habit"
            variant="outlined"
            size="small"
            fullWidth
            onChange={(e) =>
              setFormData((prevData) => ({ ...prevData, name: e.target.value }))
            }
          />
          <TextField
            label="Description"
            variant="outlined"
            size="small"
            fullWidth
            multiline
            minRows="3"
            maxRows="4"
            onChange={(e) =>
              setFormData((prevData) => ({
                ...prevData,
                description: e.target.value,
              }))
            }
          />
          <Box sx={{ display: "flex", gap: "30px" }}>
            <Button
              variant="contained"
              color="error"
              onClick={() => {
                setOpen(!open);
                setFormData((prevData) => ({
                  ...prevData,
                  name: "",
                  description: "",
                }));
              }}
            >
              Cancel
            </Button>
            <Button variant="contained" color="success" type="submit">
              Create Entry
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
}
