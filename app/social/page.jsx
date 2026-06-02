import { auth } from "@/auth";
import { redirect } from "next/navigation";
import SocialAuth from "./socialAuth";

export default async function SocialPage() {
  const session = await auth();

  if (session) {
    redirect("/setup");
  }

  console.log(session);

  return <SocialAuth />;
}