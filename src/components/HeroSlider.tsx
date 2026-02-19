"use client";
import { useState, useEffect, useCallback } from "react";
import Link from "next/link";

const slides = [
  {
    image:
      "https://i.pinimg.com/736x/24/7d/de/247ddede897f119d5dbce548d6587bf8.jpg",
    tag: "New Arrival",
    title: "Define Your Radiance",
    subtitle:
      "Koleksi Foundation High-Definition yang menyatu sempurna dengan kulit.",
    color: "from-pink-500/20",
  },
  {
    image:
      "https://i.pinimg.com/1200x/83/3b/24/833b24d5759baaee04cfe2d9741f2b34.jpg",
    tag: "Artist Choice",
    title: "Vibrant Artistry",
    subtitle: "Eksplorasi warna tanpa batas dengan palette pigmentasi intens.",
    color: "from-purple-500/20",
  },
  {
    image:
      "https://i.pinimg.com/1200x/6a/e4/dc/6ae4dc0e93e4af36074d541c2619be5a.jpg",
    tag: "Trending Now",
    title: "The Glass Skin",
    subtitle:
      "Rahasia kilau sehat natural sepanjang hari tanpa terasa berminyak.",
    color: "from-orange-400/20",
  },
];

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  }, []);

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 4000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  return (
    <section className="h-[85vh] md:h-[90vh] w-full overflow-hidden bg-slate-900 relative">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-[1500ms] ease-in-out ${
            index === current ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          {/* Background Image */}
          <div
            className={`absolute inset-0 transform transition-transform duration-[10000ms] ease-linear ${
              index === current ? "scale-110" : "scale-100"
            }`}
          >
            <img
              src={slide.image}
              className="w-full h-full object-cover object-center"
              alt={slide.title}
            />
          </div>

          {/* Overlay Gradient - Diperkuat di mobile agar teks terbaca */}
          <div
            className={`absolute inset-0 bg-gradient-to-b md:bg-gradient-to-r ${slide.color} via-slate-900/60 to-slate-900/90`}
          />

          {/* Content Container */}
          <div className="absolute inset-0 flex items-center">
            <div className="max-w-7xl mx-auto px-5 md:px-6 w-full">
              <div className="max-w-2xl bg-white/5 backdrop-blur-md p-6 md:p-12 rounded-[2rem] md:rounded-[2.5rem] border border-white/10 shadow-2xl mt-10 md:mt-0 transition-all">
                
                <span className="inline-block py-1 px-3 md:py-1 md:px-4 rounded-full bg-pink-600 text-white text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em] mb-4 md:mb-6 animate-fade-in">
                  {slide.tag}
                </span>

                <h2 className="text-4xl md:text-7xl font-bold text-white mb-4 md:mb-6 leading-[1.1] tracking-tighter">
                  {slide.title.split(" ")[0]} <br />
                  <span className="text-pink-400">
                    {slide.title.split(" ").slice(1).join(" ")}
                  </span>
                </h2>

                <p className="text-sm md:text-xl text-slate-200 mb-8 md:mb-10 font-light leading-relaxed max-w-sm md:max-w-lg">
                  {slide.subtitle}
                </p>

                <div className="flex flex-col sm:flex-row gap-4 sm:items-center">
                  <Link
                    href="/catalog"
                    className="bg-pink-600 hover:bg-white hover:text-pink-600 text-white px-8 md:px-10 py-3.5 md:py-4 rounded-full font-black text-xs md:text-sm uppercase tracking-widest transition-all duration-300 shadow-xl shadow-pink-600/20 text-center"
                  >
                    Explore Shop
                  </Link>
                  <button className="flex items-center justify-center sm:justify-start space-x-2 text-white hover:text-pink-400 transition-colors py-2 md:py-4 px-6 group">
                    <span className="material-icons-round text-2xl md:text-3xl transition-transform group-hover:scale-110">
                      play_circle
                    </span>
                    <span className="font-bold tracking-widest text-[10px] md:text-xs uppercase">
                      Watch Story
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Controls - Responsif untuk jempol mobile */}
      <div className="absolute bottom-8 md:bottom-12 left-0 right-0 md:left-auto md:right-12 z-20 flex flex-col md:flex-row items-center justify-center md:space-x-6 gap-4">
        
        <div className="flex items-center space-x-6">
          <button
            onClick={prevSlide}
            className="material-icons-round text-white/50 hover:text-pink-500 transition-colors text-3xl md:text-4xl"
          >
            west
          </button>

          {/* Progress Dots */}
          <div className="flex space-x-2 md:space-x-3">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`h-1 md:h-1.5 transition-all duration-500 rounded-full ${
                  i === current ? "bg-pink-500 w-8 md:w-12" : "bg-white/30 w-3 md:w-4"
                }`}
              />
            ))}
          </div>

          <button
            onClick={nextSlide}
            className="material-icons-round text-white/50 hover:text-pink-500 transition-colors text-3xl md:text-4xl"
          >
            east
          </button>
        </div>
      </div>

      {/* Aesthetic Vertical Text */}
      <div className="hidden lg:block absolute left-12 top-1/2 -translate-y-1/2 -rotate-90 origin-left text-white/20 font-black tracking-[1em] text-xs uppercase z-20 pointer-events-none">
        Beauty Vibe &copy; 2026
      </div>
    </section>
  );
}