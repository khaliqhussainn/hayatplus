import Link from "next/link";
import Image from "next/image";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-beige">
      <header className="border-b border-line bg-white">
        <div className="mx-auto w-full max-w-7xl px-6 sm:px-8 lg:px-12 flex items-center justify-between py-4">
          <div className="flex items-center gap-3">
            <Image
              src="/images/logo/hayat-logo.png"
              alt="Hayat+"
              width={900}
              height={293}
              priority
              className="h-8 w-auto"
            />
            <span className="text-ink/50 font-semibold text-sm border-l border-line pl-3">
              Admin
            </span>
          </div>
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
