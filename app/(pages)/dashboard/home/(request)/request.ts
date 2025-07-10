import { createClient } from "@/app/(supabase)/client";

export async function fetchUserHabitInfo() {
  const supabase = createClient();

  try {
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (!user || userError) throw userError?.message;

    const { data: profileData, error: profileError } = await supabase
      .from("profiles")
      .select("nickname")
      .eq("id", user.id)
      .single();

    if (profileError) throw profileError;

    const { data, error: fetchError } = await supabase
      .from("habit")
      .select("days_completed")
      .eq("user_id", user.id);

    if (!data || fetchError) throw fetchError.message;

    return {
      username: profileData.nickname,
      data: data,
    };
  } catch (error) {
    console.error(error);
  }
}
