import Link from "next/link";
import styles from "./Navbar.module.css";
import React from "react";

export default function Navbar() {
  return (
    <div className={styles.navbar}>
      <Link href="/">Home</Link>
      <Link href="/live">Live</Link>
      <Link href="/record">Record</Link>
      <Link href="/students">Students</Link>
    </div>
  );
}
