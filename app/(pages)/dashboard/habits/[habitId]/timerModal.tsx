import { Modal, Card, Button, CardContent, Typography } from "@mui/material";
import CountdownCircle from "../countDown";
import React from "react";

interface TimerModalProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  doneToday: boolean | undefined;
  setReload: React.Dispatch<React.SetStateAction<boolean>>;
  id: string;
  days_completed: number | undefined;
  completed_at: string | undefined;
}

export default function TimerModal({
  open,
  setOpen,
  doneToday,
  setReload,
  id,
  days_completed,
  completed_at,
}: TimerModalProps) {
  function handleOpen() {
    setOpen(!open);
  }

  return (
    <Modal
      open={open}
      sx={{
        height: "100%",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: { xs: "flex-start", lg: "center" },
        paddingTop: "70px",
      }}
    >
      <Card
        sx={{
          padding: "30px 30px",
          backgroundColor: "rgb(255, 238, 169)",
          width: "70%",
          maxWidth: "500px",
        }}
      >
        <Button
          variant="contained"
          size="small"
          sx={{ backgroundColor: "rgb(255, 191, 120)", color: "black" }}
          onClick={handleOpen}
        >
          Back
        </Button>
        <CardContent sx={{ mx: "20px" }}>
          {!doneToday ? (
            <CountdownCircle
              reload={setReload}
              id={id}
              days_completed={days_completed!}
            />
          ) : completed_at ? (
            <Typography variant="h4" sx={{ textAlign: "center" }}>
              Congratulations! You've been able to start a momentum for your
              habit. You can continue from here yourself.
            </Typography>
          ) : (
            <Typography variant="h4" sx={{ textAlign: "center" }}>
              Wow! You are very consistent, please comeback tomorrow.
            </Typography>
          )}
        </CardContent>
      </Card>
    </Modal>
  );
}
