import React, { useState } from 'react';
import SearchFilter from '../Components/FindJobs/SearchFilter';
import SortJobs from '../Components/FindJobs/SortJobs';
import Jobs from '../Components/FindJobs/Jobs';

const FindJobs = () => {
    const [sortOption, setSortOption] = useState('Relevance');
    const [filters, setFilters] = useState({
        "Job Role": [],
        "Location": [],
        "Experience": null,
        "Job Type": null,
        "Salary": [15000, 350000]
    });

    const handleFilterChange = (title, value) => {
        setFilters(prev => ({ ...prev, [title]: value }));
    };

    const resetFilters = () => {
        setFilters({
            "Job Role": [],
            "Location": [],
            "Experience": null,
            "Job Type": null,
            "Salary": [15000, 350000]
        });
        setSortOption('Relevance');
    };

    return (
        <div className="min-h-screen bg-mine-shaft-950 font-['Poppins']">
            <div className="max-w-7xl mx-auto px-4 py-8">
                <SearchFilter filters={filters} onFilterChange={handleFilterChange} />
                <SortJobs onSortChange={setSortOption} />
                <Jobs filters={filters} sortOption={sortOption} resetFilters={resetFilters} />
            </div>
        </div>
    );
};

export default FindJobs;