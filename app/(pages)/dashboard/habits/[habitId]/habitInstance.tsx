"use client";

import { useEffect, useState } from "react";
import { singleHabit } from "../(request)/request";
import { Box, Button, Card, Link, Typography } from "@mui/material";
import AccessAlarmIcon from "@mui/icons-material/AccessAlarm";
import CheckIcon from "@mui/icons-material/Check";
import PendingIcon from "@mui/icons-material/Pending";
import TimerModal from "./timerModal";

interface FetchedHabitProps {
  id: string;
}

interface Habit {
  created_at: string;
  days: number;
  description?: string;
  name: string;
  days_completed: number;
  updated_at: string;
  completed_at: string;
}

interface Convertion {
  (dateTime: string): string;
}

const ConvertPastTime: Convertion = function (dateTime) {
  const date = new Date(dateTime);
  const now = new Date();

  const timeDiff = now.getTime() - date.getTime();

  const minute = Math.floor(timeDiff / (1000 * 60));
  const hour = Math.floor(timeDiff / (1000 * 60 * 60));

  if (timeDiff < 1000 * 60 * 60) {
    return `${minute} ${minute === 1 ? "minute" : "minutes"} ago`;
  } else if (timeDiff < 1000 * 60 * 60 * 24) {
    return `${hour} ${hour === 1 ? "hour" : "hours"} ago`;
  }

  const daysPassed = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

  return `${daysPassed} ${daysPassed === 1 ? "day" : "days"} ago`;
};

function areSameDay(day1: Date, day2: Date) {
  return (
    day1.getFullYear() === day2.getFullYear() &&
    day1.getMonth() === day2.getMonth() &&
    day1.getDate() === day2.getDate()
  );
}

export default function FetchedHabit({ id }: FetchedHabitProps) {
  const [habit, setHabit] = useState<Habit>();
  const [open, setOpen] = useState<boolean>(false);
  const [reload, setReload] = useState<boolean>(false);
  const [doneToday, setDoneToday] = useState<boolean>();

  useEffect(() => {
    async function fetchData(id: string) {
      const data = await singleHabit(id);
      setHabit(data);

      const dateNow = new Date();
      const updated_at = new Date(data?.updated_at!);

      setDoneToday(areSameDay(dateNow, updated_at));
    }

    fetchData(id);
  }, [reload]);

  function handleOpen() {
    setOpen(!open);
  }

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Link href="/dashboard/habits">
        <Button
          variant="contained"
          size="small"
          sx={{
            mt: "20px",
            ml: "20px",
            backgroundColor: "rgb(248, 158, 56)",
            color: "black",
            fontWeight: "bold",
          }}
        >
          Back to list
        </Button>
      </Link>
      <Card
        sx={{
          margin: "20px",
          padding: "20px",
          backgroundColor: "rgb(255, 231, 134)",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography variant="h3" sx={{ opacity: !habit ? "0.5" : "" }}>
          {!habit ? "Habit" : habit.name}
        </Typography>
        <Typography
          sx={{
            fontSize: "14px",
            textAlign: "justify",
            opacity: !habit ? "0.5" : "",
          }}
        >
          {!habit ? "Loading... " : habit?.description}
        </Typography>
        <Typography
          sx={{ alignSelf: "flex-end", fontWeight: "bold", fontSize: "14px" }}
        >
          {!habit ? "Loading..." : ConvertPastTime(habit?.created_at!)}
        </Typography>
      </Card>
      <Card
        sx={{
          backgroundColor: "rgb(255, 191, 120)",
          margin: "0 20px",
          padding: "40px 20px",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(80px, 1fr))",
          gap: "10px",
        }}
      >
        {habit?.days &&
          Array.from({ length: habit.days }).map((_, index) => {
            return (
              <Button
                onClick={handleOpen}
                startIcon={
                  habit.days_completed >= index + 1 ? (
                    <CheckIcon />
                  ) : habit.days_completed + 1 === index + 1 ? (
                    <AccessAlarmIcon />
                  ) : (
                    <PendingIcon />
                  )
                }
                variant="contained"
                color={
                  habit.days_completed >= index + 1
                    ? "success"
                    : habit.days_completed + 1 === index + 1
                    ? undefined
                    : "error"
                }
                key={index}
                sx={{
                  "& .MuiButton-startIcon": { margin: 0 },

                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  fontWeight: "bold",
                  color: "white",
                  pointerEvents:
                    habit.days_completed + 1 === index + 1 ? "" : "none",
                  opacity: habit.days_completed + 1 === index + 1 ? "" : "0.5",
                  backgroundColor:
                    habit.days_completed + 1 === index + 1
                      ? "rgb(0, 128, 0)"
                      : "",
                }}
              >
                Day {index + 1}
              </Button>
            );
          })}
        <TimerModal
          open={open}
          setOpen={setOpen}
          doneToday={doneToday}
          setReload={setReload}
          id={id}
          days_completed={habit?.days_completed}
          completed_at={habit?.completed_at}
        />
      </Card>
    </Box>
  );
}
