import React from 'react';
import { Text, Badge, Group } from '@mantine/core';

export const TalentAbout = ({ about }) => (
    <div className="mb-12">
        <div className="flex items-center gap-3 mb-6">
            <div className="h-1 w-12 bg-bright-sun-400 rounded-full"></div>
            <Text size="2xl" fw={900} className="text-mine-shaft-50 tracking-tight uppercase">About Candidate</Text>
        </div>
        <Text size="md" className="text-mine-shaft-200 leading-relaxed text-justify bg-mine-shaft-900/10 px-6! py-4! rounded-2xl border border-mine-shaft-800/50 backdrop-blur-sm">
            {about}
        </Text>
    </div>
);

export const TalentSkills = ({ skills }) => (
    <div className="mb-12">
        <div className="flex items-center gap-3 mb-6">
            <div className="h-1 w-12 bg-bright-sun-400 rounded-full"></div>
            <Text size="2xl" fw={900} className="text-mine-shaft-50 tracking-tight uppercase">Technical Skills</Text>
        </div>
        <Group gap="sm" className="bg-mine-shaft-900/10 px-6! py-4! rounded-2xl border border-mine-shaft-800/50">
            {skills?.map((skill, index) => (
                <Badge
                    key={index}
                    variant="filled"
                    className="bg-mine-shaft-800 text-mine-shaft-100 hover:text-bright-sun-400 border border-mine-shaft-700 px-5 py-4 h-auto capitalize font-bold text-sm hover:border-bright-sun-400 transition-all cursor-default"
                    radius="lg"
                >
                    {skill}
                </Badge>
            ))}
        </Group>
    </div>
);
