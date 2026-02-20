import React, { useState, useEffect, useRef } from 'react';
import { Text, TextInput, Loader, RangeSlider, Group } from '@mantine/core';
import {
    IconSearch, IconMapPin, IconBriefcase, IconMoneybag, IconChevronDown,
    IconSquare, IconSquareCheckFilled, IconCircle, IconCircleDot, IconBolt
} from '@tabler/icons-react';

const LOCAL_DATA = {
    "Job Title": [
        "Software Engineer", "Frontend Developer", "Backend Developer", "Full Stack Developer",
        "UI/UX Designer", "Data Scientist", "DevOps Engineer", "Mobile App Developer",
        "Cloud Engineer", "Machine Learning Engineer", "Security Analyst", "Product Manager",
        "QA Engineer", "Data Engineer", "Systems Architect", "Technical Lead"
    ],
    "Location": [
        "Bangalore", "Mumbai", "Delhi", "Hyderabad", "Pune", "Chennai", "Remote",
        "New York", "San Francisco", "London", "Berlin", "Tokyo", "Singapore"
    ],
    "Skills": [
        "React", "Angular", "Vue", "Node.js", "Express", "Python", "Django", "Java",
        "Spring Boot", "AWS", "Azure", "Docker", "Kubernetes", "MongoDB", "PostgreSQL",
        "MySQL", "TypeScript", "JavaScript", "HTML", "CSS", "Tailwind CSS", "Figma"
    ]
};

const optionsData = [
    { title: "Talent Name", icon: IconSearch, searchable: true, multiple: false },
    { title: "Job Title", icon: IconBriefcase, searchable: true, multiple: true },
    { title: "Location", icon: IconMapPin, searchable: true, multiple: true },
    { title: "Skills", icon: IconBolt, searchable: true, multiple: true }
];

