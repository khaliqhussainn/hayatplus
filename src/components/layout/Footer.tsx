import Link from "next/link";
import { FiMessageCircle, FiInstagram, FiMail, FiPhone } from "react-icons/fi";
import Container from "@/components/ui/Container";
import { footerLinks, socialLinks } from "@/lib/data";

const socialIconMap = {
  whatsapp: FiMessageCircle,
  instagram: FiInstagram,
  email: FiMail,
  phone: FiPhone,
};

function FooterLinkGroup({
  title,
  links,
}: {
  title: string;
  links: ReadonlyArray<{ href: string; label: string }>;
}) {
  return (
    <div className="flex flex-col gap-4">
      <span className="text-sm font-semibold text-ink">{title}</span>
      <nav className="flex flex-col gap-3">
        {links.map((link, index) => (
          <Link
            key={`${link.label}-${index}`}
            href={link.href}
            className="text-sm text-ink/60 hover:text-forest transition-colors w-fit"
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </div>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line bg-beige">
      <Container className="py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          <div className="flex flex-col gap-4">
            <span className="text-xl font-extrabold tracking-tight text-forest">
              Hayat<span className="text-gold">+</span>
            </span>
            <p className="text-sm text-ink/60 leading-relaxed max-w-xs">
              Natural herbal support for a healthier you.
            </p>
          </div>

          <FooterLinkGroup title="Quick Links" links={footerLinks.quickLinks} />
          <FooterLinkGroup title="Company" links={footerLinks.company} />
          <FooterLinkGroup title="Support" links={footerLinks.support} />
        </div>

        <div className="mt-12 pt-8 border-t border-line/70 flex flex-col sm:flex-row items-center justify-between gap-6">
          <span className="text-xs text-ink/50 order-2 sm:order-1">
            © {year} Hayat+. All rights reserved.
          </span>

          <div className="flex flex-col items-center gap-3 order-1 sm:order-2">
            <span className="text-xs font-semibold uppercase tracking-[0.15em] text-ink/50">
              Connect With Us
            </span>
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => {
                const Icon = socialIconMap[social.key];
                return (
                  <a
                    key={social.key}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="inline-flex items-center justify-center w-9 h-9 rounded-full border border-line text-ink/60 hover:text-forest hover:border-forest transition-colors"
                  >
                    <Icon size={16} />
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}
