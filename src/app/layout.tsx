import { Montserrat } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { CartProvider } from "@/context/CartContext";
import { WishlistProvider } from "@/context/WishlistContext";
import Navbar from "@/components/Navbar";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "900"],
});

const socialLinks = [
  { platform: "instagram", url: "https://instagram.com/sephora" },
  { platform: "tiktok", url: "https://tiktok.com/@fentybeauty" },
  { platform: "youtube", url: "https://youtube.com/@vogue" },
];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons+Round"
          rel="stylesheet"
        />
        <title>BeautyVibe | MakeUp Catalog</title>
      </head>
      <body
        className={`${montserrat.className} bg-white text-slate-800 antialiased`}
      >
        <CartProvider>
          <WishlistProvider>
            <Navbar /> {/* KOMPONEN NAVBAR DIPANGGIL DI SINI */}
            <main className="min-h-screen pt-20">{children}</main>
            {/* --- FOOTER --- */}
            <footer className="bg-slate-900 text-white pt-24 pb-12">
              <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                  <div className="col-span-1 md:col-span-2">
                    <h2 className="text-3xl font-black tracking-tighter mb-6">
                      BEAUTYVIBE.
                    </h2>
                    <p className="text-slate-400 max-w-sm leading-relaxed">
                      Katalog profesional yang mengkurasi produk makeup terbaik
                      dunia. Menemukan kecantikan Anda kini lebih mudah dari
                      sebelumnya.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-bold uppercase tracking-widest text-xs mb-6 text-pink-500">
                      Links
                    </h4>
                    <ul className="space-y-4 text-sm text-slate-300">
                      <li>
                        <Link
                          href="/catalog"
                          className="hover:text-white transition"
                        >
                          Catalog
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/about"
                          className="hover:text-white transition"
                        >
                          About Us
                        </Link>
                      </li>
                      <li>
                        <Link href="#" className="hover:text-white transition">
                          Privacy Policy
                        </Link>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold uppercase tracking-widest text-xs mb-6 text-pink-500">
                      Social
                    </h4>
                  <div className="flex space-x-4">
                      {socialLinks.map((social) => (
                        <a
                          key={social.platform}
                          href={social.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center hover:bg-pink-600 transition-all hover:-translate-y-1 group"
                        >
                          <img
                            src={`https://cdn.simpleicons.org/${social.platform}/white`}
                            className="w-4 h-4 transition-transform group-hover:scale-110"
                            alt={social.platform}
                          />
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="pt-8 border-t border-white/5 text-center text-[10px] font-bold uppercase tracking-[0.3em] text-slate-500">
                  &copy; 2026 BEAUTYVIBE DIGITAL CATALOG. ALL RIGHTS RESERVED.
                </div>
              </div>
            </footer>
          </WishlistProvider>
        </CartProvider>
      </body>
    </html>
  );
}
