'use server'
import { getAccessToken } from "@/schema/access-token"

export async function addToWishlist(productId: string) {
    try {
        const token = await getAccessToken()
        
        if(!token){
           throw new Error('Please login first')
        }
          
        const resp = await fetch(`${process.env.API}/wishlist`, {
            cache: "no-store",
            method: 'POST',
            headers: {
                'token': token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                productId: productId
            })
        })
        
        const payload = await resp.json()
        
        if (!resp.ok) {
            throw new Error(payload.message || 'Failed to add to wishlist')
        }
        
        // ✅ إرجاع response واضح مع message
        return {
            success: true,
            message: payload.message || 'تمت الإضافة للـ Wishlist بنجاح ❤️',
            data: payload
        }
        
    } catch (error: any) {
        console.error('💥 addToWishlist Error:', error)
        throw new Error(error.message || 'حدث خطأ في الإضافة للـ Wishlist')
    }
}
