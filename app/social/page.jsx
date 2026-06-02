import { auth } from "@/auth";
import { redirect } from "next/navigation";
import SocialAuth from "./socialAuth";

export default function SocialPage() {
  const session = auth();

  // if (session) {
  //   redirect("/setup");
  // }

  return <SocialAuth />;
}