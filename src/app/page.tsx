import Link from "next/link";
import HeroSlider from "@/components/HeroSlider";

interface Product {
  id: number;
  title: string;
  price: number;
  rating: number;
  thumbnail: string;
}

async function getFeaturedProducts() {
  const res = await fetch(
    "https://dummyjson.com/products/category/beauty?limit=4",
  );
  if (!res.ok) return [];
  const data = await res.json();
  return data.products as Product[];
}

export default async function HomePage() {
  const featuredProducts = await getFeaturedProducts();

  return (
    <div className="min-h-screen bg-white overflow-hidden">
      <HeroSlider />

      {/* 2. Featured Brand Stats - Responsive Grid Update */}
      <section className="relative z-20 -mt-8 md:-mt-10 max-w-6xl mx-auto px-4 md:px-6">
        <div className="bg-slate-900 rounded-[2rem] md:rounded-[3rem] p-6 md:p-10 shadow-2xl grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8 border border-white/10">
          {[
            { label: "Happy Clients", value: "10k+", icon: "auto_awesome" },
            { label: "Premium Products", value: "500+", icon: "verified" },
            { label: "Beauty Support", value: "24/7", icon: "support_agent" },
            { label: "Cruelty Free", value: "100%", icon: "eco" },
          ].map((stat, i) => (
            <div key={i} className="text-center group p-2">
              <span className="material-icons-round text-pink-500 mb-1 md:mb-2 opacity-50 group-hover:opacity-100 transition-opacity text-xl md:text-2xl">
                {stat.icon}
              </span>
              <h4 className="text-xl md:text-3xl font-bold text-white tracking-tight">
                {stat.value}
              </h4>
              <p className="text-[8px] md:text-[10px] text-slate-400 uppercase tracking-[0.1em] md:tracking-[0.2em] mt-1">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Featured Collection - Mobile spacing & layout update */}
      <section className="max-w-7xl mx-auto px-5 md:px-6 py-16 md:py-24">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 md:mb-12 gap-4">
          <div>
            <span className="text-pink-600 font-black text-[10px] md:text-xs uppercase tracking-[0.3em]">
              Must Have Items
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mt-2">
              Editor's Choice
            </h2>
          </div>
          <Link
            href="/catalog"
            className="flex items-center text-slate-900 font-bold hover:text-pink-600 transition-colors group text-sm md:text-base"
          >
            View All Collection
            <span className="material-icons-round ml-2 group-hover:translate-x-2 transition-transform">
              east
            </span>
          </Link>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
          {featuredProducts.map((product) => (
            <Link
              href={`/product/${product.id}`}
              key={product.id}
              className="group"
            >
              <div className="relative aspect-[3/4] rounded-[1.5rem] md:rounded-[2rem] overflow-hidden bg-pink-50 mb-3 md:mb-4 transition-transform duration-500 group-hover:-translate-y-2">
                <img
                  src={product.thumbnail}
                  alt={product.title}
                  className="w-full h-full object-cover mix-blend-multiply group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-3 right-3 md:top-4 md:right-4 bg-white/90 backdrop-blur px-2 md:px-3 py-1 rounded-full text-[10px] md:text-xs font-bold text-slate-900 flex items-center shadow-sm">
                  <span className="material-icons-round text-[12px] md:text-sm text-yellow-500 mr-1">
                    star
                  </span>
                  {product.rating}
                </div>
              </div>
              <h3 className="font-bold text-slate-800 text-sm md:text-lg leading-tight mb-1 group-hover:text-pink-600 transition-colors line-clamp-1">
                {product.title}
              </h3>
              <p className="text-pink-600 font-black text-sm md:text-base tracking-tight">
                ${product.price}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* 4. Promotional Banner - Stacked for mobile update */}
      <section className="px-4 md:px-6 py-10 md:py-12">
        <div className="max-w-7xl mx-auto relative rounded-[2.5rem] md:rounded-[4rem] bg-pink-600 overflow-hidden flex flex-col md:flex-row items-stretch">
          <div className="relative z-10 p-8 md:p-24 md:w-3/5 text-white flex flex-col justify-center">
            <h2 className="text-4xl md:text-7xl font-bold leading-[1] mb-6 md:mb-8">
              Effortless <br /> <span className="text-pink-200">Glow Kit.</span>
            </h2>
            <p className="text-pink-100 text-sm md:text-lg mb-8 md:mb-10 max-w-md font-medium opacity-90 leading-relaxed">
              Dapatkan diskon eksklusif 40% untuk bundle kecantikan musim ini.
            </p>
            <Link
              href="/catalog"
              className="w-full md:w-fit text-center flex justify-center items-center bg-white text-pink-600 px-8 md:px-12 py-4 md:py-5 rounded-full font-black hover:bg-slate-900 hover:text-white transition-all shadow-xl"
            >
              CLAIM OFFER
              <span className="material-icons-round ml-2">local_mall</span>
            </Link>
          </div>
          <div className="md:w-2/5 h-[300px] md:h-auto relative w-full">
            <img
              src="https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&q=80&w=1200"
              className="absolute inset-0 w-full h-full object-cover"
              alt="Promo"
            />
            <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-pink-600 via-pink-600/20 to-transparent"></div>
          </div>
        </div>
      </section>

      {/* 5. Category Teaser - Spacing update */}
      <section className="max-w-7xl mx-auto px-5 md:px-6 py-16 md:py-24">
        <div className="text-center mb-10 md:mb-16">
          <h2 className="text-2xl md:text-3xl font-black text-slate-900 uppercase tracking-tighter italic">
            Browse by Category
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
          {[
            {
              name: "Lip Color",
              img: "https://i.pinimg.com/736x/26/f5/7b/26f57bb049f41c0b7744131efbf48655.jpg",
            },
            {
              name: "Skin Effect",
              img: "https://i.pinimg.com/736x/e5/8b/b2/e58bb2572ed21992b5f1610d46fbecc8.jpg",
            },
            {
              name: "Eye Magic",
              img: "https://i.pinimg.com/736x/f9/35/5c/f9355c97ebf472d9f850203fba13aa66.jpg",
            },
          ].map((cat, i) => (
            <div
              key={i}
              className="group relative h-[350px] md:h-[450px] rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-xl"
            >
              <img
                src={cat.img}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[1.5s]"
                alt={cat.name}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/10 to-transparent flex flex-col justify-end p-8 md:p-12">
                <h3 className="text-white text-2xl md:text-3xl font-bold mb-4">
                  {cat.name}
                </h3>
                <Link
                  href="/catalog"
                  className="w-fit bg-white/20 backdrop-blur-md border border-white/30 text-white px-5 py-2 rounded-full font-bold text-xs md:text-sm hover:bg-white hover:text-pink-600 transition-all flex items-center"
                >
                  View
                  <span className="material-icons-round ml-2 text-sm">
                    north_east
                  </span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
