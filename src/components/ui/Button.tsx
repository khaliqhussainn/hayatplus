"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ReactNode } from "react";

type ButtonVariant = "primary" | "secondary";

interface BaseButtonProps {
  children: ReactNode;
  variant?: ButtonVariant;
  icon?: ReactNode;
  className?: string;
  disabled?: boolean;
}

interface LinkButtonProps extends BaseButtonProps {
  href: string;
  onClick?: never;
  type?: never;
}

interface ClickButtonProps extends BaseButtonProps {
  href?: never;
  onClick?: () => void;
  type?: "button" | "submit";
}

type ButtonProps = LinkButtonProps | ClickButtonProps;

const base =
  "inline-flex items-center justify-center gap-2 rounded-[18px] px-8 py-3.5 text-sm font-semibold tracking-wide transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed";

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-forest text-white hover:bg-forest-dark shadow-[0_10px_30px_-12px_rgba(46,107,74,0.55)]",
  secondary:
    "border border-line bg-white text-ink hover:border-forest hover:text-forest",
};

export default function Button({
  href,
  onClick,
  type = "button",
  disabled,
  children,
  variant = "primary",
  icon,
  className = "",
}: ButtonProps) {
  return (
    <motion.div
      whileHover={disabled ? undefined : { scale: 1.03 }}
      whileTap={disabled ? undefined : { scale: 0.97 }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
      className="inline-block"
    >
      {href ? (
        <Link href={href} className={`${base} ${variants[variant]} ${className}`}>
          {children}
          {icon}
        </Link>
      ) : (
        <button
          type={type}
          onClick={onClick}
          disabled={disabled}
          className={`${base} ${variants[variant]} ${className}`}
        >
          {children}
          {icon}
        </button>
      )}
    </motion.div>
  );
}
