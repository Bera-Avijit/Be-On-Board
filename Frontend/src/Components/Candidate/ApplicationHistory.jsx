import React, { useState, useEffect } from 'react';
import {
    Table,
    Text,
    Group,
    Badge,
    ActionIcon,
    Modal,
    Button,
    Card,
    Avatar,
    Tooltip
} from '@mantine/core';
import {
    IconEye,
    IconTrash,
    IconBriefcase,
    IconCalendar,
    IconCircleCheck,
    IconCircleX,
    IconClock,
    IconSearch
} from '@tabler/icons-react';
import { getApplications, deleteApplication, ApplicationStatuses } from '../../Data/ApplicationData';

const ApplicationHistory = () => {
    const [applications, setApplications] = useState([]);
    const [deleteModalOpened, setDeleteModalOpened] = useState(false);
    const [selectedAppId, setSelectedAppId] = useState(null);

    // Mocking logged-in user email
    const currentUserEmail = 'avijit@example.com';

    useEffect(() => {
        const allApps = getApplications();
        const myApps = allApps.filter(app => app.email === currentUserEmail);
        setApplications(myApps);
    }, []);

    const handleWithdraw = () => {
        if (selectedAppId) {
            const updated = deleteApplication(selectedAppId);
            setApplications(updated.filter(app => app.email === currentUserEmail));
            setDeleteModalOpened(false);
            setSelectedAppId(null);
        }
    };

    const getStatusStyle = (status) => {
        switch (status) {
            case ApplicationStatuses.HIRED:
                return { color: 'green', icon: <IconCircleCheck size={16} /> };
            case ApplicationStatuses.REJECTED:
                return { color: 'red', icon: <IconCircleX size={16} /> };
            case ApplicationStatuses.INTERVIEW:
                return { color: 'orange', icon: <IconCalendar size={16} /> };
            case ApplicationStatuses.SHORTLISTED:
                return { color: 'teal', icon: <IconSearch size={16} /> };
            default:
                return { color: 'blue', icon: <IconClock size={16} /> };
        }
    };

    const rows = applications.map((app) => {
        const { color, icon } = getStatusStyle(app.status);
        return (
            <Table.Tr key={app.id} className="hover:bg-mine-shaft-900/40 transition-colors">
                <Table.Td>
                    <Group gap="sm">
                        <div className="p-2 bg-bright-sun-400/10 rounded-xl border border-bright-sun-400/20">
                            <IconBriefcase size={20} className="text-bright-sun-400" />
                        </div>
                        <div>
                            <Text size="sm" fw={800} className="text-white uppercase tracking-tight">{app.jobTitle}</Text>
                            <Text size="xs" className="text-mine-shaft-400 font-bold italic">{app.company}</Text>
                        </div>
                    </Group>
                </Table.Td>
                <Table.Td>
                    <Text size="xs" fw={700} className="text-mine-shaft-300 uppercase tracking-widest">
                        {app.appliedDate}
                    </Text>
                </Table.Td>
                <Table.Td>
                    <Badge
                        variant="light"
                        color={color}
                        size="md"
                        radius="md"
                        leftSection={icon}
                        className={`bg-${color}-400/10! text-${color}-400! border border-${color}-400/20! py-3! font-black uppercase tracking-wider`}
                    >
                        {app.status}
                    </Badge>
                </Table.Td>
                <Table.Td>
                    <Group gap="xs" justify="flex-end">
                        <Tooltip label="Withdraw Application">
                            <ActionIcon
                                variant="subtle"
                                color="red"
                                onClick={() => {
                                    setSelectedAppId(app.id);
                                    setDeleteModalOpened(true);
                                }}
                                className="hover:bg-red-400/10!"
                            >
                                <IconTrash size={18} />
                            </ActionIcon>
                        </Tooltip>
                    </Group>
                </Table.Td>
            </Table.Tr>
        );
    });

    return (
        <div className="mt-12! mb-12!">
            {applications.length > 0 ? (
                <Card className="bg-mine-shaft-900/30! border-mine-shaft-800! rounded-3xl! p-0! overflow-hidden!">
                    <Table verticalSpacing="xl" className="px-6!">
                        <Table.Thead className="bg-mine-shaft-900/80! border-b! border-mine-shaft-800!">
                            <Table.Tr>
                                <Table.Th className="text-mine-shaft-500! uppercase! tracking-widest! text-[10px]! font-black! border-none! px-8! py-6!">Role & Company</Table.Th>
                                <Table.Th className="text-mine-shaft-500! uppercase! tracking-widest! text-[10px]! font-black! border-none! py-6!">Date Applied</Table.Th>
                                <Table.Th className="text-mine-shaft-500! uppercase! tracking-widest! text-[10px]! font-black! border-none! py-6!">Status</Table.Th>
                                <Table.Th className="text-right! text-mine-shaft-500! uppercase! tracking-widest! text-[10px]! font-black! border-none! px-8! py-6!">Actions</Table.Th>
                            </Table.Tr>
                        </Table.Thead>
                        <Table.Tbody className="divide-y! divide-mine-shaft-900!">
                            {applications.map((app) => {
                                const { color, icon } = getStatusStyle(app.status);
                                return (
                                    <Table.Tr key={app.id} className="hover:bg-mine-shaft-900/50! transition-colors! group!">
                                        <Table.Td className="px-8! py-6!">
                                            <Group gap="lg!">
                                                <div className="p-3! bg-bright-sun-400/10! rounded-xl! border! border-bright-sun-400/20! shadow-lg! group-hover:scale-110! transition-transform!">
                                                    <IconBriefcase size={24} className="text-bright-sun-400!" />
                                                </div>
                                                <div>
                                                    <Text size="md" fw={800} className="text-white! uppercase! tracking-tight! mb-1!">{app.jobTitle}</Text>
                                                    <Text size="xs" className="text-mine-shaft-400! font-bold! italic!">{app.company}</Text>
                                                </div>
                                            </Group>
                                        </Table.Td>
                                        <Table.Td className="py-6!">
                                            <Text size="sm" fw={700} className="text-mine-shaft-300! uppercase! tracking-widest!">
                                                {app.appliedDate}
                                            </Text>
                                        </Table.Td>
                                        <Table.Td className="py-6!">
                                            <Badge
                                                variant="light"
                                                color={color}
                                                size="lg"
                                                radius="md"
                                                leftSection={icon}
                                                className={`bg-${color}-400/10! text-${color}-400! border! border-${color}-400/20! py-4! px-5! font-black! uppercase! tracking-wider! shadow-md!`}
                                            >
                                                {app.status}
                                            </Badge>
                                        </Table.Td>
                                        <Table.Td className="px-8! py-6!">
                                            <Group gap="md!" justify="flex-end!">
                                                <Tooltip label="Withdraw Application">
                                                    <ActionIcon
                                                        variant="subtle"
                                                        color="red"
                                                        onClick={() => {
                                                            setSelectedAppId(app.id);
                                                            setDeleteModalOpened(true);
                                                        }}
                                                        className="hover:bg-red-400/10!"
                                                    >
                                                        <IconTrash size={18} />
                                                    </ActionIcon>
                                                </Tooltip>
                                            </Group>
                                        </Table.Td>
                                    </Table.Tr>
                                );
                            })}
                        </Table.Tbody>
                    </Table>
                </Card>
            ) : (
                <Card className="bg-mine-shaft-900/20! border-mine-shaft-800! rounded-[2.5rem]! p-16! text-center! border-dashed!">
                    <Text className="text-mine-shaft-500! italic! mb-4!">You haven't applied for any jobs yet.</Text>
                    <Button
                        variant="light"
                        color="yellow"
                        radius="xl"
                        onClick={() => window.location.href = '/find-jobs'}
                        className="bg-bright-sun-400/10! text-bright-sun-400! border! border-bright-sun-400/20!"
                    >
                        Explore Jobs
                    </Button>
                </Card>
            )}

            <Modal
                opened={deleteModalOpened}
                onClose={() => setDeleteModalOpened(false)}
                title={<Text fw={900} className="text-white uppercase">Withdraw Application?</Text>}
                centered
                radius="xl"
                styles={{
                    content: { backgroundColor: '#0D0D0D' },
                    header: { backgroundColor: '#0D0D0D', borderBottom: '1px solid #1C1C1C' }
                }}
            >
                <Text size="sm" className="text-mine-shaft-300 mb-6 font-medium">
                    Are you sure you want to withdraw your application? This action cannot be undone and your details will be removed from the recruiter's pipeline.
                </Text>
                <Group justify="flex-end" gap="md">
                    <Button variant="subtle" color="gray" onClick={() => setDeleteModalOpened(false)} radius="xl">Cancel</Button>
                    <Button color="red" onClick={handleWithdraw} radius="xl">Confirm Withdraw</Button>
                </Group>
            </Modal>
        </div>
    );
};

export default ApplicationHistory;
