import React, { useState, useRef, useEffect } from 'react';
import { Avatar } from '@mantine/core';
import { IconStar, IconStarFilled, IconStarHalfFilled, IconArrowLeft, IconArrowRight } from '@tabler/icons-react';

const testimonials = [
    {
        name: "Arjun Singh",
        avatar: "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-1.png",
        rating: 4.5,
        review: "This job portal completely changed my career path. The interface is so intuitive and I found my dream job within weeks of signing up. Highly recommended for anyone looking for serious opportunities!"
    },
    {
        name: "Ananya Iyer",
        avatar: "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-4.png",
        rating: 4.5,
        review: "The 'How it Works' section made everything so clear. I followed the steps and landed an internship at a top tech company. Truly a game-changer for students and professionals alike!"
    },
    {
        name: "Rohan Gupta",
        avatar: "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-3.png",
        rating: 3.5,
        review: "Great platform with a wide variety of job listings. The search filters are very effective. I appreciate the professional look and feel of the site. It really stands out from other job boards."
    },
    {
        name: "Priya Sharma",
        avatar: "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-5.png",
        rating: 4.2,
        review: "Very pleasant experience using this portal. The responsiveness across devices is flawless. It's rare to find such a well-designed and functional application in the job market today."
    },
    {
        name: "Vikram Malhotra",
        avatar: "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-2.png",
        rating: 4.8,
        review: "I love the glassmorphism design! It feels so premium and modern. The 'Be on Board' feature is particularly impressive and made the application process feel much more interactive and professional."
    },
    {
        name: "Sanya Verma",
        avatar: "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-6.png",
        rating: 4.5,
        review: "The community here is amazing. I didn't just find a job, I found mentors and friends who helped me grow as a developer. This portal is more than just a job board."
    }
];

const TestimonialCard = ({ name, avatar, rating, review }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const shortReview = review.length > 80 ? review.substring(0, 80) + "..." : review;

    return (
        <div className="flex flex-col gap-3 p-5 bg-mine-shaft-900/40 backdrop-blur-md border border-mine-shaft-500 rounded-2xl transition-all duration-300 hover:scale-[1.02] hover:border-bright-sun-400 group w-72 md:w-80 shrink-0 h-full">
            <div className="flex items-center gap-3">
                <Avatar src={avatar} alt={name} radius="xl" size="lg" className="border-2 border-mine-shaft-700 group-hover:border-bright-sun-400/50 transition-colors" />
                <div>
                    <h3 className="text-mine-shaft-50 font-bold text-base md:text-lg leading-tight">{name}</h3>
                    <div className="flex items-center mt-1">
                        {[...Array(5)].map((_, i) => {
                            const starValue = i + 1;
                            if (rating >= starValue) {
                                return <IconStarFilled key={i} size={14} className="text-bright-sun-400" />;
                            } else if (rating >= starValue - 0.5) {
                                return <IconStarHalfFilled key={i} size={14} className="text-bright-sun-400" />;
                            } else {
                                return <IconStar key={i} size={14} className="text-mine-shaft-600" />;
                            }
                        })}
                    </div>
                </div>
            </div>

            <div className="text-mine-shaft-300 text-xs md:text-sm leading-relaxed">
                {isExpanded ? review : shortReview}
                {review.length > 80 && (
                    <button
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="text-bright-sun-400 font-bold ml-1 hover:underline focus:outline-none text-[10px] uppercase tracking-wider"
                    >
                        {isExpanded ? "Show Less" : "Read More"}
                    </button>
                )}
            </div>
        </div>
    );
};

const Testimonials = () => {
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
            const card = current.querySelector('.snap-center');
            if (card) {
                const scrollAmount = card.offsetWidth + 24; // width + gap
                if (direction === 'left') {
                    current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
                } else {
                    current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
                }
            }
        }
    };

    return (
        <section className="bg-mine-shaft-950 px-4 md:px-10 lg:px-15 py-16 overflow-hidden">
            <div className="text-center mb-4">
                <h2 className="text-mine-shaft-200 text-2xl md:text-4xl font-extrabold mb-3">
                    What <span className="text-bright-sun-400">Users</span> Say About Us<span className="text-bright-sun-400">!</span>
                </h2>
                <p className="text-mine-shaft-300/80 text-sm md:text-base font-medium max-w-2xl mx-auto">
                    Hear from the people who found their career path through our portal.<br /> Real stories, real success.
                </p>
            </div>

            <div className="relative max-w-7xl mx-auto group">
                {/* Left Arrow */}
                <button
                    onClick={() => scroll('left')}
                    className={`absolute left-0 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-mine-shaft-800/80 backdrop-blur-md border border-mine-shaft-600 text-bright-sun-400 hover:bg-bright-sun-400 hover:text-mine-shaft-950 transition-all duration-300 -translate-x-2 md:-translate-x-6 shadow-2xl active:scale-95 ${showLeftArrow ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                >
                    <IconArrowLeft size={24} />
                </button>

                {/* Scroll Container */}
                <div
                    ref={scrollRef}
                    onScroll={checkScroll}
                    className="flex flex-row px-1 gap-6 overflow-x-auto py-8 no-scrollbar snap-x snap-mandatory scroll-smooth relative z-10"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                    {testimonials.map((testimonial, index) => (
                        <div key={index} className="snap-center">
                            <TestimonialCard {...testimonial} />
                        </div>
                    ))}
                </div>

                {/* Right Arrow */}
                <button
                    onClick={() => scroll('right')}
                    className={`absolute right-0 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-mine-shaft-800/80 backdrop-blur-md border border-mine-shaft-600 text-bright-sun-400 hover:bg-bright-sun-400 hover:text-mine-shaft-950 transition-all duration-300 translate-x-2 md:translate-x-6 shadow-2xl active:scale-95 ${showRightArrow ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                >
                    <IconArrowRight size={24} />
                </button>
            </div>

            <style jsx>{`
                .no-scrollbar::-webkit-scrollbar {
                    display: none;
                }
            `}</style>
        </section>
    );
};

export default Testimonials;