import { Container, Text, Title, Grid, Card, Group, Stack, Badge, Box, Divider } from '@mantine/core';
import { IconBriefcase, IconUsers, IconFileText, IconTrendingUp, IconArrowUpRight } from '@tabler/icons-react';
import ApplicantPipeline from '../Components/Recruiter/ApplicantPipeline';
import { getApplications } from '../Data/ApplicationData';

const RecruiterDashboard = () => {
    const apps = getApplications();
    const stats = [
        { label: 'Active Jobs', value: '12', icon: IconBriefcase, color: 'blue', increase: '+2' },
        { label: 'Total Applicants', value: apps.length.toString(), icon: IconUsers, color: 'bright-sun', increase: '+15%' },
        { label: 'New Today', value: '4', icon: IconFileText, color: 'teal', increase: '+2' },
    ];

    return (
        <Container size="xl" className="py-16! min-h-screen!">
            {/* Header Section */}
            <Box mb="5rem!">
                <Group justify="space-between" align="flex-end">
                    <Stack gap={0}>
                        <Group gap="sm">
                            <IconTrendingUp size={20} className="text-bright-sun-400" />
                            <Text size="xs" fw={900} className="text-mine-shaft-500 uppercase tracking-[0.4em]">Recruitment Hub</Text>
                        </Group>
                        <Title order={1} className="text-white! uppercase! tracking-tighter! text-5xl! mt-2!">
                            Dashboard <span className="text-bright-sun-400">Overview</span>
                        </Title>
                    </Stack>
                    <Badge variant="outline" color="bright-sun" size="xl" radius="xl" className="border-2! font-black! px-8! h-12! uppercase! tracking-widest!">
                        Recruiter Mode
                    </Badge>
                </Group>
                <Text size="md" className="text-mine-shaft-400! mt-4! font-medium! max-w-xl!">
                    Manage your hiring pipeline with precision. Track, shortlist, and hire the best talent on the platform.
                </Text>
            </Box>

            {/* Stats Grid */}
            <Grid mb="6rem!" gutter="3rem!">
                {stats.map((stat) => (
                    <Grid.Col key={stat.label} span={{ base: 12, sm: 4 }}>
                        <Card className="bg-mine-shaft-900/40! border! border-mine-shaft-800! rounded-[2.5rem]! p-10! backdrop-blur-xl! shadow-2xl! hover:border-bright-sun-400/50! transition-all! group!">
                            <Group justify="space-between" mb="2xl!" align="flex-start">
                                <div className={`p-5! bg-${stat.color === 'bright-sun' ? 'bright-sun-400' : stat.color + '-400'}/10! rounded-3xl! border! border-${stat.color === 'bright-sun' ? 'bright-sun-400' : stat.color + '-400'}/20! shadow-lg! max-w-max!`}>
                                    <stat.icon size={42} className={stat.color === 'bright-sun' ? 'text-bright-sun-400!' : `text-${stat.color}-400!`} />
                                </div>
                                <Group gap={8} className="bg-mine-shaft-950/50! px-5! py-2! rounded-full! border! border-mine-shaft-800!">
                                    <Text size="sm" fw={900} className="text-teal-400!">{stat.increase}</Text>
                                    <IconArrowUpRight size={16} className="text-teal-400!" />
                                </Group>
                            </Group>

                            <Stack gap={6}>
                                <Text size="md" fw={900} className="text-mine-shaft-500! uppercase! tracking-[0.2em]!">
                                    {stat.label}
                                </Text>
                                <Text size="6xl" fw={900} className="text-white! tracking-tighter!">
                                    {stat.value}
                                </Text>
                            </Stack>

                            {/* Decorative element */}
                            <div className={`absolute bottom-0 right-0 w-32 h-2 bg-${stat.color === 'bright-sun' ? 'bright-sun-400' : stat.color + '-400'}/30! rounded-full m-8 group-hover:w-full group-hover:m-0 group-hover:rounded-none transition-all duration-700`}></div>
                        </Card>
                    </Grid.Col>
                ))}
            </Grid>

            {/* Pipeline Section */}
            <div className="mb-12!">
                <Group gap="xl" align="center">
                    <Text size="3xl" fw={900} className="text-white! uppercase! tracking-tight! flex! items-center! gap-5!">
                        <div className="w-4! h-12! bg-bright-sun-400! rounded-full! shadow-[0_0_20px_rgba(250,230,45,0.4)]!"></div>
                        Applicant Pipeline
                    </Text>
                    <Divider className="flex-1! border-mine-shaft-800! opacity-30!" />
                    <Badge variant="filled" color="bright-sun" size="xl" radius="xl" className="text-mine-shaft-950! font-black! px-8! py-6! text-sm!">
                        Live Tracking
                    </Badge>
                </Group>
            </div>

            <ApplicantPipeline />
        </Container>
    );
};

export default RecruiterDashboard;
