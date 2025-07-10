// components/countDown.tsx
"use client";

import { Box, Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { updateDateHabit } from "./(request)/request";

const TIMER_DURATION = 18 * 60;
const END_TIME_KEY = "countdown_end_time";
const REMAINING_TIME_KEY = "countdown_remaining_time";
const IS_RUNNING_KEY = "countdown_is_running";

interface CountdownCircleProps {
  reload: React.Dispatch<React.SetStateAction<boolean>>;
  id: string;
  days_completed: number;
}

export default function CountdownCircle({
  reload,
  id,
  days_completed,
}: CountdownCircleProps) {
  const [remainingTime, setRemainingTime] = useState<number>(() => {
    if (typeof window === "undefined") {
      return TIMER_DURATION;
    }
    const endTime = localStorage.getItem(END_TIME_KEY);
    const storedRemainingTime = localStorage.getItem(REMAINING_TIME_KEY);
    const wasRunning = localStorage.getItem(IS_RUNNING_KEY) === "true";

    if (wasRunning && endTime) {
      const diff = Math.floor((parseInt(endTime) - Date.now()) / 1000);
      return diff > 0 ? diff : 0;
    } else if (storedRemainingTime) {
      const parsedTime = parseInt(storedRemainingTime);
      return parsedTime > 0 ? parsedTime : 0;
    }
    return TIMER_DURATION;
  });

  const [trigger, setTrigger] = useState<boolean>(() => {
    if (typeof window === "undefined") {
      return false;
    }
    return localStorage.getItem(IS_RUNNING_KEY) === "true";
  });

  const [key, setKey] = useState<number>(0);

  useEffect(() => {
    if (trigger && remainingTime > 0) {
      const endTime = Date.now() + remainingTime * 1000;
      localStorage.setItem(END_TIME_KEY, endTime.toString());
      localStorage.setItem(IS_RUNNING_KEY, "true");
      localStorage.removeItem(REMAINING_TIME_KEY);
    } else {
      localStorage.setItem(REMAINING_TIME_KEY, remainingTime.toString());
      localStorage.setItem(REMAINING_TIME_KEY, "false");
      localStorage.removeItem(END_TIME_KEY);
    }

    return () => {
      localStorage.setItem(REMAINING_TIME_KEY, remainingTime.toString());
      localStorage.setItem(IS_RUNNING_KEY, trigger.toString());
      if (trigger && remainingTime > 0) {
        localStorage.setItem(
          END_TIME_KEY,
          (Date.now() + remainingTime * 1000).toString()
        );
      } else {
        localStorage.removeItem(END_TIME_KEY);
      }
    };
  }, [trigger, remainingTime]);

  const handleToggle = () => {
    setTrigger((prev) => !prev);
  };

  async function updateDate() {
    const now = new Date();
    await updateDateHabit(now.toISOString(), id, days_completed);
    reload((prevState) => !prevState);
  }

  const handleComplete = () => {
    localStorage.removeItem(END_TIME_KEY);
    localStorage.removeItem(REMAINING_TIME_KEY);
    localStorage.removeItem(IS_RUNNING_KEY);
    setRemainingTime(TIMER_DURATION);
    setTrigger(false);
    setKey((prev) => prev + 1);

    updateDate();
  };

  const handleUpdate = (newRemainingTime: number) => {
    if (newRemainingTime !== remainingTime) {
      setRemainingTime(newRemainingTime);
    }
  };

  function renderTime({ remainingTime }: { remainingTime: number }) {
    const minutes = Math.floor(remainingTime / 60);
    const seconds = remainingTime % 60;
    return (
      <Typography variant="h4">
        {`${minutes.toString().padStart(2, "0")}:${seconds
          .toString()
          .padStart(2, "0")}`}
      </Typography>
    );
  }

  const handleReset = () => {
    localStorage.removeItem(END_TIME_KEY);
    localStorage.removeItem(REMAINING_TIME_KEY);
    localStorage.removeItem(IS_RUNNING_KEY);
    setRemainingTime(TIMER_DURATION);
    setTrigger(false);
    setKey((prev) => prev + 1);
  };

  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <CountdownCircleTimer
        isPlaying={trigger}
        duration={TIMER_DURATION}
        initialRemainingTime={remainingTime}
        key={key}
        colors={["#FF7D29", "#A30000"]}
        colorsTime={[18 * 60, 5 * 60]}
        onComplete={handleComplete}
        onUpdate={handleUpdate}
      >
        {renderTime}
      </CountdownCircleTimer>
      <Box sx={{ mt: 2, display: "flex", gap: 2 }}>
        <Button
          onClick={handleToggle}
          variant="contained"
          sx={{ backgroundColor: "rgb(123, 64, 25)" }}
        >
          {trigger
            ? "Pause"
            : !trigger && remainingTime === TIMER_DURATION
            ? "Start"
            : "Continue"}
        </Button>
        <Button
          onClick={handleReset}
          variant="outlined"
          sx={{
            color: "rgb(123, 64, 25)",
            border: "1px rgb(123, 64, 25) solid",
          }}
        >
          Reset
        </Button>
      </Box>
    </Box>
  );
}
