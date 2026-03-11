import { ProductItem } from "../types/productinterface";
import { ProductCard } from "./_components/ProductCard/ProductCard";
import MainSlider from "./_components/MainSlider/MainSlider";
import CategorySlider from "./_components/CategorySlider/CategorySlider";


export default async function Home() {
  let response = await fetch('https://ecommerce.routemisr.com/api/v1/products ')
  let {data:allProducts} : {data : ProductItem[]} = await response.json()
  return (
    <>
    <MainSlider/>
    <CategorySlider/>
    <div className="grid mt-5 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
        {allProducts?.map((product)=>  <ProductCard key={product._id}  prod={product}/>  )}
    </div>
    
    </>
  );
}
