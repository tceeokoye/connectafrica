import { redirect } from "next/navigation";

export default function BlogPostRedirect() {
  redirect("/about");
}
