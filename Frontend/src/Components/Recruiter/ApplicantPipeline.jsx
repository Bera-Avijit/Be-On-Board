import React, { useState, useEffect } from "react";
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
  Textarea,
  Transition,
  Box,
} from "@mantine/core";
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
  IconChevronRight,
  IconTrendingUp,
  IconTrash,
  IconBrandLinkedin,
  IconWorld,
  IconCurrencyDollar,
  IconMapPin,
} from "@tabler/icons-react";
import {
  getApplications,
  updateApplicationStatus,
  ApplicationStatuses,
} from "../../Data/ApplicationData";

const ApplicantPipeline = () => {
  const [applications, setApplications] = useState([]);
  const [selectedApplicant, setSelectedApplicant] = useState(null);
  const [modalOpened, setModalOpened] = useState(false);
  const [activeTab, setActiveTab] = useState(ApplicationStatuses.APPLIED);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("recent");

  // Review System States
  const [feedbackModalOpened, setFeedbackModalOpened] = useState(false);
  const [statusUpdatePending, setStatusUpdatePending] = useState(null);
  const [feedbackComment, setFeedbackComment] = useState("");

  useEffect(() => {
    setApplications(getApplications());
  }, []);

  const handleStatusUpdate = (id, newStatus, skipFeedback = false) => {
    if (!skipFeedback) {
      setStatusUpdatePending({ id, newStatus });
      setFeedbackModalOpened(true);
      return;
    }

    const updated = updateApplicationStatus(id, newStatus, feedbackComment);
    setApplications(updated);
    setFeedbackModalOpened(false);
    setModalOpened(false);
    setFeedbackComment("");
    setStatusUpdatePending(null);
  };

  const columns = [
    {
      title: "Applied",
      status: ApplicationStatuses.APPLIED,
      color: "blue",
      icon: <IconSend size={16} />,
    },
    {
      title: "Shortlisted",
      status: ApplicationStatuses.SHORTLISTED,
      color: "teal",
      icon: <IconTrendingUp size={16} />,
    },
    {
      title: "Interview",
      status: ApplicationStatuses.INTERVIEW,
      color: "orange",
      icon: <IconCalendar size={16} />,
    },
    {
      title: "Hired",
      status: ApplicationStatuses.HIRED,
      color: "green",
      icon: <IconCheck size={16} />,
    },
    {
      title: "Rejected",
      status: ApplicationStatuses.REJECTED,
      color: "red",
      icon: <IconX size={16} />,
    },
  ];

  const sortedApps = [...applications].sort((a, b) => {
    if (sortBy === "recent")
      return new Date(b.appliedDate) - new Date(a.appliedDate);
    return a.fullName.localeCompare(b.fullName);
  });

  const filteredApps = sortedApps.filter(
    (app) =>
      app.status === activeTab &&
      (app.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        app.jobTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (app.company &&
          app.company.toLowerCase().includes(searchQuery.toLowerCase()))),
  );

  const ApplicantRow = ({ applicant }) => {
    const [hovered, setHovered] = useState(false);

    return (
      <div
        className={`bg-mine-shaft-900/60 border transition-all duration-300 overflow-hidden rounded-2xl shadow-md cursor-pointer group w-full ${
          hovered
            ? "border-bright-sun-400 bg-mine-shaft-900/90 shadow-lg shadow-bright-sun-400/5 -translate-y-0.5"
            : "border-mine-shaft-800"
        }`}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={() => {
          setSelectedApplicant(applicant);
          setModalOpened(true);
        }}
      >
        <div className="px-5 py-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 md:gap-8 relative">
          {/* Left: Avatar & Info */}
          <div className="flex items-center gap-4 w-full md:w-auto min-w-0">
            <Avatar
              src={applicant?.avatar}
              alt={applicant?.fullName}
              size="md"
              radius="xl"
              className={`border-2 transition-transform duration-300 shadow-sm flex-shrink-0 ${hovered ? "border-bright-sun-400" : "border-mine-shaft-700"}`}
            >
              {(applicant?.fullName || "A").charAt(0)}
            </Avatar>
            <div className="flex flex-col min-w-0 overflow-hidden">
              <Text
                size="md"
                fw={800}
                className="text-gray-100 group-hover:text-bright-sun-400 transition-colors truncate"
                title={applicant?.fullName}
              >
                {applicant?.fullName}
              </Text>
              <div className="flex items-center gap-1.5 text-[11px] font-bold text-gray-400 uppercase tracking-wider truncate">
                <IconBriefcase size={12} className="flex-shrink-0" />
                <span className="truncate" title={applicant?.jobTitle}>
                  {applicant?.jobTitle}
                </span>
                {applicant?.company && (
                  <>
                    <span className="text-gray-600 mx-1">•</span>
                    <span className="truncate" title={applicant.company}>
                      {applicant.company}
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="flex flex-row items-center justify-between w-full md:w-auto md:contents pt-2 md:pt-0 border-t border-mine-shaft-800/50 md:border-0">
            {/* Center: Date */}
            <div className="flex items-center justify-center gap-2 flex-shrink-0">
              <div className="flex items-center gap-2 text-gray-300 text-xs font-semibold">
                <IconCalendar size={14} className="text-gray-500" />
                <span>
                  Applied{" "}
                  <span className="font-bold text-white ml-1">
                    {applicant.appliedDate}
                  </span>
                </span>
              </div>
            </div>

            {/* Right: Quick Actions */}
            <div
              className="flex items-center justify-end gap-2 flex-shrink-0"
              onClick={(e) => e.stopPropagation()}
            >
              {activeTab === ApplicationStatuses.APPLIED && (
                <Tooltip label="Quick Shortlist" withArrow>
                  <ActionIcon
                    variant="filled"
                    color="teal"
                    radius="md"
                    size="md"
                    className="bg-teal-500/10 text-teal-400 hover:bg-teal-500 hover:text-mine-shaft-950 transition-colors"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleStatusUpdate(
                        applicant.id,
                        ApplicationStatuses.SHORTLISTED,
                      );
                    }}
                  >
                    <IconCheck size={16} />
                  </ActionIcon>
                </Tooltip>
              )}
              <Tooltip label="Quick Reject" withArrow>
                <ActionIcon
                  variant="filled"
                  color="red"
                  radius="md"
                  size="md"
                  className="bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white transition-colors"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleStatusUpdate(
                      applicant.id,
                      ApplicationStatuses.REJECTED,
                    );
                  }}
                >
                  <IconTrash size={16} />
                </ActionIcon>
              </Tooltip>

              <Divider
                orientation="vertical"
                className="mx-1 border-mine-shaft-800"
              />

              <Menu shadow="xl" radius="md" position="bottom-end" withArrow>
                <Menu.Target>
                  <ActionIcon
                    variant="subtle"
                    color="gray"
                    size="md"
                    className="text-gray-400 hover:text-white hover:bg-mine-shaft-800 rounded-md transition-colors"
                  >
                    <IconDotsVertical size={16} />
                  </ActionIcon>
                </Menu.Target>
                <Menu.Dropdown className="bg-mine-shaft-900 border-mine-shaft-800 p-2 rounded-xl min-w-[160px]">
                  <Menu.Label className="uppercase font-bold text-[9px] tracking-widest text-gray-500 mb-1 px-2">
                    Move Status To
                  </Menu.Label>
                  {columns.map((col) => (
                    <Menu.Item
                      key={col.status}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleStatusUpdate(applicant.id, col.status);
                      }}
                      leftSection={React.cloneElement(col.icon, { size: 14 })}
                      className={`font-semibold text-xs rounded-lg transition-colors py-2 px-3 mb-0.5 ${
                        activeTab === col.status
                          ? "bg-mine-shaft-800 text-bright-sun-400"
                          : "text-gray-300 hover:bg-mine-shaft-800 hover:text-white"
                      }`}
                    >
                      {col.title}
                    </Menu.Item>
                  ))}
                </Menu.Dropdown>
              </Menu>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="mt-12! mb-16!">
      {/* Compact Pipeline Control Bar */}
      <div className="bg-mine-shaft-900/40 border border-mine-shaft-800 p-4 md:p-5 rounded-3xl mb-10 backdrop-blur-xl shadow-lg w-full">
        {/* Seamless Horizontal Control Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center w-full bg-mine-shaft-950/40 border border-mine-shaft-800 rounded-2xl sm:rounded-full p-2 sm:p-1 md:p-1.5 overflow-hidden gap-2 sm:gap-0">
          {/* Search Field */}
          <div className="flex-1 w-full sm:w-auto min-w-[80px] sm:min-w-[120px] md:min-w-[180px] sm:border-r border-mine-shaft-800/50 sm:pr-1 sm:mr-1 md:pr-2 md:mr-2 flex-shrink-0">
            <TextInput
              placeholder="Search name, role, or company..."
              leftSection={
                <IconSearch size={14} className="text-bright-sun-400" />
              }
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.currentTarget.value)}
              size="xs"
              radius="xl"
              variant="unstyled"
              classNames={{
                input:
                  "text-white! font-medium! bg-mine-shaft-800! pl-8! md:pl-9! pr-4! rounded-full! h-9 sm:h-7 md:h-10! text-xs sm:text-[10px] md:text-sm! w-full!",
              }}
            />
          </div>

          {/* Pipeline Status Tabs */}
          <div className="flex flex-row flex-nowrap items-center justify-between sm:justify-start w-full sm:w-auto gap-1 flex-shrink-0 overflow-x-auto sm:overflow-hidden no-scrollbar pb-1 sm:pb-0 hide-scrollbar-mobile">
            {columns.map((col) => {
              const isActive = activeTab === col.status;
              const count = applications.filter(
                (a) => a.status === col.status,
              ).length;
              return (
                <button
                  key={col.status}
                  onClick={() => setActiveTab(col.status)}
                  className={`flex-1 sm:flex-none flex flex-row items-center justify-center gap-1 px-1 sm:px-2 md:px-3 lg:px-4 h-9 sm:h-7 md:h-10 rounded-full text-[8px] md:text-[10px] lg:text-xs font-black uppercase tracking-tighter sm:tracking-normal md:tracking-widest transition-all focus:outline-none whitespace-nowrap overflow-hidden ${
                    isActive
                      ? "bg-bright-sun-400 text-mine-shaft-950 shadow-md scale-[1.02] md:scale-100"
                      : "text-mine-shaft-400 hover:text-white hover:bg-mine-shaft-800"
                  }`}
                >
                  <div
                    className={`${isActive ? "text-mine-shaft-950" : "text-mine-shaft-500"} hidden lg:block flex-shrink-0`}
                  >
                    {React.cloneElement(col.icon, { size: 14 })}
                  </div>
                  <span className="truncate">{col.title}</span>
                  <span
                    className={`px-1 py-0.5 rounded-full text-[7px] md:text-[9px] font-black flex-shrink-0 ${isActive ? "bg-mine-shaft-950/20 text-mine-shaft-950" : "bg-mine-shaft-800 text-mine-shaft-300"} hidden sm:flex items-center justify-center`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Bottom Row / Meta Information */}
        <div className="flex flex-row flex-nowrap items-center justify-between w-full mt-4 pt-4 border-t border-mine-shaft-800/50 overflow-hidden">
          <Menu shadow="xl" radius="xl">
            <Menu.Target>
              <Button
                variant="subtle"
                color="gray"
                size="xs"
                radius="xl"
                leftSection={<IconArrowsSort size={12} />}
                className="text-mine-shaft-400 hover:bg-mine-shaft-800 font-bold uppercase tracking-tighter sm:tracking-widest text-[8px] sm:text-[9px] md:text-[10px] px-1 sm:px-3! min-w-0 flex-shrink truncate"
              >
                <span className="truncate">
                  Sort: {sortBy === "recent" ? "Most Recent" : "Alphabetical"}
                </span>
              </Button>
            </Menu.Target>
            <Menu.Dropdown className="bg-mine-shaft-900 border-mine-shaft-800">
              <Menu.Item
                onClick={() => setSortBy("recent")}
                className="font-bold text-[10px] uppercase tracking-widest"
              >
                Most Recent
              </Menu.Item>
              <Menu.Item
                onClick={() => setSortBy("name")}
                className="font-bold text-[10px] uppercase tracking-widest"
              >
                Alphabetical
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>

          <Text
            size="xs"
            fw={800}
            className="text-mine-shaft-500 uppercase tracking-tighter sm:tracking-widest text-[8px] sm:text-[9px] md:text-[10px] min-w-0 flex-shrink truncate text-right"
          >
            Showing{" "}
            <span className="text-bright-sun-400 mx-0.5 sm:mx-1">
              {filteredApps.length}
            </span>{" "}
            candidates
          </Text>
        </div>
      </div>

      {/* Full-width List Layout */}
      {filteredApps.length > 0 ? (
        <div className="flex flex-col gap-3">
          {filteredApps.map((applicant) => (
            <ApplicantRow key={applicant.id} applicant={applicant} />
          ))}
        </div>
      ) : (
        <Stack
          align="center"
          justify="center"
          className="py-32! bg-mine-shaft-900/10! border-2! border-dashed! border-mine-shaft-800/50! rounded-[4rem]! backdrop-blur-sm!"
        >
          <div className="w-24! h-24! bg-mine-shaft-800/30! rounded-full! flex! items-center! justify-center! mb-8! border! border-mine-shaft-700!">
            <IconSearch size={48} className="text-mine-shaft-600!" />
          </div>
          <Text
            size="2xl"
            fw={900}
            className="text-white! uppercase! tracking-[0.3em]!"
          >
            No ResultsFound
          </Text>
          <Text
            size="sm"
            className="text-mine-shaft-500! font-black! uppercase! tracking-widest!"
          >
            We couldn't find any candidates matching your criteria
          </Text>
          <Button
            variant="light"
            color="yellow"
            radius="xl"
            mt="xl!"
            onClick={() => {
              setSearchQuery("");
              setActiveTab(ApplicationStatuses.APPLIED);
            }}
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
          <Group gap="md">
            <Avatar
              src={selectedApplicant?.avatar}
              size="lg"
              radius="xl"
              className="border! border-bright-sun-400! shadow-[0_0_15px_rgba(250,230,45,0.2)]!"
            >
              {(selectedApplicant?.fullName || "A").charAt(0)}
            </Avatar>
            <div>
              <Text
                size="xl"
                fw={900}
                className="text-white! uppercase tracking-tighter leading-none mb-0.5"
              >
                {selectedApplicant?.fullName}
              </Text>
              <Group gap="xs">
                <Badge
                  variant="filled"
                  color="yellow"
                  size="xs"
                  className="bg-bright-sun-400! text-mine-shaft-950! font-black uppercase tracking-widest px-2"
                >
                  {selectedApplicant?.status}
                </Badge>
                <Text
                  size="10px"
                  fw={800}
                  className="text-mine-shaft-300! uppercase tracking-widest opacity-80"
                >
                  Applied {selectedApplicant?.appliedDate}
                </Text>
              </Group>
            </div>
          </Group>
        }
        size="90%"
        radius="2rem"
        padding="2rem"
        scrollAreaComponent={Modal.NativeScrollArea}
        overflow="inside"
        closeButtonProps={{
          variant: "light",
          color: "yellow",
          radius: "xl",
          size: "md",
          className:
            "bg-bright-sun-400/10! text-bright-sun-400! hover:bg-bright-sun-400! hover:text-mine-shaft-950! transition-all shadow-sm!",
        }}
        styles={{
          header: {
            backgroundColor: "#111111",
            borderBottom: "1px solid #222222",
            paddingBottom: "1rem",
            marginBottom: "0.5rem",
          },
          content: {
            backgroundColor: "#0d0d0d",
            border: "1px solid #2a2a2a !important",
            boxShadow: "0 0 80px rgba(0,0,0,0.95)",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
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
        {selectedApplicant &&
          (() => {
            const STATUS_ORDER = [
              ApplicationStatuses.APPLIED,
              ApplicationStatuses.SHORTLISTED,
              ApplicationStatuses.INTERVIEW,
              ApplicationStatuses.HIRED,
            ];
            const currentIndex = STATUS_ORDER.indexOf(selectedApplicant.status);
            const isRejected =
              selectedApplicant.status === ApplicationStatuses.REJECTED;

            return (
              <Stack gap="2rem!" className="no-scrollbar">
                {/* 📋 Summary Stats Ribbon */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {[
                    {
                      icon: <IconCalendar size={18} />,
                      label: "Experience",
                      value: `${selectedApplicant.experience || "N/A"} Years`,
                    },
                    {
                      icon: <IconCurrencyDollar size={18} />,
                      label: "Ex. Salary",
                      value:
                        selectedApplicant.expectedSalary || "Not Disclosed",
                    },
                    {
                      icon: <IconMapPin size={18} />,
                      label: "Location",
                      value: "Worldwide (Remote)",
                    },
                  ].map((stat, i) => (
                    <div
                      key={i}
                      className="bg-mine-shaft-900/90! p-4! rounded-xl! border! border-mine-shaft-800/80! flex items-center gap-3 shadow-md! hover:border-bright-sun-400/30! transition-all!"
                    >
                      <div className="p-2 bg-bright-sun-400! text-mine-shaft-950! rounded-lg!">
                        {stat.icon}
                      </div>
                      <div>
                        <Text
                          size="10px"
                          fw={900}
                          className="text-mine-shaft-500! uppercase tracking-widest! mb-0!"
                        >
                          {stat.label}
                        </Text>
                        <Text
                          size="md"
                          fw={800}
                          className="text-white! tracking-tight!"
                        >
                          {stat.value}
                        </Text>
                      </div>
                    </div>
                  ))}
                </div>

                <Grid gutter="2rem!">
                  {/* Sidebar Logic */}
                  <Grid.Col
                    span={{
                      base: 12,
                      md: selectedApplicant.coverLetter ? 5 : 12,
                    }}
                  >
                    <div
                      className={`${!selectedApplicant.coverLetter ? "grid grid-cols-1 md:grid-cols-2 gap-6" : "flex flex-col gap-6"}`}
                    >
                      <div className="bg-mine-shaft-900/50! p-6! rounded-[1.5rem]! border! border-mine-shaft-800/60! shadow-inner!">
                        <Text
                          size="xs"
                          fw={1000}
                          className="text-bright-sun-400! uppercase! tracking-[0.3em]! mb-4 px-1!"
                        >
                          Direct Contact
                        </Text>
                        <Stack gap="xs!">
                          <Group
                            gap="sm!"
                            wrap="nowrap"
                            className="p-3 bg-mine-shaft-950/60! rounded-xl! border! border-mine-shaft-800/80!"
                          >
                            <div className="p-1.5 bg-mine-shaft-800! rounded text-mine-shaft-400!">
                              <IconMail size={16} />
                            </div>
                            <div className="min-w-0">
                              <Text
                                size="xs"
                                fw={800}
                                className="text-mine-shaft-500! uppercase! tracking-widest! mb-0!"
                              >
                                Email
                              </Text>
                              <Text
                                size="xs"
                                fw={700}
                                className="text-mine-shaft-100! truncate!"
                              >
                                {selectedApplicant.email}
                              </Text>
                            </div>
                          </Group>
                          <Group
                            gap="sm!"
                            wrap="nowrap"
                            className="p-3 bg-mine-shaft-950/60! rounded-xl! border! border-mine-shaft-800/80!"
                          >
                            <div className="p-1.5 bg-mine-shaft-800! rounded text-mine-shaft-400!">
                              <IconPhone size={16} />
                            </div>
                            <div className="min-w-0">
                              <Text
                                size="xs"
                                fw={800}
                                className="text-mine-shaft-500! uppercase! tracking-widest! mb-0!"
                              >
                                Phone
                              </Text>
                              <Text
                                size="xs"
                                fw={700}
                                className="text-mine-shaft-100!"
                              >
                                {selectedApplicant.phone}
                              </Text>
                            </div>
                          </Group>
                        </Stack>
                      </div>

                      <Stack gap="md!">
                        {(selectedApplicant.linkedin ||
                          selectedApplicant.portfolio) && (
                          <div className="bg-mine-shaft-900/50! p-6! rounded-[1.5rem]! border! border-mine-shaft-800/60! shadow-inner!">
                            <Text
                              size="xs"
                              fw={1000}
                              className="text-mine-shaft-400! uppercase! tracking-[0.3em]! mb-4 px-1!"
                            >
                              Professional Presence
                            </Text>
                            <Stack gap="sm!">
                              {selectedApplicant.linkedin && (
                                <Button
                                  component="a"
                                  href={selectedApplicant.linkedin}
                                  target="_blank"
                                  variant="light"
                                  color="blue"
                                  fullWidth
                                  radius="md"
                                  leftSection={<IconBrandLinkedin size={18} />}
                                  className="bg-blue-500/10! text-blue-400! hover:bg-blue-500! hover:text-white! font-bold! uppercase! tracking-widest! text-[10px]! h-12! transition-all!"
                                >
                                  LinkedIn Profile
                                </Button>
                              )}
                              {selectedApplicant.portfolio && (
                                <Button
                                  component="a"
                                  href={selectedApplicant.portfolio}
                                  target="_blank"
                                  variant="light"
                                  color="yellow"
                                  fullWidth
                                  radius="md"
                                  leftSection={<IconWorld size={18} />}
                                  className="bg-bright-sun-400/10! text-bright-sun-400! hover:bg-bright-sun-400! hover:text-mine-shaft-950! font-bold! uppercase! tracking-widest! text-[10px]! h-12! transition-all!"
                                >
                                  Portfolio Website
                                </Button>
                              )}
                            </Stack>
                          </div>
                        )}

                        <div className="p-4! bg-mine-shaft-900/40! rounded-[1.5rem]! border! border-mine-shaft-800! hover:border-red-400/20! transition-all!">
                          <div className="flex items-center justify-between gap-3!">
                            <div className="flex items-center gap-3!">
                              <div className="p-2 bg-red-500/10! text-red-500! rounded-lg!">
                                <IconFileText size={20} />
                              </div>
                              <div className="min-w-0">
                                <Text
                                  size="xs"
                                  fw={900}
                                  className="text-white! truncate! max-w-[100px]! mb-0!"
                                >
                                  {selectedApplicant.resume || "Resume.pdf"}
                                </Text>
                                <Text
                                  size="10px"
                                  fw={800}
                                  className="text-mine-shaft-500! uppercase tracking-widest!"
                                >
                                  PDF File
                                </Text>
                              </div>
                            </div>
                            <Button
                              variant="subtle"
                              color="yellow"
                              size="compact-xs"
                              leftSection={<IconExternalLink size={14} />}
                              className="text-bright-sun-400! font-black uppercase tracking-widest text-[9px]!"
                              onClick={() =>
                                window.open(
                                  selectedApplicant.resumeUrl || "#",
                                  "_blank",
                                )
                              }
                            >
                              View
                            </Button>
                          </div>
                        </div>
                      </Stack>
                    </div>
                  </Grid.Col>

                  {/* Main Column */}
                  {selectedApplicant.coverLetter && (
                    <Grid.Col span={{ base: 12, md: 7 }}>
                      <div className="h-full! flex! flex-col! bg-mine-shaft-900/20! p-6! sm:p-8! rounded-[2rem]! border! border-mine-shaft-800/80! shadow-inner! relative! overflow-hidden!">
                        <Text
                          size="xs"
                          fw={1000}
                          className="text-bright-sun-400! uppercase! tracking-[0.4em]! mb-4 border-b! border-mine-shaft-800/40! pb-4!"
                        >
                          Statement of Purpose
                        </Text>

                        <div className="relative! flex-1! no-scrollbar! overflow-y-auto! max-h-[300px]!">
                          <Text
                            size="md"
                            fw={500}
                            className="text-mine-shaft-50! leading-[1.8]! relative! z-10! italic!"
                          >
                            {selectedApplicant.coverLetter}
                          </Text>
                        </div>

                        <div className="mt-4! flex! justify-between! items-center! border-t! border-mine-shaft-800/40! pt-4!">
                          <Badge
                            variant="outline"
                            color="teal"
                            size="xs"
                            className="text-teal-400! border-teal-500/30! px-3! font-black! uppercase! tracking-widest!"
                          >
                            Verification {selectedApplicant.id.slice(-6)}
                          </Badge>
                        </div>
                      </div>
                    </Grid.Col>
                  )}
                </Grid>

                {/* 📜 Recruitment Journey / History */}
                {selectedApplicant.history &&
                  selectedApplicant.history.length > 0 && (
                    <div className="bg-mine-shaft-900/30! p-6! rounded-[2rem]! border! border-mine-shaft-800/40!">
                      <Text
                        size="xs"
                        fw={1000}
                        className="text-mine-shaft-400! uppercase! tracking-[0.3em]! mb-6 px-1!"
                      >
                        Recruitment Journey
                      </Text>
                      <Stack gap="xl!">
                        {selectedApplicant.history.map((item, idx) => (
                          <div
                            key={idx}
                            className="relative! pl-8! border-l-2! border-mine-shaft-800/50! last:border-l-0!"
                          >
                            <div className="absolute! -left-[9px]! top-0! w-4! h-4! rounded-full! bg-bright-sun-400! border-4! border-mine-shaft-900!"></div>
                            <Group justify="space-between" mb="xs!">
                              <Group gap="xs!">
                                <Badge size="xs" variant="light" color="gray">
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
                                  className="bg-bright-sun-400! text-mine-shaft-950!"
                                >
                                  {item.to}
                                </Badge>
                              </Group>
                              <Text
                                size="10px"
                                fw={700}
                                className="text-mine-shaft-500! uppercase! tracking-widest!"
                              >
                                {item.date}
                              </Text>
                            </Group>
                            <div className="bg-mine-shaft-950/40! p-4! rounded-xl! border! border-mine-shaft-800/60!">
                              <Text
                                size="xs"
                                fw={500}
                                className="text-mine-shaft-100! italic! leading-relaxed!"
                              >
                                "{item.comment}"
                              </Text>
                            </div>
                          </div>
                        ))}
                      </Stack>
                    </div>
                  )}

                {/* ⚡ Action Bar - Dynamic Stage Selection */}
                <Group
                  justify="space-between"
                  className="bg-mine-shaft-900/60! p-4! rounded-[1.5rem]! border! border-mine-shaft-800! backdrop-blur-md!"
                >
                  <Button
                    variant="subtle"
                    color="red"
                    size="md"
                    radius="md"
                    leftSection={<IconX size={18} />}
                    disabled={
                      isRejected ||
                      selectedApplicant.status === ApplicationStatuses.HIRED
                    }
                    onClick={() =>
                      handleStatusUpdate(
                        selectedApplicant.id,
                        ApplicationStatuses.REJECTED,
                      )
                    }
                    className="hover:bg-red-500/10! text-red-500! font-black! uppercase! tracking-widest! px-8!"
                  >
                    Reject Candidate
                  </Button>

                  <Group gap="xs!">
                    {currentIndex < STATUS_ORDER.length - 1 && !isRejected && (
                      <Button
                        variant="filled"
                        color="yellow"
                        size="md"
                        radius="md"
                        onClick={() =>
                          handleStatusUpdate(
                            selectedApplicant.id,
                            STATUS_ORDER[currentIndex + 1],
                          )
                        }
                        className="bg-bright-sun-400! text-mine-shaft-950! font-black! uppercase! tracking-widest! px-10! shadow-lg! hover:scale-105! transition-all!"
                      >
                        {(() => {
                          const nextStatus = STATUS_ORDER[currentIndex + 1];
                          if (nextStatus === ApplicationStatuses.SHORTLISTED)
                            return "Shortlist Candidate";
                          if (nextStatus === ApplicationStatuses.INTERVIEW)
                            return "Schedule Interview";
                          if (nextStatus === ApplicationStatuses.HIRED)
                            return "Onboard Candidate";
                          return `Move to ${nextStatus}`;
                        })()}
                      </Button>
                    )}

                    {(isRejected ||
                      selectedApplicant.status ===
                        ApplicationStatuses.HIRED) && (
                      <Badge
                        variant="light"
                        color={isRejected ? "red" : "teal"}
                        size="lg"
                        radius="md"
                        className={`font-black uppercase tracking-widest px-6 h-10 ${isRejected ? "bg-red-500/10 text-red-500" : "bg-teal-500/10 text-teal-500"}`}
                      >
                        {isRejected
                          ? "Candidate Rejected"
                          : "Successfully Onboarded"}
                      </Badge>
                    )}
                  </Group>
                </Group>
              </Stack>
            );
          })()}
      </Modal>

      {/* 📝 Feedback / Review Modal */}
      <Modal
        opened={feedbackModalOpened}
        onClose={() => setFeedbackModalOpened(false)}
        title={
          <Text
            size="lg"
            fw={900}
            className="text-white! uppercase tracking-widest!"
          >
            Stage Review & Transition
          </Text>
        }
        centered
        radius="xl"
        padding="xl"
        size="md"
        styles={{
          header: {
            backgroundColor: "#111111",
            borderBottom: "1px solid #222222",
          },
          content: {
            backgroundColor: "#0d0d0d",
            border: "1px solid #2a2a2a !important",
          },
        }}
      >
        <Stack gap="md!">
          <div className="bg-mine-shaft-900/50! p-4! rounded-xl! border! border-mine-shaft-800!">
            <Group justify="space-between" mb="xs!">
              <Text
                size="xs"
                fw={800}
                className="text-mine-shaft-400! uppercase tracking-widest!"
              >
                Moving From
              </Text>
              <Badge variant="light" color="gray" size="sm">
                {statusUpdatePending?.from || selectedApplicant?.status}
              </Badge>
            </Group>
            <Group justify="space-between">
              <Text
                size="xs"
                fw={800}
                className="text-bright-sun-400! uppercase tracking-widest!"
              >
                Moving To
              </Text>
              <Badge
                variant="filled"
                color="yellow"
                size="sm"
                className="bg-bright-sun-400! text-mine-shaft-950!"
              >
                {statusUpdatePending?.newStatus}
              </Badge>
            </Group>
          </div>

          <Textarea
            label={
              <Text
                size="xs"
                fw={900}
                className="text-mine-shaft-300! uppercase mb-2"
              >
                Review Message / Reason
              </Text>
            }
            placeholder="Provide a brief reason or feedback for moving to this stage..."
            minRows={4}
            value={feedbackComment}
            onChange={(e) => setFeedbackComment(e.currentTarget.value)}
            radius="md"
            className="text-white!"
            classNames={{
              input:
                "bg-mine-shaft-900! border-mine-shaft-800! text-white! focus:border-bright-sun-400!",
            }}
          />

          <Group justify="flex-end" mt="md!">
            <Button
              variant="subtle"
              color="gray"
              onClick={() => setFeedbackModalOpened(false)}
              className="text-mine-shaft-400!"
            >
              Cancel
            </Button>
            <Button
              color="yellow"
              className="bg-bright-sun-400! text-mine-shaft-950! font-black! uppercase! tracking-widest!"
              onClick={() =>
                handleStatusUpdate(
                  statusUpdatePending.id,
                  statusUpdatePending.newStatus,
                  true,
                )
              }
            >
              Confirm Transition
            </Button>
          </Group>
        </Stack>
      </Modal>
    </div>
  );
};

export default ApplicantPipeline;
