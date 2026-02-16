import React from 'react';
import { IconFileText, IconSearch, IconSend, IconDiscountCheck } from '@tabler/icons-react';
import howItWorksImg from "../../assets/how_it_works.png"

const steps = [
    {
        icon: <IconFileText size={32} className="text-bright-sun-400" />,
        title: "Build Your Resume",
        description: "Create a professional profile that highlights your skills and experience."
    },
    {
        icon: <IconSearch size={32} className="text-bright-sun-400" />,
        title: "Search Your Job",
        description: "Browse through thousands of relevant job listings filtered by your preferences."
    },
    {
        icon: <IconSend size={32} className="text-bright-sun-400" />,
        title: "Apply for Job",
        description: "Submit your application directly to employers with just one click. It's fast and easy."
    },
    {
        icon: <IconDiscountCheck size={32} className="text-bright-sun-400" />,
        title: "Get Hired",
        description: "Land your dream job! Prepare for interviews and start your career journey today."
    }
];

const WorkingSteps = () => {
    return (
        <div className="bg-mine-shaft-950 px-4 md:px-20 py-10">
            <div className="text-center mb-10">
                <h2 className="text-mine-shaft-300 text-lg md:text-3xl font-semibold tracking-wide uppercase">
                    How it <span className="text-bright-sun-400 font-extrabold tracking-widest drop-shadow-[0_0_15px_rgba(250,250,21,0.4)]">Works</span>
                </h2>
                <p className='text-xs md:text-base font-medium text-mine-shaft-400 tracking-wide mt-2 w-full md:w-2/3 mx-auto'>
                    Follow these simple steps to find and land your next big opportunity.<br />We've streamlined the process just for you.
                </p>
            </div>

            <div className="flex flex-col md:flex-row items-center justify-center gap-12 lg:gap-24 max-w-7xl mx-auto">
                {/* Left Side: Image centered in its half */}
                <div className="w-full md:w-1/2 flex justify-center">
                    <div className="relative group flex justify-center items-center">
                        {/* Dynamic Background Glow on Hover */}
                        <div className="absolute inset-0 bg-bright-sun-400/0 rounded-3xl blur-[80px] group-hover:bg-bright-sun-400/15 transition-all duration-700 pointer-events-none"></div>

                        {/* Image without boundary, with upscale effect */}
                        <div className="relative z-10 w-full max-w-[500px] transition-all duration-700 ease-in-out group-hover:scale-105 group-hover:-translate-y-2">
                            <img
                                src={howItWorksImg}
                                alt="How it works illustration"
                                className="w-full h-auto object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
                            />
                        </div>
                    </div>
                </div>

                {/* Right Side: Steps centered in its half */}
                <div className="w-full md:w-1/2 flex justify-center">
                    <div className="w-full max-w-[450px] flex flex-col gap-4">
                        {steps.map((step, index) => (
                            <div
                                key={index}
                                className="flex items-center gap-4 p-4 bg-mine-shaft-900/30 backdrop-blur-md border border-mine-shaft-600 rounded-xl transition-all duration-300 hover:scale-[1.03] hover:border-bright-sun-400/40 group cursor-default"
                            >
                                <div className="shrink-0 w-12 h-12 bg-mine-shaft-800/50 rounded-lg flex items-center justify-center group-hover:bg-bright-sun-400/10 transition-colors duration-300 shadow-inner">
                                    {step.icon}
                                </div>
                                <div>
                                    <h3 className="text-mine-shaft-100 text-base md:text-lg font-bold group-hover:text-bright-sun-400 transition-colors duration-300 leading-tight">
                                        {step.title}
                                    </h3>
                                    <p className="text-mine-shaft-400 text-xs md:text-sm font-medium leading-normal mt-0.5 line-clamp-2 lg:line-clamp-none">
                                        {step.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WorkingSteps;