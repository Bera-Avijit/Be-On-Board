import React from 'react';
import { Text, Button } from '@mantine/core';
import { IconSearchOff } from '@tabler/icons-react';
import JobCard from './JobCard';
import { JOBS_DATA } from '../../Data/JobsData';

const Jobs = ({ filters, sortOption, resetFilters }) => {
    // Filter and Sort logic
    const getProcessedJobs = () => {
        let jobs = [...JOBS_DATA];

        // 1. Filtering Logic
        if (filters["Job Role"] && filters["Job Role"].length > 0) {
            jobs = jobs.filter(job =>
                filters["Job Role"].some(role =>
                    job.jobTitle.toLowerCase().includes(role.toLowerCase()) ||
                    job.description.toLowerCase().includes(role.toLowerCase())
                )
            );
        }

        if (filters["Location"] && filters["Location"].length > 0) {
            jobs = jobs.filter(job =>
                filters["Location"].some(loc =>
                    job.location.toLowerCase().includes(loc.toLowerCase())
                )
            );
        }

        if (filters["Experience"]) {
            jobs = jobs.filter(job => job.experience === filters["Experience"]);
        }

        if (filters["Job Type"]) {
            jobs = jobs.filter(job => job.jobType === filters["Job Type"]);
        }

        if (filters["Salary"]) {
            const [min, max] = filters["Salary"];
            jobs = jobs.filter(job => job.minSalary >= min && job.maxSalary <= max);
        }

        // 2. Sorting Logic
        switch (sortOption) {
            case 'Most Recent':
                return jobs.sort((a, b) => a.postedDaysAgo - b.postedDaysAgo);
            case 'Salary (Low to High)':
                return jobs.sort((a, b) => a.minSalary - b.minSalary);
            case 'Salary (High to Low)':
                return jobs.sort((a, b) => b.maxSalary - a.maxSalary);
            case 'Relevance':
            default:
                return jobs; // Ideally, relevance would involve a scoring system
        }
    };

    const processedJobs = getProcessedJobs();

    return (
        <div className="py-6 min-h-[500px]">
            {processedJobs.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 transition-all duration-300">
                    {processedJobs.map((job) => (
                        <JobCard key={job.id} job={job} />
                    ))}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center py-20 bg-mine-shaft-900/10 rounded-3xl border border-dashed border-mine-shaft-800">
                    <div className="p-5! bg-mine-shaft-900/50! rounded-full! mb-6!">
                        <IconSearchOff size={48} className="text-bright-sun-400!" />
                    </div>
                    <Text size="xl" fw={900} className="text-mine-shaft-100! uppercase tracking-tight mb-2!">
                        No Professional Roles Found
                    </Text>
                    <Text size="sm" className="text-mine-shaft-400! px-4! text-center! max-w-sm! mb-8!">
                        We couldn't find any jobs matching your current filters. Try broadening your criteria or reset to see all opportunities.
                    </Text>
                    <Button
                        variant="light"
                        color="yellow"
                        radius="lg"
                        size="md"
                        className="bg-bright-sun-400/10! text-bright-sun-400! hover:bg-bright-sun-400! hover:text-mine-shaft-950! transition-all!"
                        onClick={resetFilters}
                    >
                        Clear All Filters
                    </Button>
                </div>
            )}
        </div>
    );
};

export default Jobs;
