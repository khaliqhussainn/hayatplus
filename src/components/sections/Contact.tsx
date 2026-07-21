import { FiMessageCircle, FiMail, FiPhone } from "react-icons/fi";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import FadeIn from "@/components/ui/FadeIn";
import { contactInfo, socialLinks } from "@/lib/data";

const contactMethods = [
  {
    icon: FiMessageCircle,
    label: "WhatsApp",
    value: contactInfo.whatsapp,
    href: `https://wa.me/${contactInfo.whatsapp.replace(/[^\d]/g, "")}`,
  },
  {
    icon: FiMail,
    label: "Email",
    value: contactInfo.email,
    href: `mailto:${contactInfo.email}`,
  },
  {
    icon: FiPhone,
    label: "Phone",
    value: contactInfo.phone,
    href: `tel:${contactInfo.phone.replace(/[^\d+]/g, "")}`,
  },
];

export default function Contact() {
  return (
    <section id="contact" className="py-24 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="Get in Touch"
          title="We're Here to Help"
          description="Reach out with any questions about Hayat+ Heart Tonic."
        />

        <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
          {contactMethods.map((method, index) => {
            const Icon = method.icon;
            return (
              <FadeIn key={method.label} delay={index * 0.1}>
                <a
                  href={method.href}
                  className="flex flex-col items-center text-center gap-3 rounded-[18px] border border-line bg-white p-7 hover:border-forest/30 hover:shadow-md transition-all duration-300"
                >
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-forest/10 text-forest">
                    <Icon size={20} />
                  </div>
                  <span className="text-sm font-semibold text-ink">{method.label}</span>
                  <span className="text-xs text-ink/55">{method.value}</span>
                </a>
              </FadeIn>
            );
          })}
        </div>

        <FadeIn delay={0.3}>
          <div className="mt-10 flex justify-center gap-6">
            {socialLinks
              .filter((social) => social.key === "instagram" || social.key === "facebook")
              .map((social) => (
                <a
                  key={social.key}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-medium text-ink/60 hover:text-forest transition-colors underline underline-offset-4"
                >
                  Follow us on {social.label}
                </a>
              ))}
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}
