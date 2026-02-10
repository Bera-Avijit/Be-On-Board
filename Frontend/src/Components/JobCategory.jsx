import React, { useRef, useState, useEffect } from 'react';
import { IconArrowLeft, IconArrowRight } from '@tabler/icons-react';

const jobCategories = [
    {
        id: 1,
        name: "UI/UX Designer",
        image: "https://img.icons8.com/color/96/design.png",
        description: "Designing seamless user experiences and beautiful interfaces.",
        jobs: "1.5K+ Jobs Posted"
    },
    {
        id: 2,
        name: "Web Developer",
        image: "https://img.icons8.com/color/96/code.png",
        description: "Building responsive and high-performance web applications.",
        jobs: "2K+ Jobs Posted"
    },
    {
        id: 3,
        name: "Data Scientist",
        image: "https://img.icons8.com/color/96/data-configuration.png",
        description: "Transforming data into actionable insights and intelligence.",
        jobs: "800+ Jobs Posted"
    },
    {
        id: 4,
        name: "Cloud Architect",
        image: "https://img.icons8.com/color/96/cloud-lighting.png",
        description: "Designing scalable and secure cloud infrastructure.",
        jobs: "500+ Jobs Posted"
    },
    {
        id: 5,
        name: "Product Manager",
        image: "https://img.icons8.com/color/96/package.png",
        description: "Overseeing product development from concept to launch.",
        jobs: "1.2K+ Jobs Posted"
    },
    {
        id: 6,
        name: "App Developer",
        image: "https://img.icons8.com/color/96/iphone.png",
        description: "Developing innovative mobile applications for iOS & Android.",
        jobs: "900+ Jobs Posted"
    },
    {
        id: 7,
        name: "Graphic Designer",
        image: "https://img.icons8.com/color/96/vector.png",
        description: "Creating visual concepts to communicate ideas that inspire.",
        jobs: "1.1K+ Jobs Posted"
    },
    {
        id: 8,
        name: "Customer Support",
        image: "https://img.icons8.com/color/96/service.png",
        description: "Ensuring customer satisfaction through excellent service.",
        jobs: "1.3K+ Jobs Posted"
    },
    {
        id: 9,
        name: "Finance Manager",
        image: "https://img.icons8.com/color/96/money-bag.png",
        description: "Managing financial assets and strategic planning.",
        jobs: "700+ Jobs Posted"
    },
    {
        id: 10,
        name: "Sales Executive",
        image: "https://img.icons8.com/color/96/sales-performance.png",
        description: "Driving revenue growth through strategic sales initiatives.",
        jobs: "1.9K+ Jobs Posted"
    },
    {
        id: 11,
        name: "Human Resources",
        image: "https://img.icons8.com/color/96/gender-neutral-user.png",
        description: "Nurturing talent and building strong organizational cultures.",
        jobs: "600+ Jobs Posted"
    }
];

const JobCategory = () => {
    const scrollRef = useRef(null);
    const [showLeftArrow, setShowLeftArrow] = useState(false);
    const [showRightArrow, setShowRightArrow] = useState(true);

    const checkScroll = () => {
        if (scrollRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
            setShowLeftArrow(scrollLeft > 10);
            setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
        }
    };

    useEffect(() => {
        checkScroll();
        window.addEventListener('resize', checkScroll);
        return () => window.removeEventListener('resize', checkScroll);
    }, []);

    const scroll = (direction) => {
        if (scrollRef.current) {
            const { current } = scrollRef;
            // Calculate one card's width + the gap (20px)
            const firstCard = current.querySelector('div');
            if (firstCard) {
                const cardWidthIncludingGap = firstCard.offsetWidth + 20;
                if (direction === 'left') {
                    current.scrollBy({ left: -cardWidthIncludingGap, behavior: 'smooth' });
                } else {
                    current.scrollBy({ left: cardWidthIncludingGap, behavior: 'smooth' });
                }
            }
        }
    };

    return (
        <div className='mt-20 pb-12 bg-mine-shaft-950 px-4 md:px-10 relative group/section'>
            <div className="text-center">
                <h2 className="text-mine-shaft-300 text-lg md:text-2xl font-semibold tracking-wide uppercase">
                    Browse <span className="text-bright-sun-400 font-bold tracking-widest drop-shadow-[0_0_15px_rgba(250,250,21,0.4)]">Job</span> Categories
                </h2>
            </div>
            <p className='text-sm md:text-base text-center font-medium text-mine-shaft-400 tracking-wide mt-4 w-full md:w-2/3 mx-auto'>
                Explore diverse job opportunities tailored to your skills and interests.<br />Start your career journey today!
            </p>

            <div className="relative flex items-center mt-3">
                {/* Left Arrow */}
                <button
                    onClick={() => scroll('left')}
                    className={`absolute left-0 z-10 p-2 rounded-full bg-mine-shaft-800/40 backdrop-blur-sm border border-mine-shaft-700 text-mine-shaft-300 hover:text-bright-sun-400 hover:border-bright-sun-400/50 hover:bg-mine-shaft-800/60 transition-all duration-300 -translate-x-1/2 md:-translate-x-6 hidden md:flex active:scale-95 shadow-lg ${showLeftArrow ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                >
                    <IconArrowLeft size={24} />
                </button>

                {/* Categories Container */}
                <div
                    ref={scrollRef}
                    onScroll={checkScroll}
                    className="flex overflow-x-auto gap-5 py-8 px-6 scrollbar-hide no-scrollbar scroll-smooth w-full"
                >
                    {jobCategories.map((category) => (
                        <div
                            key={category.id}
                            className="flex flex-col items-center text-center min-w-[240px] md:min-w-[280px] lg:min-w-[calc(22.5%-20px)] bg-mine-shaft-900/40 backdrop-blur-xl border border-mine-shaft-800 rounded-2xl p-5 transition-all duration-300 hover:scale-[1.05] hover:border-bright-sun-400/40 hover:shadow-[0_0_30px_rgba(250,250,21,0.1)] group cursor-pointer"
                        >
                            <div className="w-14 h-14 bg-mine-shaft-800/50 rounded-xl flex items-center justify-center mb-4 group-hover:bg-bright-sun-400/10 transition-colors duration-300">
                                <img src={category.image} alt={category.name} className="w-9 h-9 object-contain group-hover:scale-110 transition-transform duration-300" />
                            </div>

                            <h3 className="text-mine-shaft-100 text-lg font-bold mb-2 group-hover:text-bright-sun-400 transition-colors duration-300 line-clamp-1">
                                {category.name}
                            </h3>

                            <p className="text-mine-shaft-400 text-xs leading-relaxed mb-5 font-medium line-clamp-2">
                                {category.description}
                            </p>

                            <div className="mt-auto px-4 py-1.5 bg-mine-shaft-800/50 rounded-full border border-mine-shaft-700 group-hover:border-bright-sun-400/30 transition-all duration-300">
                                <span className="text-bright-sun-400 text-[10px] md:text-xs font-bold tracking-tight">
                                    {category.jobs}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Right Arrow */}
                <button
                    onClick={() => scroll('right')}
                    className={`absolute right-0 z-10 p-2 rounded-full bg-mine-shaft-800/40 backdrop-blur-sm border border-mine-shaft-700 text-mine-shaft-300 hover:text-bright-sun-400 hover:border-bright-sun-400/50 hover:bg-mine-shaft-800/60 transition-all duration-300 translate-x-1/2 md:translate-x-6 hidden md:flex active:scale-95 shadow-lg ${showRightArrow ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                >
                    <IconArrowRight size={24} />
                </button>
            </div>

            {/* Custom Styles for hiding scrollbar but keeping it functional */}
            <style jsx>{`
                .no-scrollbar::-webkit-scrollbar {
                    display: none;
                }
                .no-scrollbar {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}</style>
        </div>
    );
};

export default JobCategory;