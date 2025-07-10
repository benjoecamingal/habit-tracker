"use client";

import { Box, Card, CardContent, Typography } from "@mui/material";
import { fetchUserHabitInfo } from "./(request)/request";
import { useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

interface Habits {
  username: string;
  data: { days_completed: number }[];
}

interface Status {
  completed: number;
  ongoing: number;
}

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Home() {
  const [habits, setHabits] = useState<Habits>();
  const [status, setStatus] = useState<Status>();

  function sortHabits(habits: Habits | null | undefined): Status {
    const status = {
      completed: 0,
      ongoing: 0,
    };

    habits?.data.forEach((habit) => {
      return habit.days_completed === 18
        ? (status.completed += 1)
        : (status.ongoing += 1);
    });

    return status;
  }

  const data = {
    labels: ["Completed", "Ongoing"],
    datasets: [
      {
        data: [status?.completed, status?.ongoing],
        backgroundColor: ["rgb(199, 113, 56)", "rgb(255, 125, 41)"],
        borderColor: ["rgb(248, 158, 56)", "rgb(248, 158, 56)"],
        borderWidth: 1,
      },
    ],
  };
  useEffect(() => {
    async function fetchData() {
      const habits = await fetchUserHabitInfo();
      setHabits(habits);
      setStatus(sortHabits(habits));
    }

    fetchData();
  }, []);

  return (
    <Box
      sx={{
        width: "100%",
        height: { xs: "80%", lg: "100%" },
        display: "grid",
        gridTemplateColumns: { xs: "none", lg: "repeat(2, 1fr)" },
        gridTemplateRows: { xs: "repeat(2, 1fr)", lg: "none" },
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Card sx={{ minWidth: "80%" }}>
          <CardContent
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              backgroundColor: "rgb(255, 191, 120)",
              padding: "40px 20px",
            }}
          >
            {!habits ? (
              <Typography
                sx={{ fontSize: "32px", width: "100%", opacity: "0.6" }}
              >
                Loading...
              </Typography>
            ) : (
              <Typography sx={{ fontSize: "32px", width: "100%" }}>
                Welcome {habits?.username}
              </Typography>
            )}
            <Box sx={{ width: "100%" }}>
              <Typography>You have:</Typography>
              {!habits ? (
                <Typography variant="h5" sx={{ opacity: "0.6" }}>
                  Loading...
                </Typography>
              ) : (
                <>
                  <Box
                    sx={{ display: "flex", alignItems: "center", gap: "10px" }}
                  >
                    <Typography variant="h3">{status?.ongoing}</Typography>
                    <Typography variant="h5"> ongoing habits </Typography>
                  </Box>
                  <Box
                    sx={{ display: "flex", alignItems: "center", gap: "10px" }}
                  >
                    <Typography variant="h3">{status?.completed}</Typography>
                    <Typography variant="h5"> in momentum habits </Typography>
                  </Box>
                </>
              )}
            </Box>
          </CardContent>
        </Card>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: { xs: "flex-start", lg: "center" },
        }}
      >
        <Box
          sx={{
            width: "300px",
          }}
        >
          <Doughnut data={data} />
        </Box>
      </Box>
    </Box>
  );
}
