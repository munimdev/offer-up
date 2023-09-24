import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "./swiper.css";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import Image from "next/image";
type Props = {
  imagesMain: string[];
  imagesSub: string[];
};

const Slider: React.FC<Props> = ({ imagesMain, imagesSub }) => {
  const mainSwiperRef = useRef<any>(null);
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);

  const handleThumbClick = (index: number) => {
    // if (mainSwiperRef.current) {
    //   mainSwiperRef.current.slideTo(index); // Slide to the clicked thumb index
    // }
  };

  return (
    <>
      <Swiper
        initialSlide={0}
        ref={mainSwiperRef}
        spaceBetween={10}
        navigation={true}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper2"
      >
        {imagesMain?.map((image) => (
          <SwiperSlide key={image}>
            <img src={image} alt={`Main Slide ${image}`} />
          </SwiperSlide>
        ))}
      </Swiper>
      <Swiper
        onSwiper={(swiper) => {
          setThumbsSwiper(swiper);
        }}
        spaceBetween={10}
        slidesPerView={16}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper"
      >
        {imagesSub?.map((image, index) => (
          <SwiperSlide key={image}>
            <img
              src={image}
              alt={`Thumb ${index}`}
              onClick={() => handleThumbClick(index)}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default Slider;
