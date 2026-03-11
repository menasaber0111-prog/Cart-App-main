'use client';
import { useState, useEffect } from 'react';

interface Category {
  _id?: string;
  id?: string;
  name: string;
  image: string;
}

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCategories() {
      try {
        setLoading(true);
        setError(null);
        
        console.log('isLoadin...');
        const res = await fetch('https://ecommerce.routemisr.com/api/v1/categories', {
          next: { revalidate: 3600 }
        });

        console.log(' Response status:', res.status);
        
        if (!res.ok) throw new Error(`HTTP ${res.status}`);

        const data = await res.json();
        

        // جرب كل الاحتمالات للـ categories array
        let categoriesArray: Category[] = [];
        
        if (data.categories && Array.isArray(data.categories)) {
          categoriesArray = data.categories;
         
        } 
        else if (Array.isArray(data)) {
          categoriesArray = data;
        
        }
        else if (data.data && Array.isArray(data.data)) {
          categoriesArray = data.data;
         
        }
        setCategories(categoriesArray);
        
      } catch (err: any) {
        console.error('error');
        setError(err.message || 'error in connect');
      } finally {
        setLoading(false);
      }
    }

    fetchCategories();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-green-50 flex items-center justify-center p-8">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 border-4 border-green-100 border-t-green-500 rounded-full animate-spin mx-auto"></div>
          <div>
            <p className="text-xl font-semibold text-gray-700 mb-2" > IsLoadin...</p>
            <p className="text-sm text-gray-500"> Please wait</p>
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
          <div className="inline-flex items-center gap-3 mb-8 px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 rounded-3xl shadow-2xl mx-auto max-w-md">
            <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h12a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6z" clipRule="evenodd" />
            </svg>
            <h1 className="text-3xl font-bold text-white drop-shadow-lg">
              Categories
            </h1>
          </div>
          <p className="text-xl md:text-2xl text-gray-700 font-medium max-w-2xl mx-auto leading-relaxed">
           Discover the best categories in FreshCart
          </p>
        </div>

        {/* Debug Info */}
        {categories.length === 0 && !loading && !error && (
          <div className="bg-yellow-50 border-2 border-yellow-200 rounded-2xl p-8 text-center mb-12">
            <button 
              onClick={() => window.location.reload()} 
              className="mt-4 bg-yellow-500 text-white px-6 py-2 rounded-xl font-semibold hover:bg-yellow-600 transition-all"
            >
           
            </button>
          </div>
        )}

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {categories.map((category, index) => (
            <CategoryCard key={category._id || category.id || index} category={category} />
          ))}
        </div>

       
      </div>
    </div>
  );
}

function CategoryCard({ category }: { category: Category }) {
  return (
    <a 
      href={`/CategoryDetails/${category._id}`} 
      className="group relative bg-white/95 backdrop-blur-md rounded-3xl shadow-xl hover:shadow-2xl border border-emerald-100 overflow-hidden transition-all duration-500 hover:-translate-y-3 hover:scale-[1.03] h-full flex flex-col"
    >
      <div className="relative h-64 overflow-hidden bg-gradient-to-br from-emerald-50 to-green-100">
        <img 
          src={category.image || '/placeholder-category.jpg'} 
          alt={category.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-all duration-700 group-hover:rotate-2"
          onError={(e) => {
            e.currentTarget.src = 'https://via.placeholder.com/400x300/10b981/ffffff?text=Category';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>
      
      <div className="p-8 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-2xl font-bold text-gray-900 mb-4 line-clamp-2 text-center">
            {category.name}
          </h3>
        </div>
        <div className="flex justify-center">
          <span className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-8 py-3 rounded-2xl text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 group-hover:scale-105 hover:from-green-600 hover:to-emerald-700">
           Find out now
          </span>
        </div>
      </div>
    </a>
  );
}
