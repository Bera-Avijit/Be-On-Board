import React, { useState, useEffect, useRef } from 'react';
import { Text } from '@mantine/core';
import RecommendedTalentCard from './RecommendedTalentCard';

const RecommendedTalents = ({ talents, currentTalentId }) => {
    const containerRef = useRef(null);
    const [cardCount, setCardCount] = useState(0);

    // Exclude the current talent
    const filteredList = talents?.filter(t => t.id !== currentTalentId) || [];

    useEffect(() => {
        const updateCount = () => {
            if (containerRef.current && containerRef.current.parentElement) {
                // Measure parent height which is now stable (driven by Left Column height)
                const parentHeight = containerRef.current.parentElement.offsetHeight;
                const estimatedCardHeight = 76; // Card height (60px) + gap (16px)
                const headerHeight = 60; // Approx height of header + margin

                const availableHeight = parentHeight - headerHeight;
                const newCount = Math.max(0, Math.floor(availableHeight / estimatedCardHeight));

                setCardCount(newCount);
            }
        };

        // Small delay to ensure layout has settled
        const timer = setTimeout(updateCount, 150);

        const observer = new ResizeObserver(updateCount);
        if (containerRef.current && containerRef.current.parentElement) {
            observer.observe(containerRef.current.parentElement);
        }

        return () => {
            clearTimeout(timer);
            observer.disconnect();
        };
    }, []);

    // Create a list of exact length by looping the filtered talents
    const displayList = [];
    if (filteredList.length > 0 && cardCount > 0) {
        for (let i = 0; i < cardCount; i++) {
            displayList.push(filteredList[i % filteredList.length]);
        }
    }

    return (
        <div ref={containerRef} className="w-full h-full overflow-hidden">
            <div className="flex items-center gap-3 mb-12">
                <div className="h-1 w-6 bg-bright-sun-400 rounded-full"></div>
                <Text size="lg" fw={900} className="text-mine-shaft-100 tracking-tight uppercase">Recommended Talent</Text>
            </div>

            <div className="flex flex-col gap-4">
                {displayList.map((talent, index) => (
                    <RecommendedTalentCard key={`${talent.id}-${index}`} talent={talent} />
                ))}
            </div>
        </div>
    );
};

export default RecommendedTalents;
