import React, { useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { Swiper, SwiperSlide } from "swiper/react";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { Autoplay, Navigation, Pagination } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./Banner.css";

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
    const { data: advertise = [], isLoading } = useQuery({
        queryKey: ["advertise"],
        queryFn: async () => {
            const res = await axiosPublic.get(`/approved-advertise`);
            return res.data;
        },
    });

    return (
        <div className="container px-2 mx-auto mt-16">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-5 md:gap-2 lg:gap-6 items-center">
                {/* Left Side Info Section */}
                <div className="md:col-span-2 bg-gradient-to-r from-pink-500 to-teal-500 p-[2px] rounded-lg h-full">
                    <div className="bg-gray-200 p-5 lg:p-4 xl:p-8 rounded-lg h-full place-content-center">
                        <p className="lg:text-lg text-gray-700 mb-4">
                            Welcome to <span className='text-2xl italic bg-gradient-to-r from-teal-600 to-pink-500 text-transparent bg-clip-text font-semibold'>PharmaHub!</span> Your trusted online pharmacy for all your healthcare needs. We provide a wide range of medicines, healthcare products, and expert advice to ensure your well-being. Explore our services and make your health our priority.
                        </p>
                        <ul className="mt-4 space-y-4">
                            <li className="flex items-center gap-3">
                                <span className="bg-teal-600 text-white p-3 rounded-full">💊</span>
                                <p className="text-gray-800">Wide Range of Medicines</p>
                            </li>
                            <li className="flex items-center gap-3">
                                <span className="bg-teal-600 text-white p-3 rounded-full">📦</span>
                                <p className="text-gray-800">Fast & Reliable Delivery</p>
                            </li>
                            <li className="flex items-center gap-3">
                                <span className="bg-teal-600 text-white p-3 rounded-full">📞</span>
                                <p className="text-gray-800">24/7 Customer Support</p>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Slider Section */}
                <div className="md:col-span-3">

                    {
                        isLoading ? (
                            <div className="flex justify-center items-center  h-40 ">
                                <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-teal-500"></div>
                            </div>
                        ) : (
                            <div className="">
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
                                    className="mySwiper rounded-lg overflow-hidden shadow-lg"
                                >
                                    {advertise.map((ad, index) => (
                                        <SwiperSlide key={index}>
                                            <div className="relative w-full h-[300px] md:h-[435px] lg:h-[430px] xl:h-[480px] 2xl:h-[500px]">
                                                <img
                                                    src={ad.image}
                                                    alt={`Advertisement ${index + 1}`}
                                                    className="absolute inset-0 w-full h-full object-center brightness-75"
                                                />
                                                {/* Overlay Text */}
                                                <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-5">
                                                    <div className="min-w-[300px] md:px-0 md:min-w-[620px] lg:min-w-[768px] xl:min-w-[992px] bg-black/40 py-8">
                                                        <h3 className="text-white text-2xl md:text-4xl font-bold">
                                                            {ad.name || "Advertisement"}
                                                        </h3>
                                                        <p className="text-white mt-2 text-sm md:text-base overflow-visible">
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
                        )
                    }
                </div>

            </div>
        </div>
    );
};

export default Banner;