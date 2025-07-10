import { useEffect, useState } from "react";
import { listArchiveHabit } from "./(request)/request";
import { Box, Card, CardContent, Typography, Link } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

interface Habit {
  days: number;
  description?: string;
  name: string;
  days_completed: number;
  id: number;
  completed_at: string;
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
    day: "2-digit",
  });
};

export default function ListArchiveHabit() {
  const [habits, setHabits] = useState<Habit[]>();

  useEffect(() => {
    async function fetchData() {
      const habits = await listArchiveHabit();
      setHabits(habits);
    }

    fetchData();
  }, []);

  return !habits ? (
    <Box
      sx={{
        height: "100%",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography variant="h4">Please Wait...</Typography>
    </Box>
  ) : habits.length === 0 ? (
    <Box
      sx={{
        height: "100%",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography
        variant="h5"
        sx={{
          textAlign: "center",
          opacity: "0.6",
          typography: { xs: "body1", lg: "h6" },
        }}
      >
        You have not finished a habit yet.
      </Typography>
    </Box>
  ) : (
    <Box
      sx={{
        maxHeight: "calc(80vh - 30px)",
        padding: "15px 15px 0 15px",
        display: "grid",
        gridTemplateColumns: { xs: "repeat(1, 1fr)", lg: "repeat(3, 1fr)" },
        gap: "10px",
      }}
    >
      {habits?.map((habit, index) => {
        return (
          <Card
            key={index}
            sx={{
              display: "flex",
              flexDirection: "column",
              backgroundColor: "rgb(248, 158, 56)",
              minHeight: "250px",
              maxHeight: "300px",
            }}
          >
            <CardContent
              sx={{
                display: "flex",
                flexDirection: "column",
                height: "100%",
              }}
            >
              <CheckCircleOutlineIcon />
              <Typography
                align="center"
                variant="h5"
                sx={{ textTransform: "uppercase" }}
              >
                {habit.name}
              </Typography>
              <Typography variant="h3" align="center" sx={{}}>
                {habit.days_completed}/{habit.days}
                <Typography sx={{ fontWeight: "bold" }}>
                  days are completed
                </Typography>
              </Typography>
              <Typography
                sx={{
                  fontSize: "12px",
                  flex: 1,
                }}
              >
                {habit.description?.length! > 120
                  ? habit.description?.slice(0, 120).trim() + "..."
                  : habit.description}
              </Typography>
              <Typography
                sx={{
                  fontSize: "15px",
                  fontWeight: "bold",
                }}
              >
                completed on {convertUTCtoPHT(habit.completed_at)}
              </Typography>
            </CardContent>
          </Card>
        );
      })}
    </Box>
  );
}
