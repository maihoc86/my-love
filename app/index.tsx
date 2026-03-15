import { Redirect } from "expo-router";

export default function Index() {
  // TODO: Replace with auth session check (Supabase)
  // If user is logged in → redirect to /(tabs)
  // If not → redirect to /(auth)/login
  return <Redirect href="/(auth)/login" />;
}
