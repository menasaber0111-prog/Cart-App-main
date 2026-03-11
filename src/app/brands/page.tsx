'use client';
import { useState, useEffect } from 'react';

interface Brand {
  _id?: string;
  id?: string;
  name: string;
  image: string;
  slug?: string;
}

export default function BrandsPage() {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchBrands() {
      try {
        setLoading(true);
        setError(null);
        
        console.log('🔄 جاري جلب العلامات...');
        const res = await fetch('https://ecommerce.routemisr.com/api/v1/brands', {
          next: { revalidate: 3600 }
        });

        console.log('📡 Response status:', res.status);
        
        if (!res.ok) throw new Error(`HTTP ${res.status}`);

        const data = await res.json();
        console.log('📦 Brands Response:', data);

        let brandsArray: Brand[] = [];
        
        if (data.brands && Array.isArray(data.brands)) {
          brandsArray = data.brands;
        } else if (data.data && Array.isArray(data.data)) {
          brandsArray = data.data;
        } else if (Array.isArray(data)) {
          brandsArray = data;
        }
        
        console.log('✅ Brands found:', brandsArray.length);
        setBrands(brandsArray);
        
      } catch (err: any) {
        console.error('💥 خطأ:', err);
        setError(err.message || 'خطأ في الاتصال');
      } finally {
        setLoading(false);
      }
    }

    fetchBrands();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-green-50 flex items-center justify-center p-8">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 border-4 border-green-100 border-t-green-500 rounded-full animate-spin mx-auto"></div>
          <div>
            <p className="text-xl font-semibold text-gray-700 mb-2"> Procces Brands...</p>
            <p className="text-sm text-gray-500"> Pleas wait </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div dir="rtl" className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-3 mb-8 px-8 py-4 bg-gradient-to-r from-purple-500 to-emerald-600 rounded-3xl shadow-2xl mx-auto max-w-md">
            <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            <h1 className="text-3xl font-bold text-white drop-shadow-lg">
               Brands
            </h1>
          </div>
          <p className="text-xl md:text-2xl text-gray-700 font-medium max-w-2xl mx-auto leading-relaxed">
           Discover the most famous brands in FreshCart
          </p>
        </div>

        {/* Brands Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {brands.map((brand, index) => (
            <BrandCard key={brand._id || brand.id || index} brand={brand} />
          ))}
        </div>

        {brands.length === 0 && !loading && (
          <div className="text-center py-20">
            <h3 className="text-3xl font-bold text-gray-800 mb-6">Not found Brands   </h3>
            <button 
              onClick={() => window.location.reload()}
              className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-3 rounded-2xl font-bold shadow-lg transition-all"
            >
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function BrandCard({ brand }: { brand: Brand }) {
  return (
    <a 
      href={`/BrandDetails/${brand._id}`} 
      className="group relative bg-white/95 backdrop-blur-md rounded-3xl shadow-xl hover:shadow-2xl border border-purple-100 overflow-hidden transition-all duration-500 hover:-translate-y-3 hover:scale-[1.03] h-full flex flex-col"
    >
      <div className="relative h-64 overflow-hidden bg-gradient-to-br from-purple-50 to-emerald-50">
        <img 
          src={brand.image || '/placeholder-brand.jpg'} 
          alt={brand.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-all duration-700 group-hover:rotate-2"
          onError={(e) => {
            e.currentTarget.src = 'https://via.placeholder.com/400x300/8b5cf6/ffffff?text=Brand';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>
      
      <div className="p-8 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-2xl font-bold text-gray-900 mb-4 line-clamp-2 text-center">
            {brand.name}
          </h3>
        </div>
        <div className="flex justify-center">
          <span className="bg-gradient-to-r from-purple-500 to-emerald-600 text-white px-8 py-3 rounded-2xl text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 group-hover:scale-105 hover:from-purple-600 hover:to-emerald-700">
            Find out now 
          </span>
        </div>
      </div>
    </a>
  );
}
