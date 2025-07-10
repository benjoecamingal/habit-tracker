import { createClient } from "@/app/(supabase)/client";

export async function listHabit() {
  const supabase = createClient();

  try {
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (!user || userError) throw userError?.message;

    const { data, error: fetchError } = await supabase
      .from("habit")
      .select("created_at, days, description, name, days_completed, id")
      .eq("user_id", user.id)
      .lt("days_completed", 18)
      .order("created_at", { ascending: false });

    if (fetchError) throw fetchError.message;

    return data;
  } catch (error) {
    console.error(error);
  }
}

export async function singleHabit(id: string) {
  const supabase = createClient();

  try {
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (!user || userError) throw userError?.message;

    const { data, error: fetchError } = await supabase
      .from("habit")
      .select(
        "created_at, days, description, name, days_completed, updated_at, completed_at"
      )
      .eq("id", id)
      .single();

    if (fetchError) throw fetchError.message;

    return data;
  } catch (error) {
    console.error(error);
  }
}

export async function insertHabit(name: string, description?: string) {
  const supabase = createClient();

  try {
    const {
      data: { user },
      error: UserError,
    } = await supabase.auth.getUser();

    if (!user || UserError) throw UserError;

    const { error: habitError } = await supabase
      .from("habit")
      .insert({ name: name, description: description });

    if (habitError) throw habitError;
  } catch (error) {
    console.error(error);
  }
}

export async function updateDateHabit(
  updateDate: string,
  id: string,
  days_completed: number
) {
  const supabase = createClient();

  try {
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (!user || userError) throw userError?.message;

    if (days_completed + 1 !== 18) {
      const { error: updateError } = await supabase
        .from("habit")
        .update({ updated_at: updateDate, days_completed: days_completed + 1 })
        .eq("id", id);

      if (updateError) throw updateError.message;
    } else {
      const { error: updateError } = await supabase
        .from("habit")
        .update({
          updated_at: updateDate,
          days_completed: days_completed + 1,
          completed_at: updateDate,
        })
        .eq("id", id);

      if (updateError) throw updateError.message;
    }
  } catch (error) {
    console.error(error);
  }
}
