import Link from "next/link";
import styles from "./navbar.module.css";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import NavbarPopover from "./NavbarPopover";

export default async function Navbar() {
  const session = await getServerSession(authOptions);
  // console.log(data);
  console.log(session);

  if (!session) {
    redirect("/api/auth/signin");
  }

  return (
    <nav className="sticky flex h-16 w-full justify-between gap-6 border-gray-200 px-6 shadow">
      <div className="flex gap-6">
        <Link
          className={`${styles.navLink} !border-indigo-500 !text-gray-900`}
          href="/"
        >
          Dashboard
        </Link>
        <Link className={`${styles.navLink}`} href={{ pathname: "/students" }}>
          Students
        </Link>
        <Link className={`${styles.navLink}`} href={{ pathname: "/kiosks" }}>
          Kiosks
        </Link>
      </div>
      <div className="flex items-center">
        <NavbarPopover />
      </div>
    </nav>
  );
}
