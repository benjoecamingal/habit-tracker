import FetchedHabit from "./habitInstance";

export default async function Habit({
  params,
}: {
  params: Promise<{ habitId: string }>;
}) {
  const { habitId } = await params;

  return <FetchedHabit id={habitId} />;
}
