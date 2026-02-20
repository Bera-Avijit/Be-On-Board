import React from 'react';
import { Image, Text, Group, Button, Badge, Avatar } from '@mantine/core';
import { IconMapPin, IconBriefcase, IconExternalLink, IconTimeline } from '@tabler/icons-react';

const TalentHeader = ({ talent }) => {
    return (
        <div className="relative mb-24 group">
            {/* Banner with modern gradient overlay */}
            <div className="h-60 w-full rounded-2xl overflow-hidden relative shadow-2xl">
                <Image
                    src="https://images.unsplash.com/photo-1579546929518-9e396f3cc809?q=80&w=2070&auto=format&fit=crop"
                    className="w-full h-full object-cover grayscale-20 group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100"
                />
                <div className="absolute inset-0 bg-linear-to-t from-mine-shaft-950 via-mine-shaft-950/40 to-transparent"></div>
            </div>

            {/* Profile Info Structure - Left Aligned with Details Below */}
            <div className="absolute -bottom-48 left-8 right-8 flex flex-row items-end justify-between">
                <div className="flex flex-col items-start gap-4">
                    <div className="relative shrink-0">
                        <div className="w-48 h-48 rounded-full border-8 border-mine-shaft-950 overflow-hidden bg-mine-shaft-900 shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-all duration-500 hover:scale-105">
                            <Avatar
                                src={talent.image}
                                alt={talent.name}
                                size="100%"
                                radius="xl"
                                color="yellow"
                                variant="filled"
                                className="w-full! h-full! object-cover shadow-2xl!"
                            />
                        </div>
                        <div className="absolute bottom-4 right-4 w-6 h-6 bg-bright-sun-400 rounded-full border-4 border-mine-shaft-950"></div>
                    </div>

                    <div className="flex flex-col items-start">
                        <div className="flex items-center gap-3">
                            <Text fw={900} className="text-4xl text-mine-shaft-50 tracking-tighter drop-shadow-md">
                                {talent.name}
                            </Text>
                            <Badge color="yellow" variant="filled" size="sm" radius="md" className="bg-bright-sun-400 text-mine-shaft-950 font-black">
                                PRO
                            </Badge>
                        </div>

                        <div className="flex flex-col items-start gap-1 mt-2">
                            <Group gap={6}>
                                <IconBriefcase size={18} className="text-bright-sun-400" />
                                <Text size="lg" fw={700} className="text-mine-shaft-200">{talent.role} • <span className="text-bright-sun-300">{talent.company}</span></Text>
                            </Group>
                            <Group gap={6}>
                                <IconMapPin size={18} className="text-bright-sun-400" />
                                <Text size="md" fw={600} className="text-mine-shaft-300">{talent.location}</Text>
                            </Group>
                        </div>
                    </div>
                </div>

                <div className="flex gap-4 pb-12">
                    <Button
                        variant="filled"
                        size="md"
                        radius="md"
                        className="bg-bright-sun-400 text-mine-shaft-950 hover:bg-bright-sun-500 font-extrabold px-8 shadow-lg transition-all"
                    >
                        Message
                    </Button>
                    <Button
                        variant="outline"
                        size="md"
                        radius="md"
                        className="border-mine-shaft-700 text-mine-shaft-100 hover:bg-mine-shaft-800 transition-all font-bold px-6 border-2"
                    >
                        Hire Me
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default TalentHeader;
