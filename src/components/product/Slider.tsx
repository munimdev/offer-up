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
          <SwiperSlide
            key={image}
            className="border border-gray-300 rounded-md  "
            style={{ background: "#f2f2f2" }}
          >
            <img
              src={image}
              alt={`Main Slide ${image}`}
              className="h-full sm:h-auto"
            />
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
        style={{ padding: "8px 4px 0px 8px" }}
      >
        {imagesSub?.map((image, index) => (
          <SwiperSlide key={image}>
            <img
              src={image}
              alt={`Thumb ${index}`}
              onClick={() => handleThumbClick(index)}
              className=""
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default Slider;
