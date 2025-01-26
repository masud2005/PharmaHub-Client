import { useQuery } from "@tanstack/react-query";
import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import useAxiosPublic from "../../hooks/useAxiosPublic";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./Banner.css";

// Import required modules
import { Autoplay, Navigation, Pagination } from "swiper/modules";

const Banner = () => {
    const axiosPublic = useAxiosPublic();

    // Ref for autoplay progress
    const progressCircle = useRef(null);
    const progressContent = useRef(null);

    const onAutoplayTimeLeft = (swiper, time, progress) => {
        if (progressCircle.current) {
            progressCircle.current.style.setProperty("--progress", 1 - progress);
        }
        if (progressContent.current) {
            progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
        }
    };

    // Fetching advertisements
    const { data: advertise = [] } = useQuery({
        queryKey: ["advertise"],
        queryFn: async () => {
            const res = await axiosPublic.get(`/approved-advertise`);
            return res.data;
        },
    });

    return (
        <div className="relative">
            <Swiper
                spaceBetween={0}
                centeredSlides={true}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                }}
                navigation={true}
                modules={[Autoplay, Pagination, Navigation]}
                onAutoplayTimeLeft={onAutoplayTimeLeft}
                className="mySwiper"
            >
                {advertise.map((ad, index) => (
                    <SwiperSlide key={index}>
                        <div className="relative w-full h-[300px] md:h-[500px] xl:h-[650px] rounded-b-lg">
                            <img
                                src={ad.image}
                                alt={`Advertisement ${index + 1}`}
                                className="absolute inset-0 w-full h-full object-cover rounded-b-lg"
                            />
                            {/* Overlay Text */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent flex flex-col justify-center items-center text-center p-5 rounded-b-lg">
                                <div className="px-10 md:px-0 md:min-w-[680px] xl:min-w-[992px]">
                                    <h3 className="text-white text-2xl md:text-4xl font-bold shadow-lg backdrop-blur-sm">
                                        {ad.name || "Advertisement"}
                                    </h3>
                                    <p className="text-white mt-2 text-sm md:text-base">
                                        {ad.description || ""}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
                {/* Autoplay Progress */}
                <div className="autoplay-progress absolute bottom-4 right-4 z-10" slot="container-end">
                    <svg viewBox="0 0 48 48" ref={progressCircle} className="w-10 h-10">
                        <circle cx="24" cy="24" r="20" className="text-white"></circle>
                    </svg>
                    <span ref={progressContent} className="text-white text-sm"></span>
                </div>
            </Swiper>
        </div>
    );
};

export default Banner;
