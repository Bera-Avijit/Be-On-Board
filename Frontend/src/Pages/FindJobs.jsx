import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import SearchFilter from '../Components/FindJobs/SearchFilter';
import SortJobs from '../Components/FindJobs/SortJobs';
import Jobs from '../Components/FindJobs/Jobs';

const FindJobs = () => {
    const location = useLocation();
    const [sortOption, setSortOption] = useState('Relevance');
    const [filters, setFilters] = useState({
        "Job Role": [],
        "Location": [],
        "Experience": null,
        "Job Type": null,
        "Salary": [0, 200]
    });

    // Handle incoming search criteria from Hero section
    useEffect(() => {
        if (location.state?.searchCriteria) {
            const { jobTitle, jobType } = location.state.searchCriteria;
            setFilters(prev => ({
                ...prev,
                "Job Role": jobTitle ? [jobTitle] : [],
                "Job Type": jobType || null
            }));

            // Clear state after applying to avoid re-applying on refresh
            window.history.replaceState({}, document.title);
        }
    }, [location.state]);

    const handleFilterChange = (title, value) => {
        setFilters(prev => ({ ...prev, [title]: value }));
    };

    const resetFilters = () => {
        setFilters({
            "Job Role": [],
            "Location": [],
            "Experience": null,
            "Job Type": null,
            "Salary": [0, 200]
        });
        setSortOption('Relevance');
    };

    return (
        <div className="min-h-screen bg-mine-shaft-950 font-['Poppins']">
            <div className="max-w-7xl mx-auto px-4 py-8">
                <SearchFilter filters={filters} onFilterChange={handleFilterChange} />
                <SortJobs onSortChange={setSortOption} filters={filters} resetFilters={resetFilters} />
                <Jobs filters={filters} sortOption={sortOption} resetFilters={resetFilters} />
            </div>
        </div>
    );
};

export default FindJobs;
