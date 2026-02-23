import React from 'react';
import { IconBrandFacebook, IconBrandInstagram, IconBrandTwitter, IconBrandLinkedin, IconAnchor } from '@tabler/icons-react';

const Footer = () => {
    const socialLinks = [
        { icon: IconBrandFacebook, link: "#" },
        { icon: IconBrandInstagram, link: "#" },
        { icon: IconBrandTwitter, link: "#" },
        { icon: IconBrandLinkedin, link: "#" },
    ];

    const footerLinks = [
        {
            title: "Product",
            links: [
                { name: "Find Job", url: "/find-jobs" },
                { name: "Post Job", url: "/post-jobs" },
                { name: "Find Talent", url: "/find-talents" }
            ]
        },
        {
            title: "Category",
            links: [
                { name: "About Us", url: "/about-us" },
                { name: "Contact Us", url: "/about-us" },
                { name: "Privacy Policy", url: "/about-us" },
                { name: "Terms & Conditions", url: "/about-us" }
            ]
        },
        {
            title: "Support",
            links: [
                { name: "Help & Support", url: "/about-us" },
                { name: "Feedback", url: "/about-us" },
                { name: "FAQs", url: "/about-us" }
            ]
        }
    ];

    return (
        <footer className="relative bg-black text-mine-shaft-300">
            {/* Seamless Blending Layer - Gradient from previous section color to black */}
            <div className="absolute top-0 left-0 w-full h-24 -translate-y-full bg-linear-to-t from-black to-transparent pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-6 md:px-12 py-8 mt-10">
                <div className="flex flex-col md:flex-row flex-wrap gap-12 lg:gap-8 justify-between">
                    {/* Column 1: Brand & About - Dominating Width */}
                    <div className="w-full lg:w-[30%] flex flex-col gap-6">
                        <div className="flex items-center gap-2">
                            <IconAnchor className="text-bright-sun-400" size={32} stroke={2.5} />
                            <span className="text-mine-shaft-50 text-2xl font-black tracking-tighter">
                                BE ON <span className="text-bright-sun-400">BOARD</span>
                            </span>
                        </div>
                        <p className="text-sm leading-relaxed text-mine-shaft-400">
                            Job portal with user profile, skill update certification, work experience, and admin job posting. Find your next big opportunity with us.
                        </p>
                        <div className="flex items-center gap-4">
                            {socialLinks.map((social, index) => (
                                <a
                                    key={index}
                                    href={social.link}
                                    className="p-2.5 rounded-full bg-mine-shaft-900/50 text-mine-shaft-300 hover:bg-bright-sun-400 hover:text-mine-shaft-950 transition-all duration-300 transform hover:-translate-y-1 shadow-lg"
                                >
                                    <social.icon size={20} />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Columns 2, 3, 4: Links - Smaller Width */}
                    {footerLinks.map((section, index) => (
                        <div key={index} className="w-full md:w-[45%] lg:w-[15%] flex flex-col gap-6">
                            <h3 className="text-mine-shaft-50 text-lg font-bold tracking-wide">
                                {section.title}
                            </h3>
                            <ul className="flex flex-col gap-4 text-sm">
                                {section.links.map((link, linkIndex) => (
                                    <li key={linkIndex}>
                                        <a
                                            href={link.url}
                                            className="hover:text-bright-sun-400 transition-colors duration-200 flex items-center group"
                                        >
                                            <span className="w-1.5 h-1.5 rounded-full bg-bright-sun-400 opacity-0 group-hover:opacity-100 transition-all duration-200 -ml-3 mr-1.5"></span>
                                            {link.name}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Bottom Bar */}
                <div className="mt-12 pt-8 border-t border-mine-shaft-900/50 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-medium text-mine-shaft-500">
                    <p className='flex items-center gap-2'><span className='text-xl'>©</span> {new Date().getFullYear()} Be On Board. All Rights Reserved.</p>
                    <div className="flex items-center gap-6">
                        <span className="text-mine-shaft-400 hover:text-bright-sun-400 pointer-events-none">Designed with <span className="text-xl">❤️</span> for Professionals</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;