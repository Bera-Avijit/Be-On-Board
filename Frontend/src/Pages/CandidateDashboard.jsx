import {
  Text,
  Title,
  Card,
  Group,
  Stack,
  Badge,
  Divider,
  Tabs,
  ActionIcon,
  Collapse,
} from "@mantine/core";
import { useState } from "react";
import {
  IconSend,
  IconBookmark,
  IconStar,
  IconSparkles,
  IconTrophy,
  IconBolt,
  IconMedal,
  IconChevronDown,
  IconChevronUp,
  IconArrowUpRight,
} from "@tabler/icons-react";
import ApplicationHistory from "../Components/Candidate/ApplicationHistory";
import { getApplications } from "../Data/ApplicationData";
import { keyframes } from "@emotion/react";

const pulseGlow = keyframes`
  0% { box-shadow: 0 0 0 0 rgba(250, 230, 45, 0.4); }
  70% { box-shadow: 0 0 0 10px rgba(250, 230, 45, 0); }
  100% { box-shadow: 0 0 0 0 rgba(250, 230, 45, 0); }
`;

const CandidateDashboard = () => {
  const apps = getApplications();
  const [isEliteExpanded, setIsEliteExpanded] = useState(false);
  const myApps = apps.filter((app) => app.email === "avijit@example.com");

  const stats = [
    {
      label: "Applications",
      value: myApps.length.toString(),
      icon: IconSend,
      color: "bright-sun",
      increase: "+1",
    },
    {
      label: "Saved Jobs",
      value: "15",
      icon: IconBookmark,
      color: "blue",
      increase: "+3",
    },
    {
      label: "Shortlisted",
      value: myApps.filter((a) => a.status === "SHORTLISTED").length.toString(),
      icon: IconStar,
      color: "teal",
      increase: "+2",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 min-h-screen">
      {/* Header Section */}
      <div className="flex flex-col gap-10 mb-16">
        {/* Header & Elite Card Section */}
        <div className="flex flex-col lg:flex-row justify-between items-start gap-8 relative">
          <div
            className={`flex-1 flex flex-col justify-center transition-all duration-500 ${!isEliteExpanded ? "lg:max-w-4xl" : "lg:max-w-xl"}`}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-bright-sun-400/10 rounded-lg border border-bright-sun-400/20">
                <IconSparkles size={18} className="text-bright-sun-400" />
              </div>
              <Text
                size="xs"
                fw={900}
                className="text-mine-shaft-500! uppercase! tracking-[0.4em]!"
              >
                Personal growth
              </Text>
            </div>
            <Title
              order={1}
              className="text-white! uppercase! tracking-tighter! text-5xl! md:text-7xl! mb-6!"
            >
              Candidate <span className="text-bright-sun-400">Portal</span>
            </Title>
            <Text
              size="lg"
              className="text-mine-shaft-400! font-medium! max-w-2xl! leading-relaxed!"
            >
              Manage your career journey. Track your applications, view
              shortlisted roles, and stay updated with your progress.
            </Text>
          </div>

          <Card
            className={`transition-all duration-500 ease-in-out bg-gradient-to-br from-mine-shaft-900 to-mine-shaft-950 border-2! border-bright-sun-400/20! p-6! md:p-8! shadow-2xl! relative overflow-hidden group 
              ${isEliteExpanded ? "lg:w-[450px] rounded-[2.5rem]!" : "lg:w-[320px] rounded-[2rem]! cursor-pointer hover:border-bright-sun-400/40!"}`}
            onClick={() => !isEliteExpanded && setIsEliteExpanded(true)}
          >
            <div className="absolute -top-10 -right-10 p-6 opacity-[0.03] group-hover:opacity-[0.07] transition-opacity rotate-12 pointer-events-none">
              <IconTrophy size={240} className="text-bright-sun-400" />
            </div>

            <div className="relative z-10 h-full">
              {/* Absolute Toggle Button with Pulse Effect */}
              <div className="absolute -top-2 -right-2 z-30">
                <ActionIcon
                  variant="filled"
                  color="yellow"
                  size="lg"
                  radius="xl"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsEliteExpanded(!isEliteExpanded);
                  }}
                  className="bg-bright-sun-400! hover:bg-bright-sun-500! text-mine-shaft-950! shadow-lg! transition-all duration-300!"
                  style={{
                    animation: !isEliteExpanded
                      ? `${pulseGlow} 2s infinite`
                      : "none",
                  }}
                >
                  {isEliteExpanded ? (
                    <IconChevronUp size={20} fontWeight={900} />
                  ) : (
                    <IconChevronDown size={20} fontWeight={900} />
                  )}
                </ActionIcon>
              </div>

              <Group justify="space-between" mb={isEliteExpanded ? "xl" : "md"}>
                <Badge
                  variant="filled"
                  color="yellow"
                  radius="md"
                  className="bg-bright-sun-400! text-mine-shaft-950! font-black! px-4! py-3! text-[10px]! uppercase! tracking-widest!"
                >
                  Elite Candidate
                </Badge>
                <div className="bg-mine-shaft-950/60 px-3 py-1.5 rounded-lg border border-mine-shaft-800 flex items-center gap-2 mr-10 lg:mr-12">
                  <IconBolt size={14} className="text-bright-sun-400" />
                  <Text
                    size="xs"
                    fw={900}
                    className="text-mine-shaft-200! uppercase! tracking-widest!"
                  >
                    Lvl 12
                  </Text>
                </div>
              </Group>

              {!isEliteExpanded && (
                <Stack gap={4}>
                  <Text
                    size="xs"
                    fw={900}
                    className="text-mine-shaft-400! uppercase! tracking-widest!"
                  >
                    Rank
                  </Text>
                  <Text size="xl" fw={900} className="text-white!">
                    Top <span className="text-bright-sun-400">5%</span>
                  </Text>
                </Stack>
              )}

              <Collapse in={isEliteExpanded}>
                <div className="pt-6">
                  <div className="mb-10">
                    <Text
                      size="xs"
                      fw={900}
                      className="text-mine-shaft-500! uppercase! tracking-[0.2em]! mb-2!"
                    >
                      Global Community Rank
                    </Text>
                    <Text
                      size="5xl"
                      fw={900}
                      className="text-white! tracking-tighter!"
                    >
                      Top <span className="text-bright-sun-400">5%</span>
                    </Text>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <Group justify="space-between" mb={8}>
                        <Text
                          size="xs"
                          fw={900}
                          className="text-mine-shaft-400! uppercase! tracking-widest!"
                        >
                          Profile Master
                        </Text>
                        <Text
                          size="xs"
                          fw={900}
                          className="text-bright-sun-400! uppercase! tracking-widest!"
                        >
                          85%
                        </Text>
                      </Group>
                      <div className="h-3 w-full bg-mine-shaft-800 rounded-full overflow-hidden p-[2px]">
                        <div className="h-full bg-bright-sun-400 w-[85%] rounded-full shadow-[0_0_15px_rgba(250,230,45,0.4)]"></div>
                      </div>
                    </div>

                    <Group gap="md">
                      <div className="flex -space-x-3">
                        {[IconMedal, IconStar, IconTrophy].map((Icon, i) => (
                          <div
                            key={i}
                            className="inline-block h-10 w-10 rounded-full ring-4 ring-mine-shaft-900 bg-mine-shaft-800 flex items-center justify-center border border-mine-shaft-700"
                          >
                            <Icon
                              size={18}
                              className={
                                i === 0
                                  ? "text-teal-400"
                                  : i === 1
                                    ? "text-blue-400"
                                    : "text-orange-400"
                              }
                            />
                          </div>
                        ))}
                      </div>
                      <Text
                        size="xs"
                        fw={800}
                        className="text-mine-shaft-400! uppercase! tracking-widest!"
                      >
                        +4 more badges
                      </Text>
                    </Group>
                  </div>
                </div>
              </Collapse>
            </div>
          </Card>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
        {stats.map((stat) => (
          <div key={stat.label}>
            <Card className="bg-mine-shaft-900/40! border! border-mine-shaft-800! rounded-[2rem]! md:rounded-[2.5rem]! p-8! md:p-10! backdrop-blur-xl! shadow-2xl! hover:border-bright-sun-400/50! transition-all! group! relative overflow-hidden h-full">
              <div className="flex justify-between mb-10 items-start">
                <div
                  className={`p-4! bg-${stat.color === "bright-sun" ? "bright-sun-400" : stat.color + "-400"}/10! rounded-2xl! border! border-${stat.color === "bright-sun" ? "bright-sun-400" : stat.color + "-400"}/20! shadow-lg! max-w-max!`}
                >
                  <stat.icon
                    size={38}
                    className={
                      stat.color === "bright-sun"
                        ? "text-bright-sun-400!"
                        : `text-${stat.color}-400!`
                    }
                  />
                </div>
                <div className="flex items-center gap-2 bg-mine-shaft-950/50 px-4 py-2 rounded-full border border-mine-shaft-800">
                  <Text size="xs" fw={900} className="text-teal-400!">
                    {stat.increase}
                  </Text>
                  <IconArrowUpRight size={14} className="text-teal-400!" />
                </div>
              </div>

              <div className="flex flex-col gap-1.5 relative z-10">
                <Text
                  size="xs"
                  fw={900}
                  className="text-mine-shaft-500! uppercase! tracking-[0.2em]!"
                >
                  {stat.label}
                </Text>
                <Text
                  size="5xl"
                  fw={900}
                  className="text-white! tracking-tighter!"
                >
                  {stat.value}
                </Text>
              </div>

              <div
                className={`absolute bottom-0 right-0 w-32 h-1.5 bg-${stat.color === "bright-sun" ? "bright-sun-400" : stat.color + "-400"}/30! rounded-full m-8 group-hover:w-full group-hover:m-0 group-hover:rounded-none transition-all duration-700`}
              ></div>
            </Card>
          </div>
        ))}
      </div>

      {/* Application Section Header */}
      <div className="mb-12">
        <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-start md:items-center">
          <Text
            size="3xl"
            fw={900}
            className="text-white! uppercase! tracking-tight! flex! items-center! gap-5!"
          >
            <div className="w-4! h-12! bg-bright-sun-400! rounded-full! shadow-[0_0_20px_rgba(250,230,45,0.4)]!"></div>
            My Applications
          </Text>
          <Divider className="flex-1! border-mine-shaft-800! opacity-30! hidden md:block" />
          <Badge
            variant="filled"
            color="bright-sun"
            size="xl"
            radius="xl"
            className="text-mine-shaft-950! font-black! px-8! py-6! text-sm!"
          >
            Live Tracking
          </Badge>
        </div>
      </div>

      <Tabs
        defaultValue="active"
        variant="pills"
        classNames={{
          root: "flex flex-col gap-6",
          list: "bg-mine-shaft-900/50 p-2 rounded-2xl border border-mine-shaft-800 w-fit gap-2",
          tab: "px-6 py-3 rounded-xl font-bold uppercase tracking-widest text-xs transition-all data-[active]:bg-bright-sun-400 data-[active]:text-mine-shaft-950 hover:bg-mine-shaft-800 text-mine-shaft-400 hover:text-mine-shaft-950!",
        }}
      >
        <Tabs.List>
          <Tabs.Tab value="active">Active Applications</Tabs.Tab>
          <Tabs.Tab value="completed">Application History</Tabs.Tab>
          <Tabs.Tab value="saved">Saved Jobs</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="active">
          <ApplicationHistory filterType="active" />
        </Tabs.Panel>

        <Tabs.Panel value="completed">
          <ApplicationHistory filterType="completed" />
        </Tabs.Panel>

        <Tabs.Panel value="saved">
          <ApplicationHistory filterType="saved" />
        </Tabs.Panel>
      </Tabs>
    </div>
  );
};

export default CandidateDashboard;
