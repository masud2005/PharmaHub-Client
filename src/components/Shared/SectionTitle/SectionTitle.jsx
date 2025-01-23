import React from 'react';

const SectionTitle = ({ subHeading, heading }) => {
    return (
        <div className="max-w-[424px] mx-auto mt-[70px] mb-10 px-2">
            <p className=" text-xl text-center pb-2 text-teal-600">---{subHeading}---</p>
            <h1 className="text-4xl font-medium border-y-[3px] py-3 text-center uppercase text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-pink-500">{heading}</h1>
        </div>
    );
};

export default SectionTitle;