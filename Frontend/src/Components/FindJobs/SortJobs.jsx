import React, { useState } from 'react';
import { Group, Text, Menu, UnstyledButton, Button } from '@mantine/core';
import { IconAdjustments, IconChevronDown, IconX } from '@tabler/icons-react';

const SortJobs = ({ onSortChange, filters, resetFilters }) => {
    const [selectedSort, setSelectedSort] = useState('Relevance');
    const sortOptions = ['Relevance', 'Most Recent', 'Salary (Low to High)', 'Salary (High to Low)'];

    const handleSort = (option) => {
        setSelectedSort(option);
        if (onSortChange) onSortChange(option);
    };

    const isFilterApplied = filters["Job Role"].length > 0 ||
        filters["Location"].length > 0 ||
        filters["Experience"] !== null ||
        filters["Job Type"] !== null ||
        filters.Salary[0] !== 0 ||
        filters.Salary[1] !== 200;

    return (
        <div className="flex items-center justify-between mt-5 py-5">
            <div className="flex flex-col gap-1">
                <div className="flex items-center gap-3">
                    <Text size="xl" fw={800} className="text-mine-shaft-100! font-['Poppins']! tracking-tight!">
                        Recommended Jobs
                    </Text>
                    {isFilterApplied && (
                        <Button
                            variant="subtle"
                            color="red"
                            leftSection={<IconX size={14} stroke={3} />}
                            onClick={resetFilters}
                            size="xs"
                            className="hover:bg-red-500/10! text-red-500! font-black! uppercase! tracking-widest! transition-all! h-7! px-2!"
                        >
                            Clear All
                        </Button>
                    )}
                </div>
                <Text size="xs" className="text-mine-shaft-400! font-medium!">
                    Showing latest opportunities matched to your profile
                </Text>
            </div>

            <Menu shadow="xl" width={200} position="bottom-end" transitionProps={{ transition: 'pop-top-right' }}>
                <Menu.Target>
                    <UnstyledButton className="flex! items-center! gap-2.5! px-4! py-2! bg-mine-shaft-900/40! border! border-mine-shaft-800! rounded-xl! hover:border-bright-sun-400/50! transition-all! group">
                        <Group gap="xs">
                            <IconAdjustments size={18} className="text-bright-sun-400! group-hover:drop-shadow-[0_0_5px_rgba(250,230,45,0.4)]!" />
                            <Text size="sm" fw={700} className="text-white! group-hover:text-bright-sun-400! transition-colors!">
                                {selectedSort}
                            </Text>
                        </Group>
                        <IconChevronDown size={14} className="text-mine-shaft-400! group-hover:text-bright-sun-400! transition-colors!" />
                    </UnstyledButton>
                </Menu.Target>

                <Menu.Dropdown bg="#0f0f0f" className="border-mine-shaft-800! rounded-xl! p-1.5! shadow-2xl!">
                    <Menu.Label className="text-[10px]! font-black! uppercase! tracking-widest! text-mine-shaft-500! mb-1! px-2.5!">Sort by</Menu.Label>
                    {sortOptions.map((option) => (
                        <Menu.Item
                            key={option}
                            onClick={() => handleSort(option)}
                            className={`rounded-lg! px-2.5! py-2! hover:bg-mine-shaft-900/80! transition-colors! ${selectedSort === option ? 'bg-mine-shaft-900!' : ''}`}
                        >
                            <Text size="sm" fw={700} className={selectedSort === option ? 'text-bright-sun-400!' : 'text-mine-shaft-300!'}>
                                {option}
                            </Text>
                        </Menu.Item>
                    ))}
                </Menu.Dropdown>
            </Menu>
        </div>
    );
};

export default SortJobs;