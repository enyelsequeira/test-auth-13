import Image from "next/image";
import { Inter } from "next/font/google";
import { Buttons } from "./components/buttons";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";

const inter = Inter({ subsets: ["latin"] });

export default async function Home() {
  const session = await getServerSession(authOptions);
  console.log({ session });
  return (
    <div className="bg-red-200 text-black mx-auto flex flex-col min-h-screen items-center justify-center">
      <p>
        Logged in{session?.user?.name} {session?.user?.email}
      </p>
      <div className="flex flex-col gap-y-2  text-black">
        <Buttons />
      </div>
    </div>
  );
}
