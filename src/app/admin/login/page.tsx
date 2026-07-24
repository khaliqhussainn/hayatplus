"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { FiLock, FiLoader } from "react-icons/fi";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Incorrect password");
      }

      router.push("/admin");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="min-h-[70vh] flex items-center py-16">
      <Container className="flex justify-center">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-sm rounded-[18px] border border-line bg-white p-8 flex flex-col gap-5"
        >
          <div className="flex flex-col items-center gap-3 text-center">
            <Image
              src="/images/logo/hayat-logo.png"
              alt="Hayat+"
              width={900}
              height={293}
              priority
              className="h-9 w-auto"
            />
            <span className="flex items-center justify-center w-12 h-12 rounded-full bg-beige text-forest">
              <FiLock size={20} />
            </span>
            <h1 className="text-xl font-bold text-ink">Admin Login</h1>
            <p className="text-sm text-ink/55">
              Enter the admin password to view orders.
            </p>
          </div>

          <label className="flex flex-col gap-1.5">
            <span className="text-xs font-semibold text-ink/70">Password</span>
            <input
              required
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="rounded-[14px] border border-line px-4 py-3 text-sm text-ink focus:outline-none focus:border-forest"
              placeholder="••••••••"
              autoFocus
            />
          </label>

          {error && <p className="text-xs text-red-600">{error}</p>}

          <Button
            type="submit"
            variant="primary"
            disabled={submitting}
            icon={submitting ? <FiLoader className="animate-spin" /> : undefined}
            className="w-full"
          >
            {submitting ? "Signing in…" : "Sign In"}
          </Button>
        </form>
      </Container>
    </section>
  );
}
