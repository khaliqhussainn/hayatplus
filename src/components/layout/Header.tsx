"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { FiMenu, FiX, FiShoppingBag } from "react-icons/fi";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import { navLinks } from "@/lib/data";
import { useCart } from "@/lib/cart-context";

function CartIcon() {
  const { count } = useCart();
  return (
    <Link
      href="/cart"
      aria-label="View cart"
      className="relative inline-flex items-center justify-center w-10 h-10 rounded-full border border-line text-ink hover:text-forest hover:border-forest transition-colors"
    >
      <FiShoppingBag size={18} />
      {count > 0 && (
        <span className="absolute -top-1.5 -right-1.5 flex items-center justify-center min-w-[18px] h-[18px] px-1 rounded-full bg-forest text-white text-[10px] font-bold">
          {count}
        </span>
      )}
    </Link>
  );
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "bg-white/80 backdrop-blur-md border-b border-line shadow-sm"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <Container className="flex items-center justify-between py-5">
        <Link href="#top" className="flex items-center">
          <Image
            src="/images/logo/hayat-logo.png"
            alt="Hayat+"
            width={900}
            height={293}
            priority
            className="h-8 sm:h-9 w-auto"
          />
        </Link>

        <nav className="hidden lg:flex items-center gap-9">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-ink/70 hover:text-forest transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <CartIcon />
          <Button href="/product" variant="primary">
            Order Now
          </Button>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <CartIcon />
          <button
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex items-center justify-center w-10 h-10 rounded-full border border-line text-ink"
          >
            {open ? <FiX size={20} /> : <FiMenu size={20} />}
          </button>
        </div>
      </Container>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="lg:hidden overflow-hidden bg-white border-b border-line"
          >
            <Container className="flex flex-col gap-5 py-6">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="text-base font-medium text-ink/80 hover:text-forest transition-colors"
                >
                  {link.label}
                </Link>
              ))}
              <Button href="/product" variant="primary" className="w-full mt-2">
                Order Now
              </Button>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
