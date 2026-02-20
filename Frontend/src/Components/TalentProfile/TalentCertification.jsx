import React from 'react';
import { Text, Image } from '@mantine/core';

const TalentCertification = ({ certifications }) => {
    return (
        <div className="mb-12">
            <div className="flex items-center gap-3 mb-8">
                <div className="h-1 w-12 bg-bright-sun-400 rounded-full"></div>
                <Text size="2xl" fw={900} className="text-mine-shaft-50 tracking-tight uppercase">Certifications</Text>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {certifications?.map((cert, index) => (
                    <div key={index} className="flex gap-5 bg-mine-shaft-900/30 p-6 rounded-2xl border border-mine-shaft-800/50 hover:bg-mine-shaft-800/40 transition-all group">
                        <div className="w-14 h-14 rounded-xl bg-mine-shaft-950 border border-mine-shaft-800 p-3 shrink-0 flex items-center justify-center shadow-md">
                            <Image
                                src={cert.issuer === "Google" ? "https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png" : "https://cdn-icons-png.flaticon.com/512/732/732221.png"}
                                className="w-full h-full object-contain"
                            />
                        </div>
                        <div className="flex-1">
                            <Text size="md" fw={800} className="text-mine-shaft-100 group-hover:text-bright-sun-400 transition-colors leading-tight">{cert.name}</Text>
                            <Text size="xs" fw={700} className="text-mine-shaft-400 mt-1 uppercase tracking-wider">{cert.issuer}</Text>
                            <div className="mt-4 pt-3 border-top border-mine-shaft-800/30 flex justify-between items-center border-t">
                                <Text size="10px" fw={800} className="text-mine-shaft-500">ID: {cert.id}</Text>
                                <Text size="10px" fw={800} className="text-bright-sun-400/80">{cert.issueDate}</Text>
                            </div>
                        </div>
                    </div>
                ))}
                {(!certifications || certifications.length === 0) && (
                    <Text size="sm" italic className="text-mine-shaft-400">No certifications listed.</Text>
                )}
            </div>
        </div>
    );
};

export default TalentCertification;
