import React from 'react';
import { Text, Image } from '@mantine/core';

const TalentExperience = ({ experience }) => {
    return (
        <div className="mb-12">
            <div className="flex items-center gap-3 mb-8">
                <div className="h-1 w-12 bg-bright-sun-400 rounded-full"></div>
                <Text size="2xl" fw={900} className="text-mine-shaft-50 tracking-tight uppercase">Professional Experience</Text>
            </div>

            <div className="flex flex-col gap-10 relative pl-4 border-l-2 border-mine-shaft-800">
                {experience?.map((exp, index) => (
                    <div key={index} className="relative group">
                        {/* Timeline point */}
                        <div className="absolute -left-[27px] top-4 w-5 h-5 bg-mine-shaft-950 border-4 border-bright-sun-400 rounded-full z-10 group-hover:scale-125 transition-transform"></div>

                        <div className="flex gap-6 bg-mine-shaft-900/20 px-6! py-4! rounded-3xl border border-mine-shaft-800/40 hover:border-mine-shaft-600 transition-all">
                            <div className="w-16 h-16 rounded-2xl bg-mine-shaft-950 border border-mine-shaft-800 p-3 shrink-0 shadow-lg flex items-center justify-center">
                                <Image
                                    src={exp.company === "Google" ? "https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png" : "https://cdn-icons-png.flaticon.com/512/732/732221.png"}
                                    className="w-full h-full object-contain"
                                />
                            </div>
                            <div className="flex-1">
                                <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                                    <div className="flex-1">
                                        <Text size="xl" fw={800} className="text-mine-shaft-100 group-hover:text-bright-sun-400 transition-colors">{exp.title}</Text>
                                        <Text size="sm" fw={700} className="text-mine-shaft-300 opacity-90">{exp.company} • {exp.location}</Text>
                                    </div>
                                    <Text size="xs" fw={900} className="text-mine-shaft-950! bg-bright-sun-300 px-3! py-1! rounded-full uppercase tracking-tighter shadow-sm whitespace-nowrap">
                                        {exp.startDate} - {exp.endDate}
                                    </Text>
                                </div>
                                <Text size="sm" className="text-mine-shaft-200 mt-4 leading-relaxed text-justify opacity-80 group-hover:opacity-100 transition-opacity">
                                    {exp.description}
                                </Text>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TalentExperience;
