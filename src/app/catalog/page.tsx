import { Suspense } from "react";
import ProductList from "@/components/ProductList";
import Link from "next/link";

interface Product {
  id: number;
  title: string;
  price: number;
  rating: number;
  thumbnail: string;
  category: string;
}

async function getProducts(): Promise<Product[]> {
  try {
    const res = await fetch("https://dummyjson.com/products/category/beauty", { 
      next: { revalidate: 3600 } 
    });
    
    if (!res.ok) throw new Error("Gagal mengambil data produk");
    
    const data = await res.json();
    return data.products;
  } catch (error) {
    console.error("Catalog Fetch Error:", error);
    return [];
  }
}

export default async function CatalogPage() {
  const products = await getProducts();

  return (
    <div className="min-h-screen bg-[#fffafa]">
      {/* Decorative Header Background - Adjusted height for mobile */}
      <div className="absolute top-0 left-0 w-full h-[300px] md:h-[400px] bg-gradient-to-b from-pink-100/50 to-transparent pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-5 md:px-6 py-10 md:py-20">
        {/* Breadcrumbs Navigation - Added overflow-x-auto for small screens */}
        <nav className="flex items-center space-x-2 text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] text-pink-400 mb-4 md:mb-6 overflow-x-hidden whitespace-nowrap">
          <Link href="/" className="hover:text-slate-900 transition-colors">Home</Link>
          <span className="material-icons-round text-[14px]">chevron_right</span>
          <span className="text-slate-900">Catalog Collection</span>
        </nav>

        {/* Page Header - Responsive Text Scaling */}
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 md:mb-16">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-7xl font-bold text-slate-900 tracking-tighter leading-[0.9] mb-4">
              Beauty<span className="text-pink-600">Vibe</span>
              <span className="block text-xl md:text-3xl font-light italic text-slate-400 mt-2">
                Professional Collection
              </span>
            </h1>
            <p className="text-slate-500 text-sm md:text-lg font-medium leading-relaxed max-w-md md:max-w-2xl">
              Dikurasi oleh makeup artist profesional untuk memastikan setiap produk memberikan hasil akhir yang memukau.
            </p>
          </div>
          
          {/* Status Badge - Scale down for mobile */}
          <div className="flex items-center space-x-3 bg-white px-5 py-2.5 md:px-6 md:py-3 rounded-full border border-pink-100 shadow-sm w-fit transition-transform active:scale-95">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-pink-600"></span>
            </span>
            <span className="text-[9px] md:text-xs font-black uppercase tracking-widest text-slate-700">
              {products.length} Products Available
            </span>
          </div>
        </header>

        {/* Catalog Section with Suspense */}
        <Suspense fallback={<CatalogSkeleton />}>
          <div className="relative">
            {products.length > 0 ? (
              <ProductList initialProducts={products} />
            ) : (
              <ErrorState />
            )}
          </div>
        </Suspense>
      </div>

      {/* Floating Cart Button for Mobile - Added Haptic Feel */}
      <div className="fixed bottom-6 right-6 z-50 md:hidden">
        <Link href="/cart">
          <button className="bg-slate-900 text-white w-14 h-14 rounded-full shadow-[0_20px_40px_rgba(0,0,0,0.3)] flex items-center justify-center active:scale-90 transition-transform">
            <span className="material-icons-round">shopping_basket</span>
          </button>
        </Link>
      </div>
    </div>
  );
}

// Komponen Loading Skeleton - Responsive Grid Layout
function CatalogSkeleton() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
      {[...Array(8)].map((_, i) => (
        <div key={i} className="bg-white rounded-[1.5rem] md:rounded-[2.5rem] p-3 md:p-4 h-[300px] md:h-[400px] animate-pulse">
          <div className="bg-slate-100 rounded-[1.2rem] md:rounded-[2rem] h-1/2 md:h-2/3 w-full mb-4" />
          <div className="h-3 md:h-4 bg-slate-100 rounded w-3/4 mb-2" />
          <div className="h-3 md:h-4 bg-slate-100 rounded w-1/2" />
        </div>
      ))}
    </div>
  );
}

function ErrorState() {
  return (
    <div className="text-center py-20 md:py-32 bg-white rounded-[2rem] md:rounded-[3rem] border-2 border-dashed border-pink-100 px-6">
      <span className="material-icons-round text-5xl md:text-6xl text-pink-200 mb-4">cloud_off</span>
      <h3 className="text-xl md:text-2xl font-bold text-slate-800">Koneksi Terputus</h3>
      <p className="text-sm md:text-slate-500 mt-2">Gagal memuat produk. Silakan coba segarkan halaman.</p>
      <button 
        onClick={() => window.location.reload()}
        className="mt-6 bg-pink-600 text-white px-8 py-3 rounded-full font-bold hover:bg-pink-700 transition active:scale-95"
      >
        Refresh Catalog
      </button>
    </div>
  );
}