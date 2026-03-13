import React, { useState, useEffect, useRef } from 'react';
import { IconSearch, IconBuilding, IconMapPin, IconBriefcase, IconClock, IconCurrencyDollar, IconChevronLeft, IconDeviceFloppy, IconRocket, IconX, IconChevronDown } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import { RichTextEditor } from '@mantine/tiptap';
import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import LinkExtension from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';
import TextAlign from '@tiptap/extension-text-align';
import Highlight from '@tiptap/extension-highlight';
import "@mantine/tiptap/styles.css";

const LOGODEV_PK = import.meta.env.VITE_LOGODEV_PUBLISHABLE_KEY;
const LOGODEV_SK = import.meta.env.VITE_LOGODEV_SECRET_KEY;

const TOP_COMPANIES = [
    { name: "Google", logo: `https://img.logo.dev/google.com?token=${LOGODEV_PK}` },
    { name: "Microsoft", logo: `https://img.logo.dev/microsoft.com?token=${LOGODEV_PK}` },
    { name: "Amazon", logo: `https://img.logo.dev/amazon.com?token=${LOGODEV_PK}` },
    { name: "Apple", logo: `https://img.logo.dev/apple.com?token=${LOGODEV_PK}` },
    { name: "Meta", logo: `https://img.logo.dev/meta.com?token=${LOGODEV_PK}` },
    { name: "Netflix", logo: `https://img.logo.dev/netflix.com?token=${LOGODEV_PK}` },
    { name: "Adobe", logo: `https://img.logo.dev/adobe.com?token=${LOGODEV_PK}` }
];

