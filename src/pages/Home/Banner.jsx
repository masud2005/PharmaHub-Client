import React from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

const Banner = () => {
    const axiosPublic = useAxiosPublic();

    const { data: advertise = [] } = useQuery({
        queryKey: ["advertise"],
        queryFn: async () => {
            const res = await axiosPublic.get(`/approved-advertise`);
            console.log(res.data);
            return res.data;
        },
    });

    return (
        <div className="relative">
            <Carousel
                autoPlay
                infiniteLoop
                showThumbs={false}
                showStatus={true}
                swipeable
                stopOnHover
                interval={4000}
                transitionTime={800}
                className="rounded-lg overflow-hidden shadow-xl"
            >
                {advertise.map((ad, index) => (
                    <div
                        key={index}
                        className="h-[300px] md:h-[500px] xl:h-[650px] flex items-center justify-center relative"
                    >
                        <img
                            src={ad.image}
                            alt={`Advertisement ${index + 1}`}
                            className="w-full h-full object-cover"
                        />
                        {/* Overlay Text */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent flex flex-col justify-center items-center text-center p-5">
                            <h3 className="text-white text-2xl md:text-4xl font-bold shadow-lg backdrop-blur-sm">
                                {ad.name || "Advertisement"}
                            </h3>
                            <p className="text-white mt-2 text-sm md:text-base">
                                {ad.description}
                            </p>
                        </div>
                    </div>
                ))}
            </Carousel>
        </div>
    );
};

export default Banner;
