import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
  Tooltip,
  TextInput,
  Textarea,
  Image,
  Stack,
  Stepper,
  Divider,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { keyframes } from "@emotion/react";
import {
  IconEye,
  IconTrash,
  IconBriefcase,
  IconCalendar,
  IconCircleCheck,
  IconCircleX,
  IconClock,
  IconSearch,
  IconEdit,
  IconBookmark,
  IconArrowRight,
  IconMessageDots,
} from "@tabler/icons-react";
import {
  getApplications,
  deleteApplication,
  ApplicationStatuses,
  getSavedJobs,
} from "../../Data/ApplicationData";
import { JOBS_DATA } from "../../Data/JobsData";

const glowDim = keyframes`
  0% { transform: scale(1); opacity: 0.7; box-shadow: 0 0 0px rgba(250, 230, 45, 0); }
  50% { transform: scale(1.1); opacity: 1; box-shadow: 0 0 15px rgba(250, 230, 45, 0.4); }
  100% { transform: scale(1); opacity: 0.7; box-shadow: 0 0 0px rgba(250, 230, 45, 0); }
`;

const ApplicationHistory = ({ filterType = "applied" }) => {
  const [applications, setApplications] = useState([]);
  const [deleteModalOpened, setDeleteModalOpened] = useState(false);
  const [reviewModalOpened, setReviewModalOpened] = useState(false);
  const [selectedApp, setSelectedApp] = useState(null);
  const [selectedAppId, setSelectedAppId] = useState(null);
  const isMobile = useMediaQuery("(max-width: 768px)");
  const navigate = useNavigate();

  // Mocking logged-in user email
  const currentUserEmail = "avijit@example.com";

  const fetchApplications = () => {
    const allApps = getApplications();
    let filteredApps = allApps.filter((app) => app.email === currentUserEmail);

    if (filterType === "active") {
      filteredApps = filteredApps.filter(
        (app) =>
          app.status === ApplicationStatuses.APPLIED ||
          app.status === ApplicationStatuses.SHORTLISTED ||
          app.status === ApplicationStatuses.INTERVIEW,
      );
    } else if (filterType === "completed") {
      filteredApps = filteredApps.filter(
        (app) =>
          app.status === ApplicationStatuses.HIRED ||
          app.status === ApplicationStatuses.REJECTED,
      );
    } else if (filterType === "saved") {
      const savedJobIds = getSavedJobs();
      filteredApps = savedJobIds
        .map((jobId) => {
          const jobData = JOBS_DATA.find((j) => String(j.id) === String(jobId));
          if (jobData) {
            return {
              id: `saved-${jobId}`,
              jobId: jobId,
              jobTitle: jobData.jobTitle,
              company: jobData.company,
              status: "Saved",
              appliedDate: "Not Applied",
              email: currentUserEmail,
            };
          }
          return null;
        })
        .filter(Boolean);
    }

    setApplications(filteredApps);
  };

  useEffect(() => {
    fetchApplications();
  }, [filterType]);

  const handleWithdraw = () => {
    if (selectedAppId) {
      deleteApplication(selectedAppId);
      // Re-fetch to guarantee sync
      fetchApplications();
      setDeleteModalOpened(false);
      setSelectedAppId(null);
    }
  };

  const getJobLogo = (app) => {
    const job = JOBS_DATA.find(
      (j) => String(j.id) === String(app.jobId) || j.company === app.company,
    );
    return job ? job.logoUrl : "https://via.placeholder.com/48";
  };

  const getStatusStyle = (status) => {
    if (status === "Saved") {
      return { color: "blue", icon: <IconBookmark size={16} /> };
    }
    switch (status) {
      case ApplicationStatuses.HIRED:
        return { color: "green", icon: <IconCircleCheck size={16} /> };
      case ApplicationStatuses.REJECTED:
        return { color: "red", icon: <IconCircleX size={16} /> };
      case ApplicationStatuses.INTERVIEW:
        return { color: "orange", icon: <IconCalendar size={16} /> };
      case ApplicationStatuses.SHORTLISTED:
        return { color: "teal", icon: <IconSearch size={16} /> };
      default:
        return { color: "blue", icon: <IconClock size={16} /> };
    }
  };

  const rows = applications.map((app) => {
    const { color, icon } = getStatusStyle(app.status);
    return (
      <Table.Tr
        key={app.id}
        className="hover:bg-mine-shaft-900/40 transition-colors"
      >
        <Table.Td>
          <Group gap="sm">
            <div className="p-2 bg-bright-sun-400/10 rounded-xl border border-bright-sun-400/20">
              <IconBriefcase size={20} className="text-bright-sun-400" />
            </div>
            <div>
              <Text
                size="sm"
                fw={800}
                className="text-white uppercase tracking-tight"
              >
                {app.jobTitle}
              </Text>
              <Text size="xs" className="text-mine-shaft-400 font-bold italic">
                {app.company}
              </Text>
            </div>
          </Group>
        </Table.Td>
        <Table.Td>
          <Text
            size="xs"
            fw={700}
            className="text-mine-shaft-300 uppercase tracking-widest"
          >
            {app.appliedDate}
          </Text>
        </Table.Td>
        <Table.Td>
          <div className="flex justify-center items-center h-full!">
            <div className="relative">
              {app.status !== ApplicationStatuses.HIRED &&
                app.status !== ApplicationStatuses.REJECTED && (
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-bright-sun-400 rounded-full animate-ping opacity-75"></div>
                )}
              <Badge
                variant="light"
                color={color}
                size="lg"
                radius="md"
                leftSection={icon}
                className={`bg-${color}-400/10! text-${color}-400! border! border-${color}-400/20! py-4! px-5! font-black! uppercase! tracking-wider! shadow-md! flex! items-center! justify-center!`}
              >
                {app.status}
              </Badge>
            </div>
          </div>
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
                <Table.Th className="text-mine-shaft-500! uppercase! tracking-widest! text-[10px]! font-black! border-none! px-8! py-6!">
                  Role & Company
                </Table.Th>
                <Table.Th className="text-mine-shaft-500! uppercase! tracking-widest! text-[10px]! font-black! border-none! py-6! text-center!">
                  {filterType === "saved" ? "Saved Date" : "Date Applied"}
                </Table.Th>
                <Table.Th className="text-mine-shaft-500! uppercase! tracking-widest! text-[10px]! font-black! border-none! py-6! text-center!">
                  Application Status
                </Table.Th>
                <Table.Th className="text-right! text-mine-shaft-500! uppercase! tracking-widest! text-[10px]! font-black! border-none! px-8! py-6!">
                  Manage
                </Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody className="divide-y! divide-mine-shaft-900!">
              {applications.map((app) => {
                const { color, icon } = getStatusStyle(app.status);
                return (
                  <Table.Tr
                    key={app.id}
                    className="hover:bg-mine-shaft-900/50! transition-colors! group!"
                  >
                    <Table.Td className="px-8! py-6!">
                      <Group gap="lg!">
                        <div className="w-12! h-12! p-2! bg-white/5! rounded-xl! border! border-mine-shaft-700/50! shadow-lg! group-hover:scale-110! transition-transform! flex! items-center! justify-center!">
                          <Image
                            src={getJobLogo(app)}
                            fit="contain"
                            fallbackSrc="https://via.placeholder.com/48"
                            alt={app.company}
                          />
                        </div>
                        <div>
                          <Text
                            size="md"
                            fw={800}
                            className="text-white! uppercase! tracking-tight! mb-1!"
                          >
                            {app.jobTitle}
                          </Text>
                          <Text
                            size="xs"
                            className="text-mine-shaft-400! font-bold! italic! uppercase! tracking-widest!"
                          >
                            {app.company}
                          </Text>
                        </div>
                      </Group>
                    </Table.Td>
                    <Table.Td className="py-8! text-center!">
                      <Text
                        size="sm"
                        fw={800}
                        className="text-white! uppercase! tracking-[0.2em]!"
                      >
                        {app.appliedDate}
                      </Text>
                    </Table.Td>
                    <Table.Td className="py-6!">
                      <div className="flex justify-center items-center h-full!">
                        <Badge
                          variant="light"
                          color={color}
                          size="lg"
                          radius="md"
                          leftSection={icon}
                          className={`bg-${color}-400/10! text-${color}-400! border! border-${color}-400/20! py-4! px-5! font-black! uppercase! tracking-wider! shadow-md! flex! items-center! justify-center!`}
                        >
                          {app.status}
                        </Badge>
                      </div>
                    </Table.Td>
                    <Table.Td className="py-6! relative!">
                      <div className="absolute mr-8! right-0! top-1/2! -translate-y-1/2!">
                        <Group gap="md!" className="flex-row-reverse!">
                          {filterType === "saved" ? (
                            <Tooltip label="View Job Details">
                              <ActionIcon
                                variant="subtle"
                                color="bright-sun"
                                onClick={() =>
                                  (window.location.href = `/job-details/${app.jobId}`)
                                }
                                className="hover:bg-bright-sun-400/10!"
                              >
                                <IconBriefcase size={18} />
                              </ActionIcon>
                            </Tooltip>
                          ) : (
                            <>
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

                              {app.status !== "Saved" && (
                                <Tooltip label="Track Application Flow">
                                  <ActionIcon
                                    variant="subtle"
                                    color="teal"
                                    onClick={() => {
                                      setSelectedApp(app);
                                      setReviewModalOpened(true);
                                    }}
                                    className="hover:bg-teal-400/10! relative"
                                  >
                                    <IconMessageDots size={18} />
                                    <div className="absolute top-0 right-0 w-2 h-2 bg-teal-400 rounded-full border border-mine-shaft-950"></div>
                                  </ActionIcon>
                                </Tooltip>
                              )}

                              {app.status === ApplicationStatuses.APPLIED && (
                                <Tooltip label="Edit Application">
                                  <ActionIcon
                                    variant="subtle"
                                    color="blue"
                                    onClick={() => {
                                      let targetJobId = app.jobId;
                                      if (!targetJobId) {
                                        // Fallback resolution if jobId was missed in storage
                                        const resolved = JOBS_DATA.find(
                                          (j) =>
                                            j.jobTitle === app.jobTitle &&
                                            j.company === app.company,
                                        );
                                        targetJobId = resolved?.id || "unknown";
                                      }
                                      navigate(
                                        `/apply-job/${targetJobId}?appId=${app.id}`,
                                      );
                                    }}
                                    className="hover:bg-blue-400/10!"
                                  >
                                    <IconEdit size={18} />
                                  </ActionIcon>
                                </Tooltip>
                              )}
                            </>
                          )}
                        </Group>
                      </div>
                    </Table.Td>
                  </Table.Tr>
                );
              })}
            </Table.Tbody>
          </Table>
        </Card>
      ) : (
        <Card className="bg-mine-shaft-900/20! border-mine-shaft-800! rounded-[2.5rem]! p-16! text-center! border-dashed!">
          <Text className="text-mine-shaft-500! italic! mb-4!">
            {filterType === "saved"
              ? "You haven't saved any jobs yet."
              : filterType === "completed"
                ? "Your completed application history will appear here."
                : "No active applications found. Start your journey today!"}
          </Text>
          <Button
            variant="light"
            color="yellow"
            radius="xl"
            onClick={() => (window.location.href = "/find-jobs")}
            className="bg-bright-sun-400/10! text-bright-sun-400! border! border-bright-sun-400/20!"
          >
            Explore Jobs
          </Button>
        </Card>
      )}

      <Modal
        opened={deleteModalOpened}
        onClose={() => setDeleteModalOpened(false)}
        title={
          <Text fw={900} className="text-white uppercase">
            Withdraw Application?
          </Text>
        }
        centered
        radius="xl"
        styles={{
          content: { backgroundColor: "#0D0D0D" },
          header: {
            backgroundColor: "#0D0D0D",
            borderBottom: "1px solid #1C1C1C",
          },
        }}
      >
        <Text size="sm" className="text-mine-shaft-300 mb-6 font-medium">
          Are you sure you want to withdraw your application? This action cannot
          be undone and your details will be removed from the recruiter's
          pipeline.
        </Text>
        <Group justify="flex-end" gap="md">
          <Button
            variant="subtle"
            color="gray"
            onClick={() => setDeleteModalOpened(false)}
            radius="xl"
          >
            Cancel
          </Button>
          <Button color="red" onClick={handleWithdraw} radius="xl">
            Confirm Withdraw
          </Button>
        </Group>
      </Modal>

      {/* 📜 Recruitment Journey / Feedback Modal */}
      <Modal
        opened={reviewModalOpened}
        onClose={() => setReviewModalOpened(false)}
        title={
          <div className="flex flex-col gap-1">
            <Text
              fw={900}
              className="text-white! uppercase! tracking-widest! text-lg!"
            >
              Live Application{" "}
              <span className="text-bright-sun-400">Tracker</span>
            </Text>
            <Text
              size="xs"
              className="text-mine-shaft-500! font-bold! uppercase! tracking-[0.2em]!"
            >
              ID: {selectedApp?.id || "N/A"}
            </Text>
          </div>
        }
        centered
        radius="xl"
        size="lg"
        padding="xl"
        styles={{
          content: {
            backgroundColor: "#0D0D0D",
            border: "1px solid #2a2a2a",
            borderRadius: "2rem",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          },
          header: {
            backgroundColor: "#0D0D0D",
            borderBottom: "1px solid #1C1C1C",
          },
          body: {
            paddingTop: "0.5rem",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            "&::-webkit-scrollbar": { display: "none" },
          },
        }}
        classNames={{
          body: "scrollbar-hide [&::-webkit-scrollbar]:hidden!",
          content: "scrollbar-hide [&::-webkit-scrollbar]:hidden!",
        }}
      >
        <Stack gap="xl">
          {/* Main Journey Stepper */}
          <div className="bg-mine-shaft-900/60! p-6! md:p-10! rounded-[2rem]! md:rounded-[2.5rem]! border! border-mine-shaft-800! shadow-inner!">
            <Stepper
              orientation={isMobile ? "vertical" : "horizontal"}
              active={
                selectedApp?.status === ApplicationStatuses.REJECTED
                  ? -1
                  : selectedApp?.status === ApplicationStatuses.HIRED
                    ? 4
                    : selectedApp?.status === ApplicationStatuses.INTERVIEW
                      ? 3
                      : selectedApp?.status === ApplicationStatuses.SHORTLISTED
                        ? 2
                        : 1
              }
              color="bright-sun"
              size="md"
              allowNextStepsSelect={false}
              styles={{
                stepIcon: {
                  transition: "all 0.3s ease",
                  border: "2px solid #1C1C1C!",
                },
                stepCompletedIcon: { color: "#000!" },
                separator: { backgroundColor: "#1C1C1C!" },
                separatorActive: { backgroundColor: "#2D9E64!" },
              }}
              classNames={{
                step: "transition-all!",
                stepIcon: "bg-mine-shaft-950!",
                stepLabel:
                  "text-white! font-black! uppercase! tracking-widest! text-[10px]!",
                stepDescription:
                  "text-mine-shaft-500! font-bold! uppercase! text-[8px]! tracking-widest!",
              }}
            >
              <Stepper.Step
                label="Applied"
                description="Submitted"
                styles={{
                  stepIcon: {
                    backgroundColor:
                      selectedApp?.status !== ApplicationStatuses.APPLIED
                        ? "#2D9E64!"
                        : undefined,
                    borderColor:
                      selectedApp?.status !== ApplicationStatuses.APPLIED
                        ? "#2D9E64!"
                        : undefined,
                    animation:
                      selectedApp?.status === ApplicationStatuses.APPLIED
                        ? `${glowDim} 2s infinite ease-in-out`
                        : "none",
                  },
                }}
              />
              <Stepper.Step
                label="Review"
                description="Screening"
                styles={{
                  stepIcon: {
                    backgroundColor: [
                      ApplicationStatuses.INTERVIEW,
                      ApplicationStatuses.HIRED,
                    ].includes(selectedApp?.status)
                      ? "#2D9E64!"
                      : undefined,
                    borderColor: [
                      ApplicationStatuses.INTERVIEW,
                      ApplicationStatuses.HIRED,
                    ].includes(selectedApp?.status)
                      ? "#2D9E64!"
                      : undefined,
                    animation:
                      selectedApp?.status === ApplicationStatuses.SHORTLISTED
                        ? `${glowDim} 2s infinite ease-in-out`
                        : "none",
                  },
                }}
              />
              <Stepper.Step
                label="Interview"
                description="Assessing"
                styles={{
                  stepIcon: {
                    backgroundColor:
                      selectedApp?.status === ApplicationStatuses.HIRED
                        ? "#2D9E64!"
                        : undefined,
                    borderColor:
                      selectedApp?.status === ApplicationStatuses.HIRED
                        ? "#2D9E64!"
                        : undefined,
                    animation:
                      selectedApp?.status === ApplicationStatuses.INTERVIEW
                        ? `${glowDim} 2s infinite ease-in-out`
                        : "none",
                  },
                }}
              />
              <Stepper.Completed>
                <div className="mt-8 p-6 bg-teal-400/10 rounded-2xl border border-teal-400/20 text-center animate-bounce">
                  <Text
                    fw={900}
                    className="text-teal-400! uppercase! tracking-[0.3em]! text-xs!"
                  >
                    Hiring Journey Finalized
                  </Text>
                </div>
              </Stepper.Completed>
            </Stepper>
          </div>

          {/* Activity Stream - Hidden when Hired */}
          {selectedApp?.status !== ApplicationStatuses.HIRED && (
            <>
              <Divider
                label={
                  <Text
                    size="xs"
                    fw={900}
                    className="text-mine-shaft-500! uppercase! tracking-[0.4em]! px-4!"
                  >
                    Activity Stream
                  </Text>
                }
                labelPosition="center"
                className="border-mine-shaft-800/50!"
              />

              <div
                className="max-h-80 overflow-y-auto px-2! lg:px-6! scrollbar-hide"
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
              >
                <div className="w-full">
                  <Stack gap="xl!">
                    {selectedApp?.history?.length > 0 ? (
                      [...selectedApp.history].reverse().map((item, idx) => (
                        <div
                          key={idx}
                          className="relative pl-6! border-l-2 border-mine-shaft-800 last:border-l-0 pb-10! last:pb-2!"
                        >
                          {/* Status Dot - Far left, close to border */}
                          <div className="absolute -left-[11px] top-0 w-5 h-5 rounded-full bg-bright-sun-400 border-4 border-mine-shaft-950 shadow-[0_0_15px_rgba(250,230,45,0.3)] z-20 transition-transform hover:scale-125"></div>

                          {/* Content Card - Minimal gap and expands to full right width */}
                          <div className="bg-mine-shaft-900/40! p-6! lg:p-8! rounded-[2rem]! border! border-mine-shaft-800/80! hover:border-bright-sun-400/30! transition-all! shadow-lg! w-full!">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6!">
                              <Group gap="xs!" wrap="nowrap">
                                <Badge
                                  size="xs"
                                  variant="outline"
                                  color="gray"
                                  className="border-mine-shaft-700! font-black! text-[9px]! px-2!"
                                >
                                  {item.from}
                                </Badge>
                                <IconArrowRight
                                  size={12}
                                  className="text-mine-shaft-500"
                                />
                                <Badge
                                  size="xs"
                                  variant="filled"
                                  color="yellow"
                                  className="bg-bright-sun-400! text-mine-shaft-950! font-black! text-[9px]! px-2!"
                                >
                                  {item.to}
                                </Badge>
                              </Group>
                              <Text
                                size="10px"
                                fw={900}
                                className="text-mine-shaft-500! uppercase! tracking-widest!"
                              >
                                {item.date}
                              </Text>
                            </div>

                            <div className="bg-mine-shaft-950/60! p-5! rounded-2xl! border border-mine-shaft-800/30!">
                              <Text
                                size="md"
                                fw={600}
                                className="text-mine-shaft-100! italic! leading-relaxed!"
                              >
                                "{item.comment}"
                              </Text>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="p-16 text-center bg-mine-shaft-900/20 rounded-[3rem] border border-dashed border-mine-shaft-800 flex flex-col items-center gap-6">
                        <div className="p-5 bg-mine-shaft-900/50 rounded-full animate-pulse">
                          <IconClock
                            size={48}
                            className="text-mine-shaft-600"
                          />
                        </div>
                        <Text
                          size="xs"
                          fw={800}
                          className="text-mine-shaft-500! uppercase! tracking-[0.2em]! max-w-[250px]! leading-loose!"
                        >
                          Your application is currently being analyzed. Check
                          back soon!
                        </Text>
                      </div>
                    )}
                  </Stack>
                </div>
              </div>
            </>
          )}
          <Button
            fullWidth
            variant="gradient"
            gradient={{ from: "bright-sun.4", to: "bright-sun.7", deg: 45 }}
            onClick={() => setReviewModalOpened(false)}
            radius="xl"
            size="lg"
            className="text-mine-shaft-950! font-black! uppercase! tracking-[0.3em]! h-14! shadow-xl! hover:scale-[1.02]! transition-transform!"
          >
            Acknowledge Log
          </Button>
        </Stack>
      </Modal>
    </div>
  );
};

export default ApplicationHistory;
