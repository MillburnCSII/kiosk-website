import Link from "next/link";

export default function Navbar() {
  return (
    <div>
      <Link href="/home">Home</Link>
      <Link href="/live">Live</Link>
      <Link href="/">Record</Link>
      <Link href="/kiosks">Kiosks</Link>
      <Link href="/tokens">Tokens</Link>
    </div>
  );
}
