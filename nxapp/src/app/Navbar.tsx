
import Link from "next/link";

export default function Navbar() {
  return (
    <nav
      style={{
        display: "flex",
        gap: "25px",
        padding: "20px",
        backgroundColor: "#eeeeee",
      }}
    >
      <Link href="/">Home</Link>
      <Link href="/login">Login</Link>
      <Link href="/contact">Contact</Link>
    </nav>
  );
}
