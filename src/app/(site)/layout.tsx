import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PromoBar from "@/components/layout/PromoBar";
import { CartProvider } from "@/lib/cart-context";

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <CartProvider>
      <PromoBar />
      <Header />
      <main>{children}</main>
      <Footer />
    </CartProvider>
  );
}
