import { redirect } from "next/navigation";
import { createClient } from "@/app/(supabase)/client";

const supabase = createClient();

export async function getProfile() {
  try {
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      redirect("/login");
    }

    const userEmail = user.email;
    const userCreatedAt = user.created_at;

    const { data, error: profileError } = await supabase
      .from("profiles")
      .select("nickname")
      .eq("id", user.id)
      .single();

    if (profileError) throw profileError;

    return {
      nickname: data.nickname,
      email: userEmail,
      creation: userCreatedAt,
    };
  } catch (error) {
    console.error(error);
  }
}

export async function updateProfile(nickname: string) {
  try {
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (!user || userError) redirect("/login");

    const { data, error: updateError } = await supabase
      .from("profiles")
      .update({ nickname: nickname })
      .eq("id", user.id)
      .select();

    if (updateError) throw updateError;
    return data[0]?.nickname;
  } catch (error) {
    console.error(error);
  }
}
