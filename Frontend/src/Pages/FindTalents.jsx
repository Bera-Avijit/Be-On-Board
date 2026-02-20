import React, { useState, useMemo } from 'react';
import TalentFilters from '../Components/FindTalents/TalentFilters';
import SortTalent from '../Components/FindTalents/SortTalent';
import { talents as allTalents } from '../Data/TalentData';

const DEFAULT_FILTERS = {
    "Talent Name": "",
    "Job Title": [],
    "Location": [],
    "Skills": [],
    "Salary": [0, 80]
};

const FindTalents = () => {
    const [filters, setFilters] = useState(DEFAULT_FILTERS);
    const [sortValue, setSortValue] = useState('relevance');

    const handleFilterChange = (title, value) => {
        setFilters(prev => ({ ...prev, [title]: value }));
    };

    const handleClearFilters = () => {
        setFilters(DEFAULT_FILTERS);
        setSortValue('relevance');
    };

    const hasFilters = useMemo(() => {
        return (
            filters["Talent Name"] !== "" ||
            filters["Job Title"].length > 0 ||
            filters["Location"].length > 0 ||
            filters["Skills"].length > 0 ||
            filters["Salary"][0] !== 0 ||
            filters["Salary"][1] !== 80
        );
    }, [filters]);

    // Helper to extract years of experience
    const getExperienceYears = (experienceArr) => {
        return experienceArr.reduce((total, exp) => {
            const start = new Date(exp.startDate);
            const end = exp.endDate === "Present" ? new Date() : new Date(exp.endDate);
            const diff = (end - start) / (1000 * 60 * 60 * 24 * 365.25);
            return total + diff;
        }, 0);
    };

    // Helper to get average salary from string like "40 - 60LPA"
    const getMinSalary = (salaryStr) => {
        return parseInt(salaryStr.split(' - ')[0]) || 0;
    };

    const filteredAndSortedTalents = useMemo(() => {
        let result = allTalents.filter(talent => {
            // Filter by Name (Starts With)
            if (filters["Talent Name"] && !talent.name.toLowerCase().startsWith(filters["Talent Name"].toLowerCase())) {
                return false;
            }

            // Filter by Job Title
            if (filters["Job Title"].length > 0) {
                const matchesTitle = filters["Job Title"].some(title =>
                    talent.role.toLowerCase().includes(title.toLowerCase())
                );
                if (!matchesTitle) return false;
            }

            // Filter by Location
            if (filters["Location"].length > 0) {
                const matchesLocation = filters["Location"].some(loc =>
                    talent.location.toLowerCase().includes(loc.toLowerCase())
                );
                if (!matchesLocation) return false;
            }

            // Filter by Skills
            if (filters["Skills"].length > 0) {
                const matchesSkills = filters["Skills"].some(skill =>
                    talent.skills.some(s => s.toLowerCase().includes(skill.toLowerCase()))
                );
                if (!matchesSkills) return false;
            }

            // Filter by Salary
            const talentMinSalary = getMinSalary(talent.salary);
            const talentMaxSalary = parseInt(talent.salary.split(' - ')[1]) || 100;

            if (talentMinSalary < filters["Salary"][0] || talentMaxSalary > filters["Salary"][1]) {
                return false;
            }

            return true;
        });

        // Apply Sorting
        const sorted = [...result];
        if (sortValue === 'salary_low') {
            sorted.sort((a, b) => getMinSalary(a.salary) - getMinSalary(b.salary));
        } else if (sortValue === 'salary_high') {
            sorted.sort((a, b) => getMinSalary(b.salary) - getMinSalary(a.salary));
        } else if (sortValue === 'experience_high') {
            sorted.sort((a, b) => getExperienceYears(b.experience) - getExperienceYears(a.experience));
        }
        // 'relevance' keeps the original array order

        return sorted;
    }, [filters, sortValue]);

    return (
        <div className="max-w-[1400px] mx-auto px-6 py-8">
            <TalentFilters filters={filters} onFilterChange={handleFilterChange} />
            <SortTalent
                talents={filteredAndSortedTalents}
                hasFilters={hasFilters}
                onClearFilters={handleClearFilters}
                sortValue={sortValue}
                onSortChange={setSortValue}
            />
        </div>
    );
};

export default FindTalents;