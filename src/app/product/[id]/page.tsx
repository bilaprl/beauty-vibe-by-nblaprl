import Link from "next/link";
import AddToCartButton from "@/components/AddToCartButton";
import WishlistButton from "@/components/WishlistButton";

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}

async function getProductDetail(id: string): Promise<Product | null> {
  try {
    const res = await fetch(`https://dummyjson.com/products/${id}`, {
      cache: "no-store",
    });
    if (!res.ok) return null;
    return res.json();
  } catch (error) {
    console.error("Detail Fetch Error:", error);
    return null;
  }
}

export default async function DetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await getProductDetail(id);

  if (!product) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center px-6 text-center">
        <span className="material-icons-round text-6xl text-pink-200 mb-4">
          search_off
        </span>
        <h2 className="text-2xl font-bold text-slate-800">
          Produk tidak ditemukan
        </h2>
        <Link
          href="/catalog"
          className="mt-4 text-pink-600 font-bold hover:underline"
        >
          Kembali ke Katalog
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fffafa] pb-20">
      {/* Navigation - Better spacing for touch targets on mobile */}
      <div className="max-w-7xl mx-auto px-5 md:px-6 py-6 md:py-8">
        <Link
          href="/catalog"
          className="group inline-flex items-center text-[10px] md:text-sm font-black uppercase tracking-widest text-slate-400 hover:text-pink-600 transition-colors"
        >
          <span className="material-icons-round mr-2 transition-transform group-hover:-translate-x-2 text-lg">
            west
          </span>
          Back to Collection
        </Link>
      </div>

      <div className="max-w-7xl mx-auto px-5 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          {/* IMAGE SECTION - Optimized for Mobile Viewport */}
          <div className="space-y-4 md:space-y-6">
            <div className="relative aspect-square bg-white rounded-[2.5rem] md:rounded-[3rem] overflow-hidden border border-pink-100 shadow-sm group">
              <img
                src={product.thumbnail}
                alt={product.title}
                className="w-full h-full object-contain p-8 md:p-12 transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute top-4 left-4 md:top-6 md:left-6 bg-slate-900 text-white text-[8px] md:text-[10px] font-black px-3 py-1.5 md:px-4 md:py-2 rounded-full uppercase tracking-widest">
                Official {product.category}
              </div>
            </div>

            {/* Thumbnail Gallery - Made sure it handles undefined images */}
            <div className="grid grid-cols-4 gap-3 md:gap-4">
              {(product.images || []).slice(0, 4).map((img, idx) => (
                <div
                  key={idx}
                  className="aspect-square bg-white rounded-xl md:rounded-2xl border border-pink-50 overflow-hidden cursor-pointer hover:border-pink-400 transition-all active:scale-95 shadow-sm"
                >
                  <img
                    src={img}
                    className="w-full h-full object-cover p-1 md:p-2"
                    alt={`${product.title} view ${idx}`}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* CONTENT SECTION */}
          <div className="flex flex-col">
            <div className="mb-6 md:mb-8">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className="bg-pink-100 text-pink-600 text-[9px] md:text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest">
                  In Stock: {product.stock}
                </span>
                <div className="flex items-center">
                  <div className="flex text-yellow-400 mr-2">
                    {[...Array(5)].map((_, i) => (
                      <span
                        key={i}
                        className="material-icons-round text-sm md:text-lg"
                      >
                        {i < Math.floor(product.rating)
                          ? "star"
                          : "star_outline"}
                      </span>
                    ))}
                  </div>
                  <span className="text-[10px] md:text-xs font-bold text-slate-400">
                    ({product.rating})
                  </span>
                </div>
              </div>

              <h1 className="text-3xl md:text-6xl font-bold text-slate-900 leading-[1.1] tracking-tighter mb-4">
                {product.title}
              </h1>

              <p className="text-2xl md:text-3xl font-black text-pink-600 tracking-tight">
                ${product.price}
              </p>
            </div>

            <div className="space-y-6 mb-8 md:mb-10">
              <div>
                <h3 className="text-[10px] md:text-xs font-black uppercase tracking-widest text-slate-900 mb-2">
                  Description
                </h3>
                <p className="text-sm md:text-lg text-slate-500 leading-relaxed font-medium">
                  {product.description}
                </p>
              </div>

              {/* Responsive Specs Grid */}
              <div className="grid grid-cols-2 gap-4 md:gap-6 py-5 md:py-6 border-y border-pink-50">
                <div>
                  <h3 className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-slate-400">
                    Category
                  </h3>
                  <p className="text-sm md:text-base font-bold text-slate-800 capitalize">
                    {product.category}
                  </p>
                </div>
                <div>
                  <h3 className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-slate-400">
                    Delivery
                  </h3>
                  <p className="text-sm md:text-base font-bold text-slate-800">
                    Free Shipping
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons - Stacked on mobile, row on tablet/desktop */}
            <div className="flex flex-col sm:flex-row gap-4">
              <AddToCartButton product={product} />
              <WishlistButton product={product} />
            </div>

            {/* Trust Badges - Smaller for Mobile */}
            <div className="mt-10 md:mt-12 flex items-center justify-center sm:justify-start gap-8 md:gap-12 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
              <div className="flex flex-col items-center sm:items-start group">
                <span className="material-icons-round text-2xl md:text-3xl text-slate-800 mb-1">
                  verified_user
                </span>
                <span className="text-[7px] md:text-[8px] font-black uppercase tracking-widest text-slate-900">
                  Secure
                </span>
              </div>

              <div className="flex flex-col items-center sm:items-start group">
                <span className="material-icons-round text-2xl md:text-3xl text-slate-800 mb-1">
                  published_with_changes
                </span>
                <span className="text-[7px] md:text-[8px] font-black uppercase tracking-widest text-slate-900">
                  Returns
                </span>
              </div>

              <div className="flex flex-col items-center sm:items-start group">
                <span className="material-icons-round text-2xl md:text-3xl text-slate-800 mb-1">
                  eco
                </span>
                <span className="text-[7px] md:text-[8px] font-black uppercase tracking-widest text-slate-900">
                  Organic
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
