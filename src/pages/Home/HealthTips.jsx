import React from 'react';
import SectionTitle from '../../components/Shared/SectionTitle/SectionTitle';

const HealthTips = () => {

    const healthTips = [
        {
            tip: "Drink at least 8 glasses of water daily to stay hydrated.",
            icon: "💧",
        },
        {
            tip: "Include fruits and vegetables in every meal.",
            icon: "🍎",
        },
        {
            tip: "Exercise at least 30 minutes daily for a healthy body.",
            icon: "🏋️",
        },
        {
            tip: "Get 7-8 hours of sleep every night to recharge your body.",
            icon: "🛌",
        },
        {
            tip: "Wash your hands regularly to prevent infections.",
            icon: "🧼",
        },
        {
            tip: "Limit your sugar intake to maintain your energy levels.",
            icon: "🍭",
        },
    ]

    return (
        <div className="bg-gradient-to-r from-green-100 via-teal-100 to-blue-100 pb-10 pt-[10px] px-2">
            <SectionTitle heading={'Daily Health Tips'} subHeading={'Quick tips for a healthier you'} />
            <div className='container mx-auto' >
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
                    {healthTips.map((item, index) => (
                        <div key={index} className="p-2 md:p-5 bg-white rounded-lg shadow-lg text-center">
                            <span className="text-5xl">{item.icon}</span>
                            <p className="text-lg text-gray-700 mt-3">{item.tip}</p>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    );
};

export default HealthTips;