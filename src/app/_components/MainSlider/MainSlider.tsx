'use client'
import React from 'react'
import img1 from '../../../assets/image/grocery-banner.png'
import img2 from '../../../assets/image/grocery-banner-2.jpeg'
import img3 from '../../../assets/image/slider-image-1.jpeg'
import img4 from '../../../assets/image/slider-image-2.jpeg'
import img5 from '../../../assets/image/slider-image-3.jpeg'
import Image from 'next/image'
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import {Autoplay } from 'swiper/modules'

export default function MainSlider() {
  return (
    <>
    <div className="flex">
        <div className="w-3/4">
        <Swiper
        modules={[Autoplay]}
        autoplay={{
            delay:600
        }}
      spaceBetween={0}
      slidesPerView={1}
      onSlideChange={() => console.log('slide change')}
      onSwiper={(swiper) => console.log(swiper)}
    >
      <SwiperSlide><Image className='w-full h-[400px] object-cover' src={img3} alt='img1' width={600} height={300}/></SwiperSlide>
      <SwiperSlide><Image className='w-full h-[400px] object-cover' src={img4} alt='img1' width={600} height={300}/></SwiperSlide>
      <SwiperSlide><Image className='w-full h-[400px] object-cover' src={img5} alt='img1' width={600} height={300}/></SwiperSlide>

      ...
    </Swiper>

        </div>
        <div className="w-1/4">
        <Image className='w-full h-[200px] object-cover' src={img1} alt='img1' width={200} height={200}/>
        <Image className='w-full h-[200px] object-cover' src={img2} alt='img1' width={200} height={200}/>
        
        </div>
    </div>
    
    
    </>
  )
}
