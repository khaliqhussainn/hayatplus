import Link from "next/link";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-beige">
      <header className="border-b border-line bg-white">
        <div className="mx-auto w-full max-w-7xl px-6 sm:px-8 lg:px-12 flex items-center justify-between py-4">
          <span className="text-lg font-extrabold tracking-tight text-forest">
            Hayat<span className="text-gold">+</span>{" "}
            <span className="text-ink/50 font-semibold text-sm align-middle">Admin</span>
          </span>
          <Link
            href="/"
            className="text-sm font-medium text-ink/60 hover:text-forest transition-colors"
          >
            View Site →
          </Link>
        </div>
      </header>
      {children}
    </div>
  );
}
