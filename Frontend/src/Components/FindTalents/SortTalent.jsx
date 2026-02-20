import React from 'react';
import TalentCard from './TalentCard';
import { Group, Text, Menu, Button } from '@mantine/core';
import { IconAdjustmentsHorizontal, IconX, IconChevronDown } from '@tabler/icons-react';

const SortTalent = ({ talents, hasFilters, onClearFilters, sortValue, onSortChange }) => {
    const sortOptions = [
        { value: 'relevance', label: 'Relevance' },
        { value: 'salary_low', label: 'Salary: Low to High' },
        { value: 'salary_high', label: 'Salary: High to Low' },
        { value: 'experience_high', label: 'Experience: High to Low' }
    ];

    const currentSortLabel = sortOptions.find(opt => opt.value === sortValue)?.label || 'Relevance';

    return (
        <div className="mt-8">
            <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-4">
                    <Text size="xl" fw={800} className="text-mine-shaft-100">Talents</Text>
                    {hasFilters && (
                        <Button
                            variant="subtle"
                            color="red"
                            size="compact-xs"
                            radius="xl"
                            leftSection={<IconX size={14} />}
                            onClick={onClearFilters}
                            className="hover:bg-red-500/10 hover:text-red-400 transition-all font-bold tracking-tight"
                        >
                            Clear All Filters
                        </Button>
                    )}
                </div>

                <Menu shadow="xl" width={220} position="bottom-end" transitionProps={{ transition: 'pop-top-right' }}>
                    <Menu.Target>
                        <div className="flex items-center gap-2.5 px-4 py-2 bg-mine-shaft-900/40 border border-mine-shaft-800 rounded-xl cursor-pointer hover:border-bright-sun-400/50 transition-all group">
                            <IconAdjustmentsHorizontal size={18} className="text-bright-sun-400 group-hover:drop-shadow-[0_0_5px_rgba(250,230,45,0.4)]" />
                            <Text size="sm" fw={700} className="text-white group-hover:text-bright-sun-400 transition-colors">
                                {currentSortLabel}
                            </Text>
                            <IconChevronDown size={14} className="text-mine-shaft-400 group-hover:text-bright-sun-400 transition-colors" />
                        </div>
                    </Menu.Target>

                    <Menu.Dropdown bg="#0f0f0f" className="border-mine-shaft-800! rounded-xl! p-1.5! shadow-2xl!">
                        <Menu.Label className="text-[10px]! font-black! uppercase! tracking-widest! text-mine-shaft-500! mb-1! px-2.5!">Sort by</Menu.Label>
                        {sortOptions.map((option) => (
                            <Menu.Item
                                key={option.value}
                                onClick={() => onSortChange(option.value)}
                                className={`rounded-lg! px-2.5! py-2! hover:bg-mine-shaft-900/80! transition-colors! ${sortValue === option.value ? 'bg-mine-shaft-900!' : ''}`}
                            >
                                <Text size="sm" fw={700} className={sortValue === option.value ? 'text-bright-sun-400!' : 'text-mine-shaft-300!'}>
                                    {option.label}
                                </Text>
                            </Menu.Item>
                        ))}
                    </Menu.Dropdown>
                </Menu>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {talents.length > 0 ? (
                    talents.map((talent, index) => (
                        <TalentCard key={index} talent={talent} />
                    ))
                ) : (
                    <div className="col-span-full py-20 text-center bg-mine-shaft-900/10 rounded-3xl border border-dashed border-mine-shaft-800">
                        <Text size="lg" fw={700} className="text-mine-shaft-400">No talents found matching your search</Text>
                        <Text size="sm" className="text-mine-shaft-500 mt-2 cursor-pointer hover:text-bright-sun-400 hover:underline" onClick={onClearFilters}>
                            Try clearing your filters to see more profiles
                        </Text>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SortTalent;