const FilterDropdown = ({ option, selected, onSelect }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [search, setSearch] = useState('');
    const [options, setOptions] = useState(LOCAL_DATA[option.title] || []);
    const [isLoading, setIsLoading] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    useEffect(() => {
        if (!option.searchable || !isOpen || option.title === "Talent Name") return;

        const delayDebounce = setTimeout(async () => {
            setIsLoading(true);
            const query = search.trim();
            const localData = LOCAL_DATA[option.title] || [];
            const localFiltered = localData.filter(item =>
                item.toLowerCase().includes(query.toLowerCase())
            );

            if (query.length === 0) {
                setOptions(localData);
                setIsLoading(false);
                return;
            }

            try {
                let apiResults = [];
                if (option.title === "Location") {
                    const res = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&addressdetails=1&limit=8`);
                    const data = await res.json();
                    apiResults = data.map(item => item.display_name);
                } else if (option.title === "Job Title" || option.title === "Skills") {
                    const res = await fetch(`https://api.datamuse.com/words?ml=${encodeURIComponent(query)}&max=12`);
                    const data = await res.json();
                    apiResults = data.map(item => item.word);
                }

                setOptions(Array.from(new Set([...localFiltered, ...apiResults])));
            } catch (error) {
                console.error(`API Error for ${option.title}:`, error);
                setOptions(localFiltered);
            } finally {
                setIsLoading(false);
            }
        }, 400);

        return () => clearTimeout(delayDebounce);
    }, [search, isOpen, option.searchable, option.title]);

    const handleSelect = (val) => {
        if (option.multiple) {
            const isSelected = selected.includes(val);
            onSelect(isSelected ? selected.filter(v => v !== val) : [...selected, val]);
        } else {
            onSelect(val);
            setIsOpen(false);
        }
    };

    if (option.title === "Talent Name") {
        return (
            <div className="flex flex-col gap-1 w-full lg:flex-1 min-w-[140px] relative">
                <div className="flex items-center gap-1.5 px-0.5 mb-0.5">
                    <option.icon size={16} className="text-bright-sun-400!" />
                    <span className="text-mine-shaft-200! text-[12px] font-bold uppercase tracking-widest">{option.title}</span>
                </div>
                <TextInput
                    value={selected || ''}
                    onChange={(e) => onSelect(e.currentTarget.value)}
                    placeholder="Search Name..."
                    variant="unstyled"
                    size="xs"
                    className="bg-mine-shaft-950/40! border border-mine-shaft-800! rounded-lg px-2 py-1! hover:border-mine-shaft-600! transition-all min-h-[38px]"
                    styles={{
                        input: { color: '#ffffff', fontWeight: 700, fontSize: '12px' },
                        wrapper: { height: '100%' }
                    }}
                />
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-1 w-full lg:flex-1 min-w-[140px] relative" ref={dropdownRef}>
            <div className="flex items-center gap-1.5 px-0.5 mb-0.5">
                <option.icon size={16} className="text-bright-sun-400!" />
                <span className="text-mine-shaft-200! text-[12px] font-bold uppercase tracking-widest">{option.title}</span>
            </div>

            <div
                onClick={() => setIsOpen(!isOpen)}
                className={`flex items-center justify-between border ${isOpen ? 'border-bright-sun-400/70! shadow-[0_0_10px_rgba(250,230,45,0.1)]' : 'border-mine-shaft-800!'} rounded-lg px-2.5 py-1.5 cursor-pointer bg-mine-shaft-950/40! hover:border-mine-shaft-600! transition-all min-h-[38px] group`}
            >
                <Text size="xs" fw={800} className="truncate text-mine-shaft-300! group-hover:text-bright-sun-400! transition-colors">
                    {option.multiple
                        ? (selected.length > 0 ? selected[selected.length - 1] : option.title)
                        : (selected || option.title)}
                </Text>
                <div className="flex items-center gap-1.5 ml-1">
                    {option.multiple && selected.length > 1 && (
                        <div className="bg-bright-sun-400! text-mine-shaft-950! text-[9px] font-black px-1.5 py-0.5 rounded-md">
                            +{selected.length - 1}
                        </div>
                    )}
                    <IconChevronDown size={14} className={`transition-transform duration-200 ${isOpen ? 'rotate-180 text-bright-sun-400!' : 'text-mine-shaft-400! group-hover:text-bright-sun-400!'}`} />
                </div>
            </div>

            {isOpen && (
                <div className="absolute top-[110%] left-0 w-full z-100 bg-mine-shaft-950 border border-mine-shaft-800 rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] overflow-hidden">
                    <div className="p-2 border-b border-mine-shaft-800 bg-mine-shaft-950 flex items-center gap-2">
                        <TextInput
                            value={search}
                            onChange={(e) => setSearch(e.currentTarget.value)}
                            placeholder={`Search ${option.title}...`}
                            variant="unstyled"
                            size="xs"
                            className="flex-1"
                            autoComplete="off"
                            autoFocus
                            leftSection={isLoading ? <Loader size={14} color="yellow" /> : <IconSearch size={14} className="text-mine-shaft-500!" />}
                            styles={{ input: { color: '#ffffff', paddingLeft: '32px', fontWeight: 700 } }}
                        />
                    </div>

                    <div className="max-h-[250px] overflow-y-auto custom-scrollbar flex flex-col pt-1 bg-mine-shaft-950">
                        {options.length > 0 ? (
                            options.map((item, index) => {
                                const isActive = option.multiple
                                    ? selected.includes(item)
                                    : selected === item;
                                return (
                                    <div
                                        key={index}
                                        onClick={() => handleSelect(item)}
                                        className={`flex items-center gap-3 px-3 py-2.5 cursor-pointer transition-all duration-150 group/item ${isActive ? 'bg-bright-sun-400/5' : 'hover:bg-mine-shaft-900/80'}`}
                                    >
                                        <div className="flex items-center justify-center transition-all">
                                            {option.multiple ? (
                                                isActive ? (
                                                    <IconSquareCheckFilled size={18} className="text-bright-sun-400!" />
                                                ) : (
                                                    <IconSquare size={18} className="text-mine-shaft-700!" />
                                                )
                                            ) : (
                                                isActive ? (
                                                    <IconCircleDot size={18} className="text-bright-sun-400!" />
                                                ) : (
                                                    <IconCircle size={18} className="text-mine-shaft-700!" />
                                                )
                                            )}
                                        </div>
                                        <Text size="sm" fw={700} className={`capitalize truncate transition-colors ${isActive ? "text-bright-sun-400!" : "text-mine-shaft-300!"} group-hover/item:text-bright-sun-400! group-hover/item:drop-shadow-[0_0_8px_rgba(250,230,45,0.4)]`}>
                                            {item}
                                        </Text>
                                    </div>
                                );
                            })
                        ) : (
                            !isLoading && (
                                <div className="px-4 py-8 text-center text-mine-shaft-500 font-bold text-[10px] uppercase tracking-widest">
                                    No Results Found
                                </div>
                            )
                        )}
                        {isLoading && (
                            <div className="flex items-center justify-center py-6">
                                <Loader size="xs" color="yellow" />
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

const TalentFilters = ({ filters, onFilterChange }) => {
    return (
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4 py-4 px-5 md:px-8 bg-mine-shaft-950 rounded-2xl border border-mine-shaft-900 shadow-2xl relative z-50">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:flex lg:flex-row items-center gap-4 flex-1 w-full">
                {optionsData.map((opt, i) => (
                    <FilterDropdown
                        key={i}
                        option={opt}
                        selected={filters[opt.title]}
                        onSelect={(val) => onFilterChange(opt.title, val)}
                    />
                ))}
            </div>

            <div className="w-full lg:w-64 p-3 bg-mine-shaft-900/30 rounded-xl border border-mine-shaft-800 flex flex-col gap-2">
                <div className="flex justify-between items-center px-0.5">
                    <Group gap={6}>
                        <IconMoneybag size={15} className="text-bright-sun-400!" />
                        <span className="text-mine-shaft-200! text-[12px] font-bold uppercase">Salary</span>
                    </Group>
                    <Text size="12px" fw={800} className="text-bright-sun-300!">{filters.Salary[0]} LPA - {filters.Salary[1]} LPA</Text>
                </div>
                <div className="px-1">
                    <RangeSlider
                        value={filters.Salary}
                        onChange={(val) => onFilterChange("Salary", val)}
                        min={0}
                        max={100}
                        step={1}
                        label={null}
                        styles={{
                            track: { backgroundColor: '#1c1c1c' },
                            bar: { backgroundColor: '#fae62d' },
                            thumb: { border: '3px solid #fae62d', backgroundColor: '#0a0a0a' }
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

export default TalentFilters;