const PostJob = () => {
    const navigate = useNavigate();
    const dropdownRef = useRef(null);

    const [formData, setFormData] = useState({
        jobTitle: '',
        company: '',
        experience: 'Intermediate',
        jobType: 'Full Time',
        location: '',
        salary: '',
        skills: [],
        description: '',
        companyLogo: '' // New field for the fetched logo
    });

    const [autocomplete, setAutocomplete] = useState({
        jobTitles: ["Software Engineer", "Frontend Developer", "Backend Engineer", "UX Designer", "Data Scientist", "Full Stack Engineer", "DevOps Engineer"],
        locations: ["Bangalore, India", "San Francisco, CA", "New York, NY", "London, UK", "Remote", "Berlin, Germany", "Hyderabad, India"],
        companies: [], // Will store objects: { name, logo }
        isLoading: {
            jobTitle: false,
            location: false,
            company: false
        }
    });

    const [activeDropdown, setActiveDropdown] = useState(null); // 'jobTitle', 'company', 'experience', 'jobType', 'location'
    const [skillInput, setSkillInput] = useState('');

    // Editor setup
    const editor = useEditor({
        extensions: [
            StarterKit,
            Underline,
            LinkExtension,
            Placeholder.configure({
                placeholder: 'About the job, Responsibilities, Skill set, etc...',
            }),
            TextAlign.configure({ types: ['heading', 'paragraph'] }),
            Highlight,
        ],
        content: '',
        onUpdate: ({ editor }) => {
            setFormData(prev => ({ ...prev, description: editor.getHTML() }));
        }
    });

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setActiveDropdown(null);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Job Title Autocomplete (Datamuse API)
    useEffect(() => {
        if (formData.jobTitle.length < 2 || activeDropdown !== 'jobTitle') return;
        const timer = setTimeout(async () => {
            setAutocomplete(prev => ({ ...prev, isLoading: { ...prev.isLoading, jobTitle: true } }));
            try {
                const res = await fetch(`https://api.datamuse.com/words?ml=${encodeURIComponent(formData.jobTitle)}&max=8`);
                const data = await res.json();
                const apiTitles = data.map(item => item.word);
                setAutocomplete(prev => ({
                    ...prev,
                    jobTitles: Array.from(new Set([...autocomplete.jobTitles, ...apiTitles])),
                    isLoading: { ...prev.isLoading, jobTitle: false }
                }));
            } catch (err) {
                setAutocomplete(prev => ({ ...prev, isLoading: { ...prev.isLoading, jobTitle: false } }));
            }
        }, 500);
        return () => clearTimeout(timer);
    }, [formData.jobTitle, activeDropdown]);

    // Company Autocomplete (Logo.dev API)
    useEffect(() => {
        if (activeDropdown !== 'company') return;

        if (formData.company.length < 2) {
            setAutocomplete(prev => ({ ...prev, companies: [] }));
            return;
        }

        const timer = setTimeout(async () => {
            setAutocomplete(prev => ({ ...prev, isLoading: { ...prev.isLoading, company: true } }));
            try {
                const res = await fetch(`https://api.logo.dev/search?q=${encodeURIComponent(formData.company)}`, {
                    headers: {
                        'Authorization': `Bearer ${LOGODEV_SK}`
                    }
                });
                const data = await res.json();
                const apiCompanies = data.map(item => ({
                    name: item.name,
                    logo: `https://img.logo.dev/${item.domain}?token=${LOGODEV_PK}`
                }));
                setAutocomplete(prev => ({
                    ...prev,
                    companies: apiCompanies,
                    isLoading: { ...prev.isLoading, company: false }
                }));
            } catch (err) {
                setAutocomplete(prev => ({ ...prev, isLoading: { ...prev.isLoading, company: false } }));
            }
        }, 500);
        return () => clearTimeout(timer);
    }, [formData.company, activeDropdown]);

    // Location Autocomplete (Nominatim API)
    useEffect(() => {
        if (formData.location.length < 3 || activeDropdown !== 'location') return;
        const timer = setTimeout(async () => {
            setAutocomplete(prev => ({ ...prev, isLoading: { ...prev.isLoading, location: true } }));
            try {
                const res = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(formData.location)}&format=json&limit=5`);
                const data = await res.json();
                const apiLocations = data.map(item => item.display_name);
                setAutocomplete(prev => ({
                    ...prev,
                    locations: Array.from(new Set([...autocomplete.locations, ...apiLocations])),
                    isLoading: { ...prev.isLoading, location: false }
                }));
            } catch (err) {
                setAutocomplete(prev => ({ ...prev, isLoading: { ...prev.isLoading, location: false } }));
            }
        }, 600);
        return () => clearTimeout(timer);
    }, [formData.location, activeDropdown]);

    const handlePublish = async () => {
        const payload = {
            jobTitle: formData.jobTitle,
            company: formData.company,
            companyLogo: formData.companyLogo || `https://img.logo.dev/${formData.company.toLowerCase().replace(/\s/g, '')}.com?token=${LOGODEV_PK}`,
            experience: formData.experience,
            jobType: formData.jobType,
            location: formData.location,
            salary: Number(formData.salary),
            skills: formData.skills,
            description: formData.description
        };

        try {
            const token = localStorage.getItem('token');
            if (!token) {
                alert("Security error: No login session found. Please log in again.");
                return;
            }
            
            const res = await fetch('http://localhost:8080/api/jobs/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(payload)
            });

            if (res.ok) {
                const data = await res.json();
                console.log("Job posted successfully:", data);
                // Clear publishedJobs from localStorage if we are now using the database
                // localStorage.removeItem('publishedJobs'); 
                window.location.href = '/find-jobs';
            } else {
                // Server responded with an error (e.g., 401, 403, 400)
                let errorMessage = "Failed to post job";
                try {
                    const errorData = await res.json();
                    errorMessage = errorData.message || errorMessage;
                } catch (e) {
                    // If response is not JSON
                    if (res.status === 403) errorMessage = "Access Denied: Your session may have expired or you don't have recruiter permissions.";
                    else if (res.status === 401) errorMessage = "Unauthorized: Please log in again.";
                }
                console.error("Server Denial:", res.status, errorMessage);
                alert(`Server Error (${res.status}): ${errorMessage}`);
                // Don't redirect if it's a real server denial!
            }
        } catch (err) {
            // This only happens on actual network failures (server down, CORS block, etc.)
            console.error("Network Detail:", err);
            
            // Helpful message for the user
            const isCorsError = !err.response && err.message === "Failed to fetch";
            if (isCorsError) {
                alert("Connection Blocked: The browser blocked the request. Please ensure CORS is enabled in the Backend SecurityConfig and the backend is running.");
            } else {
                alert("Network error: Could not reach the server. Please make sure the backend is running at http://localhost:8080");
            }

            // FALLBACK for development purposes only
            const newJobForFallback = {
                ...formData,
                id: Date.now(),
                postedDaysAgo: 0,
                applicants: 0,
                logoUrl: payload.companyLogo,
                minSalary: payload.salary,
                maxSalary: payload.salary + 5
            };
            const existingJobs = JSON.parse(localStorage.getItem('publishedJobs') || '[]');
            localStorage.setItem('publishedJobs', JSON.stringify([newJobForFallback, ...existingJobs]));
            // Only redirect in fallback mode if the user specifically wants to test UI
            window.location.href = '/find-jobs';
        }
    };

    const addSkill = (skill) => {
        const s = skill.trim();
        if (s && !formData.skills.includes(s)) {
            setFormData(prev => ({ ...prev, skills: [...prev.skills, s] }));
        }
        setSkillInput('');
    };

    const removeSkill = (skill) => {
        setFormData(prev => ({ ...prev, skills: prev.skills.filter(s => s !== skill) }));
    };

    // --- Custom UI Components ---

    const CustomLabel = ({ children }) => (
        <label className="block text-[11px] font-black text-mine-shaft-400 uppercase tracking-[0.2em] mb-2 ml-1">
            {children}
        </label>
    );

    const DropdownItem = ({ label, onClick, active }) => (
        <div
            onClick={onClick}
            className={`px-4 py-2.5 cursor-pointer text-sm font-semibold transition-all duration-200
                ${active ? 'bg-bright-sun-400 text-mine-shaft-950 scale-[1.02]' : 'text-mine-shaft-300 hover:bg-mine-shaft-800 hover:text-bright-sun-400'}
            `}
        >
            {label}
        </div>
    );

    return (
        <div className="min-h-screen bg-mine-shaft-950 text-mine-shaft-100 font-['Poppins'] py-12 px-6">
            <div className="max-w-5xl mx-auto">

                {/* Header */}
                <div className="flex items-center gap-6 mb-12">
                    <button
                        onClick={() => window.location.href = '/'}
                        className="p-3 bg-mine-shaft-900/50 rounded-2xl hover:bg-mine-shaft-800 transition-all border border-mine-shaft-800"
                    >
                        <IconChevronLeft size={24} className="text-mine-shaft-200" />
                    </button>
                    <div>
                        <h1 className="text-4xl font-black uppercase tracking-tighter text-white">Post a <span className="text-bright-sun-400">Job</span></h1>
                        <p className="text-mine-shaft-400 text-sm font-medium mt-1">Fill in the details to find your next great hire.</p>
                    </div>
                </div>

                {/* Form Card */}
                <div className="bg-mine-shaft-950 border border-mine-shaft-900 rounded-[2.5rem] p-8 lg:p-12 shadow-[0_25px_80px_-20px_rgba(0,0,0,0.8)] relative overflow-hidden">

                    {/* Background Glow */}
                    <div className="absolute -top-24 -right-24 w-64 h-64 bg-bright-sun-400/5 blur-[100px] rounded-full pointer-events-none"></div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10 mb-12" ref={dropdownRef}>

                        {/* Job Title */}
                        <div className="relative group">
                            <CustomLabel>Job Role / Title</CustomLabel>
                            <div className="relative">
                                {autocomplete.isLoading.jobTitle ? (
                                    <div className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-4 h-4 border-2 border-bright-sun-400 border-t-transparent rounded-full animate-spin"></div>
                                ) : (
                                    <IconSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-bright-sun-400 z-10" size={18} />
                                )}
                                <input
                                    type="text"
                                    placeholder="e.g. Lead Designer"
                                    className="w-full bg-[#111111] border border-mine-shaft-800 rounded-2xl py-3.5 pl-12 pr-4 text-sm font-bold text-white outline-none focus:border-bright-sun-400/50 focus:bg-[#151515] transition-all placeholder:text-mine-shaft-600 shadow-inner"
                                    value={formData.jobTitle}
                                    onChange={(e) => {
                                        setFormData({ ...formData, jobTitle: e.target.value });
                                        setActiveDropdown('jobTitle');
                                    }}
                                    onFocus={() => setActiveDropdown('jobTitle')}
                                />
                                {activeDropdown === 'jobTitle' && autocomplete.jobTitles.filter(t => t.toLowerCase().includes(formData.jobTitle.toLowerCase())).length > 0 && (
                                    <div className="absolute top-full left-0 w-full mt-2 bg-[#121212] border border-mine-shaft-800 rounded-2xl shadow-2xl z-50 py-2 max-h-60 overflow-y-auto custom-scrollbar">
                                        {autocomplete.jobTitles.filter(t => t.toLowerCase().includes(formData.jobTitle.toLowerCase())).map(t => (
                                            <DropdownItem key={t} label={t} onClick={() => { setFormData({ ...formData, jobTitle: t }); setActiveDropdown(null); }} />
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Company */}
                        <div className="relative group">
                            <CustomLabel>Official Company Name</CustomLabel>
                            <div className="relative flex items-center gap-3">
                                <div className="relative flex-1">
                                    {autocomplete.isLoading.company ? (
                                        <div className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-4 h-4 border-2 border-bright-sun-400 border-t-transparent rounded-full animate-spin"></div>
                                    ) : (
                                        <IconBuilding className="absolute left-4 top-1/2 -translate-y-1/2 text-bright-sun-400 z-10" size={18} />
                                    )}
                                    <input
                                        type="text"
                                        placeholder="e.g. Microsoft"
                                        className="w-full bg-[#111111] border border-mine-shaft-800 rounded-2xl py-3.5 pl-12 pr-4 text-sm font-bold text-white outline-none focus:border-bright-sun-400/50 focus:bg-[#151515] transition-all placeholder:text-mine-shaft-600 shadow-inner"
                                        value={formData.company}
                                        onChange={(e) => {
                                            setFormData({ ...formData, company: e.target.value, companyLogo: '' });
                                            setActiveDropdown('company');
                                        }}
                                        onFocus={() => setActiveDropdown('company')}
                                    />
                                    {activeDropdown === 'company' && (autocomplete.companies.length > 0 || (formData.company.length === 0 && TOP_COMPANIES.length > 0)) && (
                                        <div className="absolute top-full left-0 w-full mt-2 bg-[#121212] border border-mine-shaft-800 rounded-2xl shadow-2xl z-50 py-2 max-h-60 overflow-y-auto custom-scrollbar">
                                            {(autocomplete.companies.length > 0 ? autocomplete.companies : TOP_COMPANIES).map((c, idx) => (
                                                <div
                                                    key={`${c.name}-${idx}`}
                                                    onClick={() => {
                                                        setFormData({ ...formData, company: c.name, companyLogo: c.logo });
                                                        setActiveDropdown(null);
                                                    }}
                                                    className="px-4 py-2.5 cursor-pointer text-sm font-semibold transition-all duration-200 text-mine-shaft-300 hover:bg-mine-shaft-800 hover:text-bright-sun-400 flex items-center gap-3 group/item border-b border-mine-shaft-900 last:border-0"
                                                >
                                                    <div className="w-8 h-8 rounded-lg bg-white p-1 flex items-center justify-center shrink-0 shadow-sm transition-transform group-hover/item:scale-110">
                                                        <img
                                                            src={c.logo}
                                                            alt=""
                                                            className="w-full h-full object-contain"
                                                            onError={(e) => { e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(c.name)}&background=random`; }}
                                                        />
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <span className="font-bold text-white group-hover/item:text-bright-sun-400 transition-colors">{c.name}</span>
                                                        {autocomplete.companies.length === 0 && <span className="text-[10px] text-mine-shaft-500 uppercase tracking-widest font-black">Top Company</span>}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                                {formData.company && (
                                    <div className="w-14 h-14 bg-[#111111] border border-mine-shaft-800 rounded-2xl flex items-center justify-center p-2 shadow-xl animate-in fade-in zoom-in duration-300 relative group overflow-hidden">
                                        <img
                                            src={formData.companyLogo || `https://img.logo.dev/${formData.company.toLowerCase().replace(/\s/g, '')}.com?token=${LOGODEV_PK}`}
                                            alt="Logo"
                                            className="w-full h-full object-contain"
                                            onError={(e) => { e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(formData.company)}&background=FA9E0D&color=fff&bold=true`; }}
                                        />
                                        {!formData.companyLogo && <div className="absolute inset-0 bg-bright-sun-400/5 pointer-events-none"></div>}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Experience */}
                        <div className="relative group">
                            <CustomLabel>Experience Level</CustomLabel>
                            <div className="relative">
                                <IconBriefcase className="absolute left-4 top-1/2 -translate-y-1/2 text-bright-sun-400 z-10" size={18} />
                                <div
                                    onClick={() => setActiveDropdown(activeDropdown === 'experience' ? null : 'experience')}
                                    className="w-full bg-[#111111] border border-mine-shaft-800 rounded-2xl py-3.5 pl-12 pr-10 text-sm font-bold text-white cursor-pointer hover:border-mine-shaft-700 transition-all flex justify-between items-center"
                                >
                                    {formData.experience}
                                    <IconChevronDown size={18} className={`text-mine-shaft-500 transition-transform ${activeDropdown === 'experience' ? 'rotate-180' : ''}`} />
                                </div>
                                {activeDropdown === 'experience' && (
                                    <div className="absolute top-full left-0 w-full mt-2 bg-[#121212] border border-mine-shaft-800 rounded-2xl shadow-2xl z-50 py-2 overflow-hidden">
                                        {['Entry Level', 'Intermediate', 'Expert'].map(exp => (
                                            <DropdownItem key={exp} label={exp} active={formData.experience === exp} onClick={() => { setFormData({ ...formData, experience: exp }); setActiveDropdown(null); }} />
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Job Type */}
                        <div className="relative group">
                            <CustomLabel>Job Type</CustomLabel>
                            <div className="relative">
                                <IconClock className="absolute left-4 top-1/2 -translate-y-1/2 text-bright-sun-400 z-10" size={18} />
                                <div
                                    onClick={() => setActiveDropdown(activeDropdown === 'jobType' ? null : 'jobType')}
                                    className="w-full bg-[#111111] border border-mine-shaft-800 rounded-2xl py-3.5 pl-12 pr-10 text-sm font-bold text-white cursor-pointer hover:border-mine-shaft-700 transition-all flex justify-between items-center"
                                >
                                    {formData.jobType}
                                    <IconChevronDown size={18} className={`text-mine-shaft-500 transition-transform ${activeDropdown === 'jobType' ? 'rotate-180' : ''}`} />
                                </div>
                                {activeDropdown === 'jobType' && (
                                    <div className="absolute top-full left-0 w-full mt-2 bg-[#121212] border border-mine-shaft-800 rounded-2xl shadow-2xl z-50 py-2 overflow-hidden">
                                        {['Full Time', 'Part Time', 'Contract', 'Remote', 'Internship'].map(type => (
                                            <DropdownItem key={type} label={type} active={formData.jobType === type} onClick={() => { setFormData({ ...formData, jobType: type }); setActiveDropdown(null); }} />
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Location */}
                        <div className="relative group">
                            <CustomLabel>Job Location</CustomLabel>
                            <div className="relative">
                                {autocomplete.isLoading.location ? (
                                    <div className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-4 h-4 border-2 border-bright-sun-400 border-t-transparent rounded-full animate-spin"></div>
                                ) : (
                                    <IconMapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-bright-sun-400 z-10" size={18} />
                                )}
                                <input
                                    type="text"
                                    placeholder="e.g. Bangalore, Remote"
                                    className="w-full bg-[#111111] border border-mine-shaft-800 rounded-2xl py-3.5 pl-12 pr-4 text-sm font-bold text-white outline-none focus:border-bright-sun-400/50 focus:bg-[#151515] transition-all placeholder:text-mine-shaft-600 shadow-inner"
                                    value={formData.location}
                                    onChange={(e) => {
                                        setFormData({ ...formData, location: e.target.value });
                                        setActiveDropdown('location');
                                    }}
                                    onFocus={() => setActiveDropdown('location')}
                                />
                                {activeDropdown === 'location' && autocomplete.locations.filter(l => l.toLowerCase().includes(formData.location.toLowerCase())).length > 0 && (
                                    <div className="absolute top-full left-0 w-full mt-2 bg-[#121212] border border-mine-shaft-800 rounded-2xl shadow-2xl z-50 py-2 max-h-60 overflow-y-auto custom-scrollbar">
                                        {autocomplete.locations.filter(l => l.toLowerCase().includes(formData.location.toLowerCase())).map(l => (
                                            <DropdownItem key={l} label={l} onClick={() => { setFormData({ ...formData, location: l }); setActiveDropdown(null); }} />
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Salary */}
                        <div className="relative group">
                            <CustomLabel>Salary per Annum</CustomLabel>
                            <div className="relative">
                                <IconCurrencyDollar className="absolute left-4 top-1/2 -translate-y-1/2 text-bright-sun-400 z-10" size={18} />
                                <input
                                    type="number"
                                    placeholder="Enter Salary (e.g. 15)"
                                    className="w-full bg-[#111111] border border-mine-shaft-800 rounded-2xl py-3.5 pl-12 pr-16 text-sm font-bold text-white outline-none focus:border-bright-sun-400/50 focus:bg-[#151515] transition-all placeholder:text-mine-shaft-600 shadow-inner"
                                    value={formData.salary}
                                    onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
                                />
                                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-black text-mine-shaft-500 uppercase">LPA</span>
                            </div>
                        </div>
                    </div>

                    {/* Skills Tag Input */}
                    <div className="mb-12">
                        <CustomLabel>Required Skills</CustomLabel>
                        <div className="w-full bg-[#111111] border border-mine-shaft-800 rounded-3xl p-3 min-h-[60px] flex flex-wrap gap-2 items-center focus-within:border-bright-sun-400/50 transition-all shadow-inner">
                            {formData.skills.map(skill => (
                                <div key={skill} className="flex items-center gap-2 bg-mine-shaft-900 border border-mine-shaft-800 text-bright-sun-400 px-3 py-1.5 rounded-xl text-xs font-black uppercase tracking-wider group/tag">
                                    {skill}
                                    <IconX
                                        size={14}
                                        className="cursor-pointer text-mine-shaft-500 hover:text-red-400 transition-colors"
                                        onClick={() => removeSkill(skill)}
                                    />
                                </div>
                            ))}
                            <input
                                type="text"
                                placeholder={formData.skills.length === 0 ? "Type skill and press Enter..." : "Add more..."}
                                className="flex-1 bg-transparent border-none outline-none text-sm font-semibold text-white min-w-[150px] px-2 py-1 placeholder:text-mine-shaft-600"
                                value={skillInput}
                                onChange={(e) => setSkillInput(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        e.preventDefault();
                                        addSkill(skillInput);
                                    }
                                }}
                            />
                        </div>
                    </div>

                    {/* Job Description with Custom Dark Styles on Mantine Editor */}
                    <div className="mb-12">
                        <CustomLabel>Job Description</CustomLabel>
                        <div className="rounded-4xl border border-mine-shaft-900 overflow-hidden bg-[#0a0a0a] shadow-2xl editor-container">
                            <style>{`
                                .editor-container .mantine-RichTextEditor-root {
                                    background: #0a0a0a !important;
                                    border: none !important;
                                }
                                .editor-container .mantine-RichTextEditor-toolbar {
                                    background: #121212 !important;
                                    border-bottom: 1px solid #1a1a1a !important;
                                    padding: 12px !important;
                                }
                                .editor-container .mantine-RichTextEditor-controlsGroup {
                                    background: transparent !important;
                                    border: 1px solid #1a1a1a !important;
                                }
                                .editor-container .mantine-RichTextEditor-control {
                                    background: #151515 !important;
                                    border: none !important;
                                    color: #959595 !important;
                                    transition: all 0.2s ease !important;
                                }
                                .editor-container .mantine-RichTextEditor-control:hover {
                                    background: #252525 !important;
                                    color: #fae62d !important;
                                }
                                .editor-container .mantine-RichTextEditor-control[data-active] {
                                    background: rgba(250, 230, 45, 0.1) !important;
                                    color: #fae62d !important;
                                }
                                .editor-container .mantine-RichTextEditor-content {
                                    background: #0a0a0a !important;
                                }
                                .editor-container .ProseMirror {
                                    color: #bbb !important;
                                    padding: 32px !important;
                                    min-height: 350px !important;
                                    font-size: 15px !important;
                                    outline: none !important;
                                }
                                .editor-container .ProseMirror h3 {
                                    color: #fae62d !important;
                                    font-weight: 800 !important;
                                    text-transform: uppercase !important;
                                    letter-spacing: 1px !important;
                                    margin-bottom: 1rem !important;
                                }
                                .editor-container .ProseMirror code {
                                    background: #1a1a1a !important;
                                    color: #fae62d !important;
                                    padding: 0.2rem 0.4rem !important;
                                    border-radius: 4px !important;
                                    font-family: 'JetBrains Mono', monospace !important;
                                }
                                .editor-container .ProseMirror pre {
                                    background: #0d0d0d !important;
                                    border: 1px solid #1a1a1a !important;
                                    border-radius: 12px !important;
                                    padding: 1.5rem !important;
                                    margin: 1rem 0 !important;
                                }
                                .editor-container .ProseMirror pre code {
                                    background: transparent !important;
                                    padding: 0 !important;
                                    color: #eee !important;
                                }
                                .editor-container .ProseMirror blockquote {
                                    border-left: 4px solid #fae62d !important;
                                    padding-left: 1.5rem !important;
                                    margin-left: 0 !important;
                                    font-style: italic !important;
                                    color: #888 !important;
                                }
                                .editor-container .ProseMirror mark {
                                    background-color: rgba(250, 230, 45, 0.3) !important;
                                    color: #fff !important;
                                    padding: 0.1rem 0.2rem !important;
                                    border-radius: 2px !important;
                                }
                                .editor-container .ProseMirror p.is-editor-empty:first-child::before {
                                    content: attr(data-placeholder);
                                    float: left;
                                    color: #555 !important;
                                    pointer-events: none;
                                    height: 0;
                                    font-style: italic;
                                }
                            `}</style>
                            <RichTextEditor editor={editor}>
                                <RichTextEditor.Toolbar>
                                    <RichTextEditor.ControlsGroup>
                                        <RichTextEditor.Bold />
                                        <RichTextEditor.Italic />
                                        <RichTextEditor.Underline />
                                        <RichTextEditor.Strikethrough />
                                        <RichTextEditor.Highlight />
                                        <RichTextEditor.Code />
                                        <RichTextEditor.CodeBlock />
                                    </RichTextEditor.ControlsGroup>
                                    <RichTextEditor.ControlsGroup>
                                        <RichTextEditor.H1 />
                                        <RichTextEditor.H2 />
                                        <RichTextEditor.H3 />
                                        <RichTextEditor.Blockquote />
                                    </RichTextEditor.ControlsGroup>
                                    <RichTextEditor.ControlsGroup>
                                        <RichTextEditor.AlignLeft />
                                        <RichTextEditor.AlignCenter />
                                        <RichTextEditor.AlignRight />
                                        <RichTextEditor.AlignJustify />
                                    </RichTextEditor.ControlsGroup>
                                    <RichTextEditor.ControlsGroup>
                                        <RichTextEditor.BulletList />
                                        <RichTextEditor.OrderedList />
                                    </RichTextEditor.ControlsGroup>
                                    <RichTextEditor.ControlsGroup>
                                        <RichTextEditor.Link />
                                        <RichTextEditor.Unlink />
                                    </RichTextEditor.ControlsGroup>
                                </RichTextEditor.Toolbar>
                                <RichTextEditor.Content />
                            </RichTextEditor>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col sm:flex-row gap-6 pt-4">
                        <button
                            onClick={handlePublish}
                            className="bg-bright-sun-400 text-mine-shaft-950 px-10 py-4 rounded-2xl font-black text-sm uppercase tracking-tighter flex items-center justify-center gap-3 hover:bg-bright-sun-300 transition-all hover:scale-[1.02] active:scale-[0.98] shadow-[0_10px_30px_-10px_rgba(250,230,45,0.4)] flex-1 sm:flex-none"
                        >
                            <IconRocket size={20} />
                            Publish Job Now
                        </button>
                        <button
                            className="bg-transparent border border-mine-shaft-800 text-mine-shaft-400 px-10 py-4 rounded-2xl font-black text-sm uppercase tracking-tighter flex items-center justify-center gap-3 hover:border-bright-sun-400/30 hover:text-bright-sun-400 transition-all flex-1 sm:flex-none"
                        >
                            <IconDeviceFloppy size={20} />
                            Save as Draft
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default PostJob;
