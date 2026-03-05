import {
  Container,
  Text,
  Title,
  Grid,
  Card,
  Group,
  Stack,
  Badge,
  Box,
  Divider,
} from "@mantine/core";
import {
  IconBriefcase,
  IconUsers,
  IconFileText,
  IconTrendingUp,
  IconArrowUpRight,
} from "@tabler/icons-react";
import ApplicantPipeline from "../Components/Recruiter/ApplicantPipeline";
import { getApplications } from "../Data/ApplicationData";

const RecruiterDashboard = () => {
  const apps = getApplications();
  const stats = [
    {
      label: "Active Jobs",
      value: "12",
      icon: IconBriefcase,
      color: "blue",
      increase: "+2",
    },
    {
      label: "Total Applicants",
      value: apps.length.toString(),
      icon: IconUsers,
      color: "bright-sun",
      increase: "+15%",
    },
    {
      label: "New Today",
      value: "4",
      icon: IconFileText,
      color: "teal",
      increase: "+2",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 min-h-screen">
      {/* Header Section */}
      <div className="mb-20">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div className="flex flex-col gap-0">
            <div className="flex items-center gap-2">
              <IconTrendingUp size={20} className="text-bright-sun-400" />
              <Text
                size="xs"
                fw={900}
                className="text-mine-shaft-500 uppercase tracking-[0.4em]"
              >
                Recruitment Hub
              </Text>
            </div>
            <Title
              order={1}
              className="text-white! uppercase! tracking-tighter! text-5xl! mt-2!"
            >
              Dashboard <span className="text-bright-sun-400">Overview</span>
            </Title>
          </div>
          <Badge
            variant="outline"
            color="bright-sun"
            size="xl"
            radius="xl"
            className="border-2! font-black! px-8! h-12! uppercase! tracking-widest!"
          >
            Recruiter Mode
          </Badge>
        </div>
        <Text
          size="md"
          className="text-mine-shaft-400! mt-4! font-medium! max-w-xl!"
        >
          Manage your hiring pipeline with precision. Track, shortlist, and hire
          the best talent on the platform.
        </Text>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
        {stats.map((stat) => (
          <div key={stat.label}>
            <Card className="bg-mine-shaft-900/40! border! border-mine-shaft-800! rounded-[2.5rem]! p-10! backdrop-blur-xl! shadow-2xl! hover:border-bright-sun-400/50! transition-all! group! relative overflow-hidden h-full">
              <div className="flex justify-between mb-8 items-start">
                <div
                  className={`p-5! bg-${stat.color === "bright-sun" ? "bright-sun-400" : stat.color + "-400"}/10! rounded-3xl! border! border-${stat.color === "bright-sun" ? "bright-sun-400" : stat.color + "-400"}/20! shadow-lg! max-w-max!`}
                >
                  <stat.icon
                    size={42}
                    className={
                      stat.color === "bright-sun"
                        ? "text-bright-sun-400!"
                        : `text-${stat.color}-400!`
                    }
                  />
                </div>
                <div className="flex items-center gap-2 bg-mine-shaft-950/50 px-5 py-2 rounded-full border border-mine-shaft-800">
                  <Text size="sm" fw={900} className="text-teal-400!">
                    {stat.increase}
                  </Text>
                  <IconArrowUpRight size={16} className="text-teal-400!" />
                </div>
              </div>

              <div className="flex flex-col gap-1.5 relative z-10">
                <Text
                  size="md"
                  fw={900}
                  className="text-mine-shaft-500! uppercase! tracking-[0.2em]!"
                >
                  {stat.label}
                </Text>
                <Text
                  size="6xl"
                  fw={900}
                  className="text-white! tracking-tighter!"
                >
                  {stat.value}
                </Text>
              </div>

              {/* Decorative element */}
              <div
                className={`absolute bottom-0 right-0 w-32 h-2 bg-${stat.color === "bright-sun" ? "bright-sun-400" : stat.color + "-400"}/30! rounded-full m-8 group-hover:w-full group-hover:m-0 group-hover:rounded-none transition-all duration-700`}
              ></div>
            </Card>
          </div>
        ))}
      </div>

      {/* Pipeline Section */}
      <div className="mb-12">
        <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-start md:items-center">
          <Text
            size="3xl"
            fw={900}
            className="text-white! uppercase! tracking-tight! flex! items-center! gap-5!"
          >
            <div className="w-4! h-12! bg-bright-sun-400! rounded-full! shadow-[0_0_20px_rgba(250,230,45,0.4)]!"></div>
            Applicant Pipeline
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

      <ApplicantPipeline />
    </div>
  );
};

export default RecruiterDashboard;
