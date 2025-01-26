import React from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

// import './styles.css';

// import required modules
import { Autoplay, Pagination } from 'swiper/modules';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';
import SectionTitle from '../../components/Shared/SectionTitle/SectionTitle';

const DiscountProducts = () => {

    const axiosPublic = useAxiosPublic();

    const { data: discountProducts = [] } = useQuery({
        queryKey: ["discountProducts"],
        queryFn: async () => {
            const res = await axiosPublic.get(`/discounted-medicines`);
            console.log(res.data);
            return res.data;
        },
    });

    return (
        <div className='container mx-auto px-2 mb-10'>
            {/* Section Title */}
            <SectionTitle heading={'Discounted Products'} subHeading={'Grab deals on discounted items in a swipeable slider'} />
            <Swiper
                // spaceBetween={10}
                autoplay={{
                    delay: 2000,
                }}
                pagination={{
                    clickable: true,
                }}
                modules={[Pagination, Autoplay]}
                className="mySwiper"
                breakpoints={{
                    // when window width is >= 320px
                    320: {
                        slidesPerView: 2,
                        spaceBetween: 10
                    },
                    // when window width is >= 420px
                    420: {
                        slidesPerView: 3,
                        spaceBetween: 10
                    },
                    // when window width is >= 640px
                    640: {
                        slidesPerView: 4,
                        spaceBetween: 10
                    },
                    // when window width is >= 1024px
                    1024: {
                        slidesPerView: 5,
                        spaceBetween: 15
                    },
                    // when window width is >= 1280px
                    1280: {
                        slidesPerView: 6,
                        spaceBetween: 20
                    },
                }}
            >
                {discountProducts.map((product, index) => (
                    <SwiperSlide key={index}>
                        <div className="bg-gradient-to-br from-gray-50 to-white shadow-xl overflow-hidden">
                            <div className="relative h-48 md:h-56 xl:h-60 2xl:h-[280px] w-full">
                                {/* Product Image */}
                                <img
                                    src={product.imageURL}
                                    alt={product.name}
                                    className="w-full h-full object-cover"
                                />
                                {/* Overlay Text */}
                                <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col items-center justify-center text-center text-white px-4">
                                    <h3 className="text-lg md:text-xl font-bold">{product.name}</h3>
                                    <p className="text-sm md:text-base mt-1">
                                        Price: <span className="line-through text-red-400">${product.pricePerUnit}</span>{" "}
                                        <span className="font-semibold text-green-400">${product.pricePerUnit - (product.pricePerUnit * product.discountPercentage / 100)}</span>
                                    </p>
                                </div>
                                {/* Discount Badge */}
                                <span className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                                    {product.discountPercentage}% Off
                                </span>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

        </div>
    );
};

export default DiscountProducts;