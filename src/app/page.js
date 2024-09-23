import LoginPage from "@/containers/login";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <div>Welcome!</div>
      <div>
        <Link href="/login">Login</Link>
      </div>
    </div>
  );
}
