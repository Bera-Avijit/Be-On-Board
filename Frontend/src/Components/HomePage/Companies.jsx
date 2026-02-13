import React from 'react';
import Marquee from "react-fast-marquee";

const companies = [
    { name: "Google", logo: "https://svgl.app/library/google.svg" },
    { name: "Amazon", logo: "https://www.vectorlogo.zone/logos/amazon/amazon-ar21.svg" },
    { name: "Microsoft", logo: "https://svgl.app/library/microsoft.svg" },
    { name: "Apple", logo: "https://svgl.app/library/apple.svg" },
    { name: "Netflix", logo: "https://svgl.app/library/netflix-wordmark.svg" },
    { name: "Meta", logo: "https://svgl.app/library/meta.svg" },
    { name: "Spotify", logo: "https://svgl.app/library/spotify_wordmark.svg" },
    { name: "Tesla", logo: "https://www.vectorlogo.zone/logos/tesla/tesla-icon.svg" },
    { name: "Airbnb", logo: "https://svgl.app/library/airbnb-wordmark.svg" },
    { name: "Slack", logo: "https://svgl.app/library/slack-wordmark.svg" },
    { name: "Adobe", logo: "https://svgl.app/library/adobe.svg" },
    { name: "Intel", logo: "https://www.vectorlogo.zone/logos/intel/intel-icon.svg" },
    { name: "Nvidia", logo: "https://svgl.app/library/nvidia-icon-light.svg" },
    { name: "Stripe", logo: "https://svgl.app/library/stripe.svg" },
    { name: "Uber", logo: "https://svgl.app/library/uber_light.svg" },
    { name: "Zillow", logo: "https://cdn.worldvectorlogo.com/logos/zillow.svg" }
];

const Companies = () => {
    return (
        <div className="mt-20 pb-5 bg-mine-shaft-950 overflow-hidden">
            {/* Header Text */}
            <div className="text-center my-10">
                <h2 className="text-mine-shaft-300 text-lg md:text-2xl font-semibold tracking-[0.25em] uppercase">
                    Trusted by <span className="text-bright-sun-400 font-bold tracking-[0.2em] drop-shadow-[0_0_15px_rgba(250,250,21,0.4)]">1000+</span> Companies
                </h2>
            </div>

            <div className="flex flex-col gap-2">
                {/* Row 1: Right to Left (Default) */}
                <Marquee gradient={false} speed={60} pauseOnHover={true}>
                    {companies.slice(0, 8).map((company, index) => (
                        <div key={index} className="flex items-center mx-12 lg:mx-14 group transition-all duration-500 py-4">
                            <img
                                src={company.logo}
                                alt={company.name}
                                className="h-8 md:h-10 w-auto transition-all duration-500 cursor-pointer drop-shadow-[0_0_10px_rgba(0,0,0,0.5)] group-hover:scale-125 group-hover:drop-shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                                onError={(e) => { e.target.src = `https://ui-avatars.com/api/?name=${company.name}&background=2d2d2d&color=fff`; }}
                            />
                        </div>
                    ))}
                </Marquee>

                {/* Row 2: Left to Right */}
                <Marquee gradient={false} speed={60} pauseOnHover={true} direction="right">
                    {companies.slice(8).map((company, index) => (
                        <div key={index} className="flex items-center mx-12 lg:mx-14 group transition-all duration-500 py-4">
                            <img
                                src={company.logo}
                                alt={company.name}
                                className="h-8 md:h-10 w-auto transition-all duration-500 cursor-pointer drop-shadow-[0_0_10px_rgba(0,0,0,0.5)] group-hover:scale-125 group-hover:drop-shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                                onError={(e) => { e.target.src = `https://ui-avatars.com/api/?name=${company.name}&background=2d2d2d&color=fff`; }}
                            />
                        </div>
                    ))}
                </Marquee>
            </div>
        </div>
    );
};

export default Companies;
