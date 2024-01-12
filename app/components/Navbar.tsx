"use client";
import Link from "next/link";
import * as Popover from "@radix-ui/react-popover";
import { ExitIcon, GearIcon } from "@radix-ui/react-icons";
import styles from "./navbar.module.css";

export default function Navbar() {
  return (
    <nav className="sticky flex h-16 w-full justify-between gap-6 border-gray-200 px-6 shadow">
      <div className="flex gap-6">
        <Link
          className={`${styles.navLink} !border-indigo-500 !text-gray-900`}
          href="/"
        >
          Dashboard
        </Link>
        <Link className={`${styles.navLink}`} href="/students">
          Students
        </Link>
        <Link className={`${styles.navLink}`} href="/kiosks">
          Kiosks
        </Link>
      </div>
      <div className="flex items-center">
        <Popover.Root>
          <Popover.Trigger asChild>
            <button className="relative h-8 w-8 overflow-hidden rounded-full">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://xsgames.co/randomusers/avatar.php?g=male"
                className="object-fill"
                alt=""
              />
            </button>
          </Popover.Trigger>
          <Popover.Portal>
            <Popover.Content
              className="mt-2 min-w-36 overflow-hidden rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5"
              align="end"
            >
              <ul className="flex flex-col items-stretch">
                <li>
                  <a
                    className={styles.popupLink}
                    href="/api/auth/[...nextauth]"
                  >
                    <GearIcon />
                    Manage Account
                  </a>
                </li>
                <li>
                  <a
                    className={styles.popupLink}
                    href="/api/auth/[...nextauth]"
                  >
                    <ExitIcon />
                    Log Out
                  </a>
                </li>
              </ul>
            </Popover.Content>
          </Popover.Portal>
        </Popover.Root>
      </div>
    </nav>
  );
}
