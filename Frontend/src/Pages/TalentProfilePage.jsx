import React, { useState } from 'react';
import { Text, Button } from '@mantine/core';
import { IconArrowLeft, IconAdjustmentsHorizontal, IconX } from '@tabler/icons-react';
import { Link, useParams } from 'react-router-dom';
import TalentHeader from '../Components/TalentProfile/TalentHeader';
import { TalentAbout, TalentSkills } from '../Components/TalentProfile/TalentSections';
import TalentExperience from '../Components/TalentProfile/TalentExperience';
import TalentCertification from '../Components/TalentProfile/TalentCertification';
import RecommendedTalents from '../Components/TalentProfile/RecommendedTalents';
import { talents } from '../Data/TalentData';

const TalentProfilePage = () => {
    const { id } = useParams();
    const [showRecommended, setShowRecommended] = useState(true);

    // Find the current talent based on the ID from URL
    const talent = talents.find(t => t.id === id) || talents[0];

    return (
        <div className="min-h-screen bg-mine-shaft-950 pb-20 overflow-x-hidden">
            <div className={`mx-auto transition-all duration-700 ease-in-out ${showRecommended ? 'max-w-[1400px] px-6 py-8' : 'max-w-7xl px-8 md:px-16 py-12'}`}>
                <div className={`grid grid-cols-1 ${showRecommended ? 'lg:grid-cols-[1fr_400px] gap-16' : 'lg:grid-cols-1 gap-0'} transition-all duration-700 ease-in-out relative`}>

                    {/* Left Column: Navigation and Main Profile */}
                    <div className="min-w-0 transition-all duration-700 ease-in-out">
                        <div className="flex justify-between items-center transition-all duration-700 mb-10 h-12">
                            <Link
                                to="/find-talents"
                                className="inline-flex items-center gap-2 text-mine-shaft-300 hover:text-bright-sun-400 transition-all group px-4 py-2 hover:bg-mine-shaft-900 rounded-xl"
                            >
                                <IconArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                                <Text fw={800} size="sm" className="tracking-tight">Back to Talent Feed</Text>
                            </Link>

                            {!showRecommended && (
                                <Button
                                    variant="subtle"
                                    color="yellow"
                                    leftSection={<IconAdjustmentsHorizontal size={18} />}
                                    onClick={() => setShowRecommended(true)}
                                    className="hover:bg-bright-sun-400/10 font-bold"
                                >
                                    Show Recommended
                                </Button>
                            )}
                        </div>

                        <div className={`transition-all duration-700 ${showRecommended ? 'mb-24' : 'mb-32'}`}>
                            <TalentHeader talent={talent} />
                        </div>

                        <div className={`transition-all duration-700 ease-in-out ${showRecommended ? 'px-2 md:px-12 mt-64' : 'mt-80'}`}>
                            <TalentAbout about={talent.about} />
                            <TalentSkills skills={talent.skills} />
                            <TalentExperience experience={talent.experience} />
                            <TalentCertification certifications={talent.certifications} />
                        </div>
                    </div>

                    {/* Right Column: Recommended Talents - Absolute positioned to avoid extending page height */}
                    {showRecommended && (
                        <div className="hidden lg:block relative min-h-full transition-all duration-500 animate-in fade-in slide-in-from-right-10 overflow-visible">
                            <div className="absolute right-0 top-1 z-20">
                                <Button
                                    variant="subtle"
                                    color="gray"
                                    size="xs"
                                    p={4}
                                    onClick={() => setShowRecommended(false)}
                                    className="hover:bg-red-500/10 hover:text-red-400 transition-all rounded-full"
                                >
                                    <IconX size={20} />
                                </Button>
                            </div>
                            <div className="absolute inset-0 pt-1">
                                <RecommendedTalents talents={talents} currentTalentId={talent.id} />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TalentProfilePage;
