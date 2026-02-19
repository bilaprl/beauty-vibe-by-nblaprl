"use client";
import { useState } from "react";

export default function AboutPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    { 
      q: "Apakah produk dalam katalog ini asli?", 
      a: "Tentu. BeautyVibe hanya mengkurasi produk yang tersedia melalui distributor resmi dan marketplace terpercaya. Kami menjamin akurasi data produk sesuai dengan spesifikasi manufaktur." 
    },
    { 
      q: "Bagaimana cara melakukan pembelian?", 
      a: "BeautyVibe berfungsi sebagai katalog cerdas. Anda dapat melihat detail produk dan harga terbaru di sini, lalu menekan tombol 'Shop Now' untuk diarahkan ke platform pembelian resmi." 
    },
    { 
      q: "Apakah data harga selalu akurat?", 
      a: "Kami melakukan sinkronisasi data secara berkala dengan basis data global untuk memastikan informasi harga dan ketersediaan stok sedekat mungkin dengan kondisi pasar saat ini." 
    },
    { 
      q: "Kebijakan pengembalian barang?", 
      a: "Karena kami adalah platform katalog, kebijakan retur mengikuti ketentuan dari merchant mitra tempat Anda melakukan transaksi final." 
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* 1. Brand Story Section - Mobile Optimized Spacing & Decoration */}
      <section className="relative py-16 md:py-24 bg-[#fffafa] overflow-hidden">
        {/* Decorative element hidden on small mobile to avoid layout shifts */}
        <div className="hidden sm:block absolute top-0 right-0 w-1/3 h-full bg-pink-50/50 -skew-x-12 translate-x-20" />
        
        <div className="max-w-7xl mx-auto px-6 relative">
          <div className="max-w-3xl">
            <span className="text-pink-600 font-black text-[10px] md:text-xs uppercase tracking-[0.3em] md:tracking-[0.4em] mb-4 block">
              The Discovery Platform
            </span>
            <h2 className="text-4xl md:text-7xl font-bold text-slate-900 leading-[1.1] md:leading-none tracking-tighter mb-6 md:mb-8">
              Your Daily <br className="hidden md:block" />
              <span className="italic text-pink-500 font-light">Beauty Compass.</span>
            </h2>
            <p className="text-lg md:text-xl text-slate-600 leading-relaxed font-medium">
              BeautyVibe adalah katalog kosmetik digital yang dirancang untuk membantu Anda menavigasi dunia kecantikan yang luas. Kami mengkurasi ribuan produk dari berbagai brand global ke dalam satu platform yang bersih, cepat, dan mudah digunakan.
            </p>
            <p className="mt-6 text-sm md:text-base text-slate-500 leading-relaxed">
              Fokus kami bukan menjual produk sendiri, melainkan menjadi jembatan antara rasa ingin tahu Anda dan produk makeup yang sempurna untuk karakter wajah Anda.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Our Pillars - Mobile Stack to Desktop Grid */}
      <section className="max-w-7xl mx-auto px-6 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-12">
          {[
            { 
              title: "Smart Curation", 
              desc: "Setiap produk dalam katalog kami melewati proses seleksi berdasarkan tren pasar dan standar kualitas.",
              icon: "auto_awesome"
            },
            { 
              title: "Global Database", 
              desc: "Terhubung dengan basis data produk kecantikan dunia untuk memberikan informasi yang paling relevan.",
              icon: "public"
            },
            { 
              title: "User Centric", 
              desc: "Antarmuka yang intuitif membantu Anda menemukan produk impian hanya dalam hitungan detik.",
              icon: "ads_click"
            }
          ].map((pillar, i) => (
            <div key={i} className="group p-6 md:p-8 rounded-[1.5rem] md:rounded-[2rem] border border-pink-50 hover:border-pink-200 transition-all hover:shadow-xl hover:shadow-pink-100/20 active:bg-pink-50/30">
              <div className="w-12 h-12 md:w-14 md:h-14 bg-pink-100 rounded-xl md:rounded-2xl flex items-center justify-center text-pink-600 mb-4 md:mb-6 group-hover:scale-110 transition-transform">
                <span className="material-icons-round text-2xl md:text-3xl">{pillar.icon}</span>
              </div>
              <h4 className="text-lg md:text-xl font-bold text-slate-900 mb-2 md:mb-4">{pillar.title}</h4>
              <p className="text-slate-500 text-xs md:text-sm leading-relaxed">{pillar.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Interactive FAQ Section - Balanced for Small Screens */}
      <section className="bg-slate-900 py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-10 md:mb-16">
            <h3 className="text-2xl md:text-5xl font-bold text-white mb-4">Got Questions?</h3>
            <p className="text-sm md:text-base text-slate-400 px-4">Segala yang perlu Anda ketahui tentang cara kerja BeautyVibe.</p>
          </div>
          
          <div className="space-y-3 md:space-y-4">
            {faqs.map((faq, i) => (
              <div 
                key={i} 
                className={`overflow-hidden rounded-2xl md:rounded-3xl transition-all border ${
                  openFaq === i ? "bg-white border-transparent" : "bg-white/5 border-white/10"
                }`}
              >
                <button 
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full p-5 md:p-6 text-left flex justify-between items-center gap-4"
                >
                  <span className={`text-sm md:text-base font-bold transition-colors ${openFaq === i ? "text-slate-900" : "text-white"}`}>
                    {faq.q}
                  </span>
                  <span className={`material-icons-round flex-shrink-0 transition-transform duration-300 ${
                    openFaq === i ? "rotate-180 text-pink-600" : "text-white/30"
                  }`}>
                    expand_more
                  </span>
                </button>
                <div className={`transition-all duration-300 ease-in-out ${
                  openFaq === i ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
                }`}>
                  <p className="p-5 md:p-6 pt-0 text-xs md:text-base text-slate-600 leading-relaxed">
                    {faq.a}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}