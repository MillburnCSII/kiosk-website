"use client";
import { useRouter } from "next/navigation";

export default function DeleteToken({
  token,
  level,
  disabled = false,
}: {
  token: string;
  level: number;
  disabled?: boolean;
}) {
  if (!disabled && !token?.trim()) {
    throw new Error("token is required");
  }
  if (!disabled && (level == null || level == undefined)) {
    throw new Error("level is required");
  }

  const isDisabled = level < 0;

  const router = useRouter();
  return (
    <input
      type="checkbox"
      name=""
      id=""
      checked={disabled ? false : !isDisabled}
      onChange={async () => {
        // const res = await fetch(
        //   `http://localhost:8080/revokeToken?token=${token}`
        // );
        let url = "";
        if (isDisabled) {
          url = `http://localhost:8080/enableToken?token=${token}`;
        } else {
          url = `http://localhost:8080/disableToken?token=${token}`;
        }
        const res = await fetch(url);
        if (!res.ok) {
          // This will activate the closest `error.js` Error Boundary
          throw new Error("Failed to delete token");
        }
        router.refresh();
      }}
    />
  );
}
