import { createClient } from "@/app/(supabase)/client";

export async function listArchiveHabit() {
  const supabase = createClient();

  try {
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (!user || userError) throw userError?.message;

    const { data, error: fetchError } = await supabase
      .from("habit")
      .select(" days, description, name, days_completed, id, completed_at ")
      .eq("user_id", user.id)
      .eq("days_completed", 18)
      .order("created_at", { ascending: false });

    if (fetchError) throw fetchError.message;

    return data;
  } catch (error) {
    console.error(error);
  }
}
