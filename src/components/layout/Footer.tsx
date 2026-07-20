import Link from "next/link";
import { FiInstagram, FiFacebook, FiTwitter } from "react-icons/fi";
import Container from "@/components/ui/Container";
import { navLinks, contactInfo } from "@/lib/data";

const socialIcons = {
  instagram: FiInstagram,
  facebook: FiFacebook,
  twitter: FiTwitter,
};

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line bg-beige">
      <Container className="py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="flex flex-col gap-4">
            <span className="text-xl font-extrabold tracking-tight text-forest">
              Hayat<span className="text-gold">+</span>
            </span>
            <p className="text-sm text-ink/60 leading-relaxed max-w-xs">
              Nature&apos;s daily support for a healthy heart. A premium herbal
              tonic crafted with care.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <span className="text-sm font-semibold text-ink">Quick Links</span>
            <nav className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-ink/60 hover:text-forest transition-colors w-fit"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex flex-col gap-4">
            <span className="text-sm font-semibold text-ink">Get in Touch</span>
            <p className="text-sm text-ink/60">{contactInfo.email}</p>
            <p className="text-sm text-ink/60">{contactInfo.phone}</p>
            <div className="flex items-center gap-3 mt-1">
              {(["instagram", "facebook", "twitter"] as const).map((key) => {
                const Icon = socialIcons[key];
                return (
                  <a
                    key={key}
                    href={`https://${key}.com/hayatplus`}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={key}
                    className="inline-flex items-center justify-center w-9 h-9 rounded-full border border-line text-ink/60 hover:text-forest hover:border-forest transition-colors"
                  >
                    <Icon size={16} />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-line/70 text-xs text-ink/50 text-center">
          © {year} Hayat+. All rights reserved.
        </div>
      </Container>
    </footer>
  );
}
