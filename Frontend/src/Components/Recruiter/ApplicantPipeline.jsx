import React, { useState, useEffect } from 'react';
import {
    Text,
    Grid,
    Card,
    Group,
    Badge,
    Avatar,
    ActionIcon,
    Menu,
    Divider,
    Modal,
    Stack,
    Button,
    Tooltip,
    Tabs,
    TextInput,
    Transition,
    Box
} from '@mantine/core';
import {
    IconDotsVertical,
    IconCheck,
    IconX,
    IconCalendar,
    IconUser,
    IconMail,
    IconPhone,
    IconArrowRight,
    IconFileText,
    IconBriefcase,
    IconSearch,
    IconFilter,
    IconArrowsSort,
    IconExternalLink,
    IconSend,
    IconChevronDown,
    IconTrendingUp,
    IconTrash
} from '@tabler/icons-react';
import { getApplications, updateApplicationStatus, ApplicationStatuses } from '../../Data/ApplicationData';

const ApplicantPipeline = () => {
    const [applications, setApplications] = useState([]);
    const [selectedApplicant, setSelectedApplicant] = useState(null);
    const [modalOpened, setModalOpened] = useState(false);
    const [activeTab, setActiveTab] = useState(ApplicationStatuses.APPLIED);
    const [searchQuery, setSearchQuery] = useState('');
    const [sortBy, setSortBy] = useState('recent');

    useEffect(() => {
        setApplications(getApplications());
    }, []);

    const handleStatusUpdate = (id, newStatus) => {
        const updated = updateApplicationStatus(id, newStatus);
        setApplications(updated);
        setModalOpened(false);
    };

    const columns = [
        { title: 'Applied', status: ApplicationStatuses.APPLIED, color: 'blue', icon: <IconSend size={16} /> },
        { title: 'Shortlisted', status: ApplicationStatuses.SHORTLISTED, color: 'teal', icon: <IconTrendingUp size={16} /> },
        { title: 'Interview', status: ApplicationStatuses.INTERVIEW, color: 'orange', icon: <IconCalendar size={16} /> },
        { title: 'Hired', status: ApplicationStatuses.HIRED, color: 'green', icon: <IconCheck size={16} /> },
        { title: 'Rejected', status: ApplicationStatuses.REJECTED, color: 'red', icon: <IconX size={16} /> },
    ];

    const sortedApps = [...applications].sort((a, b) => {
        if (sortBy === 'recent') return new Date(b.appliedDate) - new Date(a.appliedDate);
        return a.fullName.localeCompare(b.fullName);
    });

    const filteredApps = sortedApps.filter(app =>
        app.status === activeTab &&
        (app.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            app.jobTitle.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    const ApplicantCard = ({ applicant }) => {
        const [hovered, setHovered] = useState(false);

        return (
            <Card
                className={`bg-mine-shaft-900/40! border! transition-all! duration-300! overflow-visible! p-8! rounded-4xl! shadow-xl! cursor-pointer! group relative ${hovered ? 'border-bright-sun-400! bg-mine-shaft-900/80! shadow-2xl! shadow-bright-sun-400/10!' : 'border-mine-shaft-800!'
                    }`}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                onClick={() => {
                    setSelectedApplicant(applicant);
                    setModalOpened(true);
                }}
            >
                {/* Visual Accent */}
                <div className={`absolute top-0 right-0 w-24 h-24 bg-bright-sun-400/5 blur-3xl rounded-full transition-opacity duration-500 ${hovered ? 'opacity-100' : 'opacity-0'}`}></div>

                <Group justify="space-between" mb="lg!" wrap="nowrap" gap="xl!">
                    <Group gap="lg!" wrap="nowrap">
                        <Avatar
                            src={applicant?.avatar}
                            alt={applicant?.fullName}
                            size="lg"
                            radius="xl"
                            className={`border-2! transition-all! duration-500! shadow-lg! ${hovered ? 'border-bright-sun-400! scale-110!' : 'border-mine-shaft-800!'}`}
                        >
                            {(applicant?.fullName || "A").charAt(0)}
                        </Avatar>
                        <div className="overflow-hidden flex flex-col gap-1">
                            <Text size="lg" fw={900} className="text-white! group-hover:text-bright-sun-400! transition-colors! truncate!">
                                {applicant?.fullName}
                            </Text>
                            <Text size="sm" fw={700} className="text-mine-shaft-400! uppercase! tracking-widest! truncate!">
                                {applicant?.jobTitle}
                            </Text>
                        </div>
                    </Group>

                    <Transition mounted={hovered} transition="pop" duration={200}>
                        {(styles) => (
                            <Group gap="xs!" style={styles} onClick={(e) => e.stopPropagation()}>
                                {activeTab === ApplicationStatuses.APPLIED && (
                                    <Tooltip label="Quick Shortlist" withArrow>
                                        <ActionIcon
                                            variant="filled"
                                            color="teal"
                                            radius="xl"
                                            size="lg"
                                            className="shadow-xl! shadow-teal-500/20!"
                                            onClick={() => handleStatusUpdate(applicant.id, ApplicationStatuses.SHORTLISTED)}
                                        >
                                            <IconCheck size={18} />
                                        </ActionIcon>
                                    </Tooltip>
                                )}
                                <Tooltip label="Quick Reject" withArrow>
                                    <ActionIcon
                                        variant="filled"
                                        color="red"
                                        radius="xl"
                                        size="lg"
                                        className="shadow-xl! shadow-red-500/20!"
                                        onClick={() => handleStatusUpdate(applicant.id, ApplicationStatuses.REJECTED)}
                                    >
                                        <IconTrash size={18} />
                                    </ActionIcon>
                                </Tooltip>
                            </Group>
                        )}
                    </Transition>
                </Group>

                <Stack gap="md!" mt="xl!">
                    <div className="flex items-center gap-4 px-4 py-3 bg-mine-shaft-950/40 rounded-2xl border border-mine-shaft-800/30 group-hover:border-bright-sun-400/20 transition-colors">
                        <IconMail size={16} className="text-bright-sun-400" />
                        <Text size="xs" className="text-mine-shaft-300 font-bold truncate">{applicant.email}</Text>
                    </div>
                    <div className="flex items-center gap-4 px-4 py-3 bg-mine-shaft-950/40 rounded-2xl border border-mine-shaft-800/30 group-hover:border-bright-sun-400/20 transition-colors">
                        <IconCalendar size={16} className="text-bright-sun-400" />
                        <Text size="xs" className="text-mine-shaft-300 font-bold">Applied: {applicant.appliedDate}</Text>
                    </div>
                </Stack>

                <Group justify="space-between" mt="2rem!">
                    <Badge variant="light" color="gray" size="sm" className="bg-mine-shaft-950! text-mine-shaft-500! font-black! px-3! py-3!">
                        #{applicant.id.split('-').pop()}
                    </Badge>
                    <Menu position="bottom-end" shadow="xl" radius="xl" withArrow>
                        <Menu.Target>
                            <Button
                                variant="subtle"
                                color="gray"
                                size="xs"
                                compact
                                onClick={(e) => e.stopPropagation()}
                                rightSection={<IconChevronDown size={12} />}
                                className="hover:bg-mine-shaft-800! text-mine-shaft-400! font-black! uppercase! tracking-widest!"
                            >
                                Actions
                            </Button>
                        </Menu.Target>
                        <Menu.Dropdown className="bg-mine-shaft-900! border-mine-shaft-800! p-2! rounded-2xl!">
                            <Menu.Label className="uppercase font-black text-[9px] tracking-[0.2em] mb-1 px-3">Move Workflow</Menu.Label>
                            {columns.map(col => (
                                <Menu.Item
                                    key={col.status}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleStatusUpdate(applicant.id, col.status);
                                    }}
                                    leftSection={col.icon}
                                    className={`font-bold! uppercase! text-[10px]! tracking-widest! rounded-xl! transition-colors! px-3! py-2! ${activeTab === col.status ? 'bg-mine-shaft-800! text-bright-sun-400!' : 'text-mine-shaft-300!'
                                        }`}
                                >
                                    {col.title}
                                </Menu.Item>
                            ))}
                        </Menu.Dropdown>
                    </Menu>
                </Group>
            </Card>
        );
    };

    return (
        <div className="mt-12! mb-16!">
            {/* Control Bar - High Contrast Header */}
            <Card className="bg-mine-shaft-900/50! border! border-mine-shaft-800! p-10! rounded-[3rem]! mb-16! backdrop-blur-xl! shadow-2xl!">
                <Grid gutter="3rem!" align="flex-end">
                    <Grid.Col span={{ base: 12, lg: 4 }}>
                        <Stack gap="xs!">
                            <Text size="xs" fw={900} className="text-mine-shaft-500! uppercase! tracking-[0.3em]! ml-1!">Global Search</Text>
                            <TextInput
                                placeholder="Search by name, role, or ID..."
                                leftSection={<IconSearch size={20} className="text-bright-sun-400!" />}
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.currentTarget.value)}
                                size="lg"
                                className="w-full!"
                                classNames={{
                                    input: "bg-mine-shaft-950/50! border-mine-shaft-700! text-white! rounded-2xl! focus:border-bright-sun-400! transition-all! font-medium! h-14!"
                                }}
                            />
                        </Stack>
                    </Grid.Col>

                    <Grid.Col span={{ base: 12, lg: 8 }}>
                        <Stack gap="xs!">
                            <Text size="xs" fw={900} className="text-mine-shaft-500! uppercase! tracking-[0.3em]! ml-1!">Pipeline Status</Text>
                            <Tabs
                                value={activeTab}
                                onChange={setActiveTab}
                                variant="pills"
                                radius="xl"
                                classNames={{
                                    root: "w-full!",
                                    list: "bg-mine-shaft-950/50! p-2! rounded-[1.5rem]! border! border-mine-shaft-800! flex! gap-2! flex-nowrap! overflow-x-auto!",
                                    tab: "data-[active]:bg-bright-sun-400! data-[active]:text-mine-shaft-950! text-mine-shaft-400! font-black! uppercase! tracking-widest! text-[10px]! px-8! transition-all! h-12! border-none!",
                                }}
                            >
                                <Tabs.List>
                                    {columns.map(col => (
                                        <Tabs.Tab key={col.status} value={col.status} leftSection={col.icon}>
                                            {col.title}
                                            <Badge variant="filled" size="xs" radius="xl" className="ml-3 bg-mine-shaft-800/80 text-white! border-none!">
                                                {applications.filter(a => a.status === col.status).length}
                                            </Badge>
                                        </Tabs.Tab>
                                    ))}
                                </Tabs.List>
                            </Tabs>
                        </Stack>
                    </Grid.Col>
                </Grid>

                <Divider className="border-mine-shaft-800! my-8!" />

                <Group justify="space-between">
                    <Group gap="xl!">
                        <Menu shadow="xl" width={200} radius="xl">
                            <Menu.Target>
                                <Button
                                    variant="subtle"
                                    color="gray"
                                    leftSection={<IconArrowsSort size={16} />}
                                    className="text-mine-shaft-400! hover:bg-mine-shaft-800! font-black! uppercase! tracking-widest! text-[10px]!"
                                >
                                    Sort: {sortBy === 'recent' ? 'Most Recent' : 'Alphabetical'}
                                </Button>
                            </Menu.Target>
                            <Menu.Dropdown className="bg-mine-shaft-900 border-mine-shaft-800">
                                <Menu.Item onClick={() => setSortBy('recent')} className="font-bold text-[10px] uppercase tracking-widest">Most Recent</Menu.Item>
                                <Menu.Item onClick={() => setSortBy('name')} className="font-bold text-[10px] uppercase tracking-widest">Alphabetical</Menu.Item>
                            </Menu.Dropdown>
                        </Menu>
                    </Group>
                    <Text size="xs" fw={900} className="text-mine-shaft-500! uppercase! tracking-[0.2em]! italic!">
                        Found <span className="text-white!">{filteredApps.length}</span> candidates in <span className="text-bright-sun-400!">{activeTab}</span>
                    </Text>
                </Group>
            </Card>

            {/* Dense Result Grid */}
            {filteredApps.length > 0 ? (
                <Grid gutter="3rem!">
                    {filteredApps.map(applicant => (
                        <Grid.Col key={applicant.id} span={{ base: 12, sm: 6, md: 4, xl: 3 }}>
                            <ApplicantCard applicant={applicant} />
                        </Grid.Col>
                    ))}
                </Grid>
            ) : (
                <Stack align="center" justify="center" className="py-32! bg-mine-shaft-900/10! border-2! border-dashed! border-mine-shaft-800/50! rounded-[4rem]! backdrop-blur-sm!">
                    <div className="w-24! h-24! bg-mine-shaft-800/30! rounded-full! flex! items-center! justify-center! mb-8! border! border-mine-shaft-700!">
                        <IconSearch size={48} className="text-mine-shaft-600!" />
                    </div>
                    <Text size="2xl" fw={900} className="text-white! uppercase! tracking-[0.3em]!">No ResultsFound</Text>
                    <Text size="sm" className="text-mine-shaft-500! font-black! uppercase! tracking-widest!">We couldn't find any candidates matching your criteria</Text>
                    <Button
                        variant="light"
                        color="yellow"
                        radius="xl"
                        mt="xl!"
                        onClick={() => { setSearchQuery(''); setActiveTab(ApplicationStatuses.APPLIED); }}
                        className="bg-bright-sun-400/10! text-bright-sun-400! border! border-bright-sun-400/20! uppercase! tracking-widest! font-black!"
                    >
                        Reset Search
                    </Button>
                </Stack>
            )}

            {/* Applicant Detail Modal - Full Overhaul */}
            <Modal
                opened={modalOpened}
                onClose={() => setModalOpened(false)}
                title={
                    <Group gap="lg">
                        <Avatar src={selectedApplicant?.avatar} size="xl" color="bright-sun" variant="filled" className="border-4! border-bright-sun-400! shadow-xl! shadow-bright-sun-400/20!">
                            {(selectedApplicant?.fullName || "A").charAt(0)}
                        </Avatar>
                        <div>
                            <Text size="2xl" fw={900} className="text-white uppercase tracking-tighter leading-tight">
                                {selectedApplicant?.fullName}
                            </Text>
                            <Group gap="xs">
                                <Badge variant="filled" color="bright-sun" className="text-mine-shaft-950 font-black uppercase tracking-widest text-[9px]">
                                    {selectedApplicant?.status}
                                </Badge>
                                <Text size="xs" fw={700} className="text-mine-shaft-500 uppercase tracking-widest">
                                    Member since Feb 2026
                                </Text>
                            </Group>
                        </div>
                    </Group>
                }
                size="xl"
                radius="4rem"
                padding="3rem"
                styles={{
                    header: { backgroundColor: '#0A0A0A', borderBottom: '1px solid #1A1A1A', paddingBottom: '3rem' },
                    content: { backgroundColor: '#0A0A0A' },
                    close: { color: '#666', transform: 'scale(1.5)', marginTop: '-1rem' }
                }}
            >
                {selectedApplicant && (
                    <Stack gap="3rem!" py="xl">
                        <Grid gutter="3rem!">
                            <Grid.Col span={{ base: 12, md: 5 }}>
                                <Stack gap="2rem!">
                                    <div className="bg-mine-shaft-900/50! p-8! rounded-[2.5rem]! border! border-mine-shaft-800! hover:border-bright-sun-400/20! transition-all! relative! overflow-hidden! group!">
                                        <div className="absolute top-0 right-0 w-32 h-32 bg-bright-sun-400/5 rounded-full -mr-16 -mt-16 blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
                                        <Text size="xs" fw={900} className="text-mine-shaft-500! uppercase! tracking-[0.3em]! mb-6! block!">Contact Hub</Text>
                                        <Stack gap="xl!">
                                            <Group gap="lg!">
                                                <div className="p-3 bg-bright-sun-400/10 rounded-2xl border border-bright-sun-400/20">
                                                    <IconMail size={24} className="text-bright-sun-400!" />
                                                </div>
                                                <div>
                                                    <Text size="xs" fw={800} className="text-mine-shaft-500 uppercase tracking-widest">Email Address</Text>
                                                    <Text size="md" fw={700} className="text-white!">{selectedApplicant.email}</Text>
                                                </div>
                                            </Group>
                                            <Group gap="lg!">
                                                <div className="p-3 bg-bright-sun-400/10 rounded-2xl border border-bright-sun-400/20">
                                                    <IconPhone size={24} className="text-bright-sun-400!" />
                                                </div>
                                                <div>
                                                    <Text size="xs" fw={800} className="text-mine-shaft-500 uppercase tracking-widest">Phone Number</Text>
                                                    <Text size="md" fw={700} className="text-white!">{selectedApplicant.phone}</Text>
                                                </div>
                                            </Group>
                                        </Stack>
                                    </div>

                                    <div className="bg-mine-shaft-900/50! p-8! rounded-[2.5rem]! border! border-mine-shaft-800! hover:border-bright-sun-400/20! transition-all!">
                                        <Text size="xs" fw={900} className="text-mine-shaft-500! uppercase! tracking-[0.3em]! mb-6! block!">Experience Stats</Text>
                                        <Group gap="xl!">
                                            <Stack gap={2}>
                                                <Text size="xs" fw={800} className="text-mine-shaft-500 uppercase tracking-widest">Job Role</Text>
                                                <Text size="sm" fw={800} className="text-white!">{selectedApplicant.jobTitle}</Text>
                                            </Stack>
                                            <Divider orientation="vertical" color="mine-shaft.8" />
                                            <Stack gap={2}>
                                                <Text size="xs" fw={800} className="text-mine-shaft-500 uppercase tracking-widest">Applied</Text>
                                                <Text size="sm" fw={800} className="text-white!">{selectedApplicant.appliedDate}</Text>
                                            </Stack>
                                        </Group>
                                    </div>
                                </Stack>
                            </Grid.Col>

                            <Grid.Col span={{ base: 12, md: 7 }}>
                                <div className="bg-mine-shaft-900/50! p-10! rounded-[2.5rem]! border! border-mine-shaft-800! h-full! relative! group! flex! flex-col!">
                                    <div className="absolute bottom-10 right-10 p-4 opacity-5 group-hover:opacity-20 transition-all">
                                        <IconFileText size={180} className="text-bright-sun-400" />
                                    </div>
                                    <Text size="xs" fw={900} className="text-mine-shaft-500! uppercase! tracking-[0.3em]! mb-8! block!">Statement of Purpose</Text>
                                    <Text size="lg" className="text-mine-shaft-200! leading-relaxed! font-medium! italic! relative! z-10!">
                                        "{selectedApplicant.coverLetter || "The candidate has demonstrated strong interest in the role through their profile presentation, although no specific cover letter was attached to this application."}"
                                    </Text>
                                    <div className="mt-auto! pt-8! flex! justify-end! relative! z-10!">
                                        <Text size="xs" fw={900} className="text-bright-sun-400! uppercase! tracking-widest!">Verified Candidate • 100% Signal Match</Text>
                                    </div>
                                </div>
                            </Grid.Col>
                        </Grid>

                        <div className="bg-mine-shaft-950! p-8! rounded-[3rem]! border! border-mine-shaft-800! shadow-2xl!">
                            <Group justify="center" gap="2rem!">
                                <Button
                                    size="xl"
                                    radius="2rem"
                                    leftSection={<IconCheck size={24} />}
                                    onClick={() => handleStatusUpdate(selectedApplicant.id, ApplicationStatuses.HIRED)}
                                    className="bg-teal-400! text-mine-shaft-950! hover:bg-teal-500! font-black! uppercase! tracking-[0.2em]! px-12! h-20! shadow-2xl! shadow-teal-500/30! transition-transform! hover:scale-105!"
                                >
                                    Hire Now
                                </Button>
                                <Button
                                    size="xl"
                                    radius="2rem"
                                    leftSection={<IconX size={24} />}
                                    onClick={() => handleStatusUpdate(selectedApplicant.id, ApplicationStatuses.REJECTED)}
                                    className="bg-red-500! text-white! hover:bg-red-600! font-black! uppercase! tracking-[0.2em]! px-12! h-20! shadow-2xl! shadow-red-500/30! transition-transform! hover:scale-105!"
                                >
                                    Reject Application
                                </Button>
                                <Menu shadow="2xl" width={280} position="top" transitionProps={{ transition: 'slide-up' }}>
                                    <Menu.Target>
                                        <Button
                                            variant="outline"
                                            color="yellow"
                                            size="xl"
                                            radius="2rem"
                                            rightSection={<IconChevronDown size={20} />}
                                            className="border-2! border-bright-sun-400! text-bright-sun-400! hover:bg-bright-sun-400/5! font-black! uppercase! tracking-[0.2em]! px-12! h-20!"
                                        >
                                            Transition Status
                                        </Button>
                                    </Menu.Target>
                                    <Menu.Dropdown className="bg-mine-shaft-900! border-mine-shaft-800! p-3! rounded-4xl! mb-4!">
                                        <Menu.Label className="uppercase font-black text-[10px] tracking-[0.3em] mb-3 px-4 text-center">Select Pipeline Stage</Menu.Label>
                                        {columns.map(col => (
                                            <Menu.Item
                                                key={col.status}
                                                onClick={() => handleStatusUpdate(selectedApplicant.id, col.status)}
                                                leftSection={col.icon}
                                                className={`font-black! uppercase! text-xs! tracking-widest! rounded-3xl! py-4! px-6! transition-all! mb-1! ${activeTab === col.status ? 'bg-mine-shaft-800! text-bright-sun-400!' : 'text-mine-shaft-300! hover:bg-mine-shaft-800!'
                                                    }`}
                                            >
                                                Move to {col.title}
                                            </Menu.Item>
                                        ))}
                                    </Menu.Dropdown>
                                </Menu>
                            </Group>
                        </div>
                    </Stack>
                )}
            </Modal>
        </div>
    );
};

export default ApplicantPipeline;
