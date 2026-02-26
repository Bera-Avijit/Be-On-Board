import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Text, Button, Group, Badge, Divider, List, Avatar } from '@mantine/core';
import { IconMapPin, IconBriefcase, IconClock, IconCurrencyDollar, IconArrowLeft, IconBookmark, IconShare, IconSquareCheck } from '@tabler/icons-react';
import { JOBS_DATA } from '../Data/JobsData';
import { User } from '../Data/User';

const JobDetailsPage = () => {
    const { id } = useParams();
    const [job, setJob] = useState(null);

    useEffect(() => {
        const publishedJobs = JSON.parse(localStorage.getItem('publishedJobs') || '[]');
        const allJobs = [...publishedJobs, ...JOBS_DATA];
        const foundJob = allJobs.find(j => String(j.id) === String(id));
        setJob(foundJob);
    }, [id]);

    if (!job) {
        return (
            <div className="min-h-screen bg-mine-shaft-950 flex flex-col items-center justify-center p-6 text-center">
                <Text size="xl" fw={900} color="white">Job listing not found</Text>
                <Button
                    onClick={() => window.location.href = '/find-jobs'}
                    variant="light"
                    color="yellow"
                    mt="md"
                    radius="xl"
                >
                    Back to Jobs
                </Button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-mine-shaft-950 font-['Poppins'] pb-20">
            {/* Header / Hero Section */}
            <div className="bg-mine-shaft-900/30 border-b border-mine-shaft-800 pt-12 pb-16">
                <div className="max-w-6xl mx-auto px-6">
                    <Link
                        to="/find-jobs"
                        className="inline-flex items-center gap-2 text-mine-shaft-400 hover:text-bright-sun-400 mb-8 transition-colors group font-bold text-sm"
                    >
                        <IconArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                        Back to Job Postings
                    </Link>

                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
                        <div className="flex gap-6 items-center">
                            <div className="w-20 h-20 bg-white rounded-3xl p-3 flex items-center justify-center shadow-2xl">
                                <img src={job.logoUrl} alt={job.company} className="w-full h-full object-contain" />
                            </div>
                            <div>
                                <h1 className="text-3xl lg:text-5xl font-black text-white tracking-tighter mb-2">
                                    {job.jobTitle}
                                </h1>
                                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-mine-shaft-300 font-semibold uppercase tracking-widest text-xs">
                                    <span className="text-bright-sun-400">{job.company}</span>
                                    <span className="w-1.5 h-1.5 bg-mine-shaft-700 rounded-full hidden sm:block"></span>
                                    <span>{job.location}</span>
                                    <span className="w-1.5 h-1.5 bg-mine-shaft-700 rounded-full hidden sm:block"></span>
                                    <span>Posted {job.postedDaysAgo} days ago</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-4 w-full md:w-auto">
                            <Button
                                variant="outline"
                                color="yellow"
                                size="lg"
                                radius="xl"
                                className="border-mine-shaft-700! text-mine-shaft-300! hover:border-bright-sun-400! hover:text-bright-sun-400! flex-1 md:flex-none"
                            >
                                <IconBookmark size={20} />
                            </Button>
                            {User.role === 'CANDIDATE' ? (
                                <Button
                                    component={Link}
                                    to={`/apply-job/${job.id}`}
                                    color="yellow"
                                    size="lg"
                                    radius="xl"
                                    className="bg-bright-sun-400! text-mine-shaft-950! hover:bg-bright-sun-500! font-black flex-1 md:flex-none"
                                >
                                    Apply Now
                                </Button>
                            ) : (
                                <Button
                                    disabled
                                    variant="filled"
                                    color="gray"
                                    size="lg"
                                    radius="xl"
                                    className="bg-mine-shaft-800! text-mine-shaft-500! font-black flex-1 md:flex-none cursor-not-allowed"
                                >
                                    {User.role === 'RECRUITER' ? 'Recruiter View' : 'Apply (Candidate Only)'}
                                </Button>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <div className="max-w-6xl mx-auto px-6 mt-12">
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-12">
                    {/* Left Column */}
                    <div>
                        <div className="bg-mine-shaft-900/20 border border-mine-shaft-800/50 rounded-[2.5rem] p-8 lg:p-12">
                            <section className="mb-10">
                                <h2 className="text-2xl font-black text-white uppercase tracking-tight mb-6 flex items-center gap-3">
                                    <div className="w-2 h-8 bg-bright-sun-400 rounded-full"></div>
                                    Job Description
                                </h2>
                                <div
                                    className="text-mine-shaft-100 leading-relaxed font-medium space-y-4 prose prose-invert max-w-none"
                                    dangerouslySetInnerHTML={{ __html: job.description }}
                                />
                            </section>

                            <Divider className="border-mine-shaft-800 my-12" />

                            <section className="mb-10">
                                <h2 className="text-2xl font-black text-white uppercase tracking-tight mb-6 flex items-center gap-3">
                                    <div className="w-2 h-8 bg-bright-sun-400 rounded-full"></div>
                                    Key Responsibilities
                                </h2>
                                <List
                                    spacing="md"
                                    size="sm"
                                    center
                                    icon={<IconSquareCheck size={20} className="text-bright-sun-400" />}
                                    className="text-mine-shaft-200"
                                >
                                    <List.Item>Drive technical excellence and implementation across the engineering team.</List.Item>
                                    <List.Item>Collaborate with product managers and designers to create world-class features.</List.Item>
                                    <List.Item>Optimize performance and scalability of core architectural components.</List.Item>
                                    <List.Item>Mentor junior developers and promote high-quality coding standards.</List.Item>
                                    <List.Item>Participate in architectural reviews and long-term technical planning.</List.Item>
                                </List>
                            </section>

                            <section>
                                <h2 className="text-xl font-black text-white uppercase tracking-tight mb-6">Required Skills & Expertise</h2>
                                <div className="flex flex-wrap gap-3">
                                    {(job.skills || ["React", "JavaScript", "TypeScript", "Node.js", "System Design"]).map(skill => (
                                        <Badge
                                            key={skill}
                                            variant="light"
                                            color="yellow"
                                            size="lg"
                                            radius="md"
                                            className="bg-bright-sun-400/10! text-bright-sun-400! border border-bright-sun-400/20! py-4! px-6! font-black uppercase tracking-wider"
                                        >
                                            {skill}
                                        </Badge>
                                    ))}
                                </div>
                            </section>
                        </div>
                    </div>

                    {/* Right Column / Sidebar */}
                    <div className="space-y-8">
                        {/* Highlights Card */}
                        <div className="bg-mine-shaft-900/40 border border-mine-shaft-700/50 rounded-3xl p-8 sticky top-8">
                            <h3 className="text-lg font-black text-white uppercase tracking-tight mb-6">Job Overview</h3>

                            <div className="space-y-6">
                                <div className="flex gap-4">
                                    <div className="w-10 h-10 bg-mine-shaft-800 rounded-xl flex items-center justify-center shrink-0 border border-mine-shaft-700">
                                        <IconBriefcase size={20} className="text-bright-sun-400" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] uppercase font-black text-mine-shaft-500 tracking-widest">Experience</p>
                                        <p className="text-white font-bold">{job.experience}</p>
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <div className="w-10 h-10 bg-mine-shaft-800 rounded-xl flex items-center justify-center shrink-0 border border-mine-shaft-700">
                                        <IconClock size={20} className="text-bright-sun-400" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] uppercase font-black text-mine-shaft-500 tracking-widest">Job Type</p>
                                        <p className="text-white font-bold">{job.jobType}</p>
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <div className="w-10 h-10 bg-mine-shaft-800 rounded-xl flex items-center justify-center shrink-0 border border-mine-shaft-700">
                                        <IconCurrencyDollar size={20} className="text-bright-sun-400" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] uppercase font-black text-mine-shaft-500 tracking-widest">Salary Range</p>
                                        <p className="text-white font-bold">{job.minSalary} LPA - {job.maxSalary} LPA</p>
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <div className="w-10 h-10 bg-mine-shaft-800 rounded-xl flex items-center justify-center shrink-0 border border-mine-shaft-700">
                                        <IconMapPin size={20} className="text-bright-sun-400" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] uppercase font-black text-mine-shaft-500 tracking-widest">Location</p>
                                        <p className="text-white font-bold">{job.location}</p>
                                    </div>
                                </div>
                            </div>

                            <Divider className="border-mine-shaft-800 my-8" />

                            <div className="flex flex-col gap-4">
                                {User.role === 'CANDIDATE' ? (
                                    <Button
                                        component={Link}
                                        to={`/apply-job/${job.id}`}
                                        fullWidth
                                        size="md"
                                        radius="xl"
                                        color="yellow"
                                        className="bg-bright-sun-400! text-mine-shaft-950! font-black uppercase tracking-tighter"
                                    >
                                        Apply for this role
                                    </Button>
                                ) : (
                                    <Button
                                        disabled
                                        fullWidth
                                        size="md"
                                        radius="xl"
                                        className="bg-mine-shaft-800! text-mine-shaft-500! font-black uppercase tracking-tighter cursor-not-allowed"
                                    >
                                        Apply (Candidate Only)
                                    </Button>
                                )}
                                <Button
                                    fullWidth
                                    size="md"
                                    radius="xl"
                                    variant="subtle"
                                    color="gray"
                                    leftSection={<IconShare size={18} />}
                                    className="text-mine-shaft-400! hover:bg-mine-shaft-800! hover:text-white! font-bold"
                                >
                                    Share Job Post
                                </Button>
                            </div>
                        </div>

                        {/* Similar Jobs or Company Info Placeholder */}
                        <div className="bg-bright-sun-400/5 border border-bright-sun-400/20 rounded-3xl p-8">
                            <Group gap="sm" mb="md">
                                <Avatar src={job.logoUrl} size="sm" />
                                <Text fw={900} className="text-bright-sun-400 tracking-tight">About {job.company}</Text>
                            </Group>
                            <p className="text-xs text-mine-shaft-300 leading-relaxed font-medium">
                                A world-leading technology company dedicated to innovation and creating positive global impact through software and services.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default JobDetailsPage;
