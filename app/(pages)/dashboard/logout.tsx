import { redirect } from "next/navigation";
import { createClient } from "@/app/(supabase)/client";
import { Button } from "@mui/material";

export function Logout() {
  const supabase = createClient();
  async function handleLogout() {
    const { error } = await supabase.auth.signOut();
    redirect("/login");
  }
  return (
    <Button
      sx={{
        mb: "10px",
        backgroundColor: "rgb(123, 64, 25)",
        color: "rgb(223, 223, 223)",
      }}
      onClick={handleLogout}
    >
      Logout
    </Button>
  );
}
