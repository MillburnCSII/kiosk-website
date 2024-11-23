"use client";

import styles from "./navbar.module.css";
import * as Popover from "@radix-ui/react-popover";
import { ExitIcon, GearIcon } from "@radix-ui/react-icons";
import { signOut } from "next-auth/react";

export default function NavbarPopover() {
  return (
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
              <a className={styles.popupLink} href="/api/auth/[...nextauth]">
                <GearIcon />
                Manage Account
              </a>
            </li>
            <li>
              <button className={styles.popupLink} onClick={() => signOut({})}>
                <ExitIcon />
                Log Out
              </button>
            </li>
          </ul>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
