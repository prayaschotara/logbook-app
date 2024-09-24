import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="text-4xl font-bold">Welcome!</div>
      <div>
        <Button>
          <Link href="/login">Login</Link>
        </Button>
      </div>
    </div>
  );
}
