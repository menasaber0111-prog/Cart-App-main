import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

type myProps = {
  params: { id: string }
}

export default async function CategoryDetails(props: myProps) {
  let { id } = await props.params
  console.log('🔍 Category ID:', id);

  // جلب الفئة
  let categoryResponse = await fetch(`https://ecommerce.routemisr.com/api/v1/categories/${id}`, {
    cache: 'no-store'
  })
  let categoryResult = await categoryResponse.json()
  let categoryData = categoryResult.data || categoryResult.category || categoryResult

  // ✅ جلب المنتجات من endpoint الرئيسي مع فلترة الفئة
  let productsResponse = await fetch(
    `https://ecommerce.routemisr.com/api/v1/products?page=1&limit=50&category=${id}`, 
    { cache: 'no-store' }
  )
  let productsResult = await productsResponse.json()
  
  // استخراج المنتجات
  let productsData = productsResult.products || productsResult.data || []
  console.log('✅ Products:', productsData.length);

  return (
    <div className="container mx-auto py-12 px-4 min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <div className="text-center mb-20">
        <h1 className="text-5xl font-bold bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent mb-6">
          {categoryData.name || 'الفئة'}
        </h1>
        <p className="text-2xl text-gray-600">
          {productsData.length} 
        </p>
      </div>

      {/* Products Grid */}
      {productsData.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {productsData.map((product: any) => (
            <Link key={product._id} href={`/productdetails/${product._id}`} className="group">
              <Card className="h-full hover:shadow-2xl transition-all border-emerald-100 hover:border-emerald-200 hover:-translate-y-2 overflow-hidden">
                <CardHeader className="p-0 h-64 overflow-hidden">
                  <img 
                    src={product.imageCover || product.images?.[0] || 'https://via.placeholder.com/400x300'}
                    alt={product.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  
                </CardHeader>
                <CardContent className="p-6">
                  <CardTitle className="text-xl font-bold mb-3 line-clamp-2">
                    {typeof product.title === 'string' 
                      ? product.title.split(' ').slice(0, 5).join(' ')
                      : product.title?.ar || 'product'
                    }
                  </CardTitle>
                  <CardDescription className="text-gray-600 mb-4 line-clamp-2">
                    {product.description?.slice(0, 80)}...
                  </CardDescription>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-green-600">
                      {product.price} EGP
                    </span>
                    <Link href={`/productdetails/${product._id}`} className="bg-gradient-to-r from-emerald-500 to-green-600 text-white px-6 py-2 rounded-xl font-semibold hover:from-emerald-600 hover:to-green-700 transition-all">
                     Details
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-32">
          <h3 className="text-4xl font-bold text-gray-800 mb-6">There are no products in this category.</h3>
          <Link href="/categories" className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-3 rounded-2xl font-bold shadow-lg transition-all">
            Return to Categories
          </Link>
        </div>
      )}
    </div>
  )
}
