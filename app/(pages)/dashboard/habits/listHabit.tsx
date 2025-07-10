import { useEffect, useState } from "react";
import { listHabit } from "./(request)/request";
import { Box, Card, CardContent, Typography, Link } from "@mui/material";

interface ListHabitProps {
  reloadTrigger: boolean;
}

interface Habit {
  created_at: string;
  days: number;
  description?: string;
  name: string;
  days_completed: number;
  id: number;
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

export default function ListHabit({ reloadTrigger }: ListHabitProps) {
  const [habits, setHabits] = useState<Habit[]>();

  useEffect(() => {
    async function fetchData() {
      const habits = await listHabit();
      setHabits(habits);
    }

    fetchData();
  }, [reloadTrigger]);

  console.log(habits?.length);

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
        sx={{
          textAlign: "center",
          opacity: "0.6",
          typography: { xs: "body1", lg: "h6" },
        }}
      >
        You have not created a habit yet. Please click the add button below to
        create one.
      </Typography>
    </Box>
  ) : (
    <Box
      sx={{
        maxHeight: "calc(80vh - 30px)",
        padding: "15px 15px 0 15px",
        display: "grid",
        gridTemplateColumns: { xs: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" },
        gap: "10px",
      }}
    >
      {habits?.map((habit, index) => {
        return (
          <Link
            href={`habits/${habit.id}`}
            sx={{
              textDecoration: "none",
              height: { xs: "300px", lg: "250px" },
            }}
            key={index}
          >
            <Card
              sx={{
                display: "flex",
                flexDirection: "column",
                backgroundColor: "rgb(252, 202, 144)",
                height: "100%",
              }}
            >
              <CardContent
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  height: "100%",
                }}
              >
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
                  started on {convertUTCtoPHT(habit.created_at)}
                </Typography>
              </CardContent>
            </Card>
          </Link>
        );
      })}
    </Box>
  );
}
