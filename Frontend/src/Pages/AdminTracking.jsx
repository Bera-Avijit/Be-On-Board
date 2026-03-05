import React, { useState, useEffect } from "react";
import {
  Container,
  Text,
  Title,
  Grid,
  Card,
  Group,
  Badge,
  Table,
  RingProgress,
  Stack,
  Divider,
  Box,
  Avatar,
  ScrollArea,
} from "@mantine/core";
import {
  IconChartBar,
  IconUsers,
  IconCheck,
  IconX,
  IconArrowUpRight,
  IconTrendingUp,
  IconActivity,
  IconShieldCheck,
  IconWorld,
} from "@tabler/icons-react";
import { getApplications, ApplicationStatuses } from "../Data/ApplicationData";

const AdminTracking = () => {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    setApplications(getApplications());
  }, []);

  const hiredCount = applications.filter(
    (a) => a.status === ApplicationStatuses.HIRED,
  ).length;
  const interviewCount = applications.filter(
    (a) => a.status === ApplicationStatuses.INTERVIEW,
  ).length;
  const totalApps = applications.length;
  const successRate =
    totalApps > 0 ? Math.round((hiredCount / totalApps) * 100) : 0;

  const stats = [
    {
      label: "Total Applications",
      value: totalApps,
      icon: IconUsers,
      color: "blue",
      increase: "+12%",
    },
    {
      label: "Hired Candidates",
      value: hiredCount,
      icon: IconCheck,
      color: "teal",
      increase: "+5",
    },
    {
      label: "Under Review",
      value: interviewCount,
      icon: IconChartBar,
      color: "orange",
      increase: "+3",
    },
    {
      label: "Conversion Rate",
      value: `${successRate}%`,
      icon: IconTrendingUp,
      color: "bright-sun",
      increase: "+2.4%",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 min-h-screen">
      {/* Header Section */}
      <div className="mb-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div className="flex flex-col gap-0">
            <div className="flex items-center gap-2">
              <IconShieldCheck size={20} className="text-bright-sun-400" />
              <Text
                size="xs"
                fw={900}
                className="text-mine-shaft-500 uppercase tracking-[0.4em]"
              >
                System Administrator
              </Text>
            </div>
            <Title
              order={1}
              className="text-white! uppercase! tracking-tighter! text-5xl! mt-2!"
            >
              Tracking <span className="text-bright-sun-400">Hub</span>
            </Title>
          </div>
          <Badge
            variant="outline"
            color="bright-sun"
            size="xl"
            radius="xl"
            className="border-2! font-black! px-8! h-12! uppercase! tracking-widest!"
          >
            Console Live
          </Badge>
        </div>
        <Text
          size="md"
          className="text-mine-shaft-400! mt-4! font-medium! max-w-xl!"
        >
          Monitor platform performance, track user activity, and manage
          application lifecycles across the entire ecosystem.
        </Text>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        {stats.map((stat) => (
          <div key={stat.label}>
            <Card className="bg-mine-shaft-900/40! border! border-mine-shaft-800! rounded-[2.5rem]! p-8! backdrop-blur-xl! shadow-2xl! hover:border-bright-sun-400/30! transition-all! group! relative overflow-hidden h-full">
              <div className="flex justify-between mb-6">
                <div
                  className={`p-4! bg-${stat.color === "bright-sun" ? "bright-sun-400" : stat.color + "-400"}/10! rounded-3xl! border! border-${stat.color === "bright-sun" ? "bright-sun-400" : stat.color + "-400"}/20! group-hover:scale-110! transition-transform! max-w-max!`}
                >
                  <stat.icon
                    size={28}
                    className={
                      stat.color === "bright-sun"
                        ? "text-bright-sun-400!"
                        : `text-${stat.color}-400!`
                    }
                  />
                </div>
                <div className="flex items-center gap-1.5 bg-mine-shaft-950/50 px-4 py-1.5 rounded-full border border-mine-shaft-800">
                  <Text size="xs" fw={900} className="text-teal-400!">
                    {stat.increase}
                  </Text>
                  <IconArrowUpRight size={14} className="text-teal-400!" />
                </div>
              </div>

              <div className="flex flex-col gap-0.5 relative z-10">
                <Text
                  size="xs"
                  fw={900}
                  className="text-mine-shaft-500! uppercase! tracking-[0.2em]!"
                >
                  {stat.label}
                </Text>
                <Text
                  size="4xl"
                  fw={900}
                  className="text-white! tracking-tighter!"
                >
                  {stat.value}
                </Text>
              </div>

              <div
                className={`absolute bottom-0 right-0 w-32 h-1 bg-${stat.color === "bright-sun" ? "bright-sun-400" : stat.color + "-400"}/20! rounded-full m-8 group-hover:w-48 transition-all duration-700`}
              ></div>
            </Card>
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
        <div className="col-span-1 lg:col-span-8">
          <Card className="bg-mine-shaft-900/20! border! border-mine-shaft-800! rounded-[3rem]! p-0! overflow-hidden! shadow-2xl! backdrop-blur-sm! h-full!">
            <div className="p-10 border-b border-mine-shaft-800/50 bg-mine-shaft-900/40">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <div className="w-2 h-8 bg-bright-sun-400 rounded-full"></div>
                  <Text
                    size="xl"
                    fw={900}
                    className="text-white! uppercase! tracking-tight!"
                  >
                    Recent Activity Log
                  </Text>
                </div>
                <Badge
                  variant="filled"
                  color="mine-shaft.9"
                  className="text-mine-shaft-500! font-black! uppercase! tracking-widest!"
                >
                  Live Stream
                </Badge>
              </div>
            </div>

            <ScrollArea>
              <Table verticalSpacing="xl!" className="px-10!">
                <Table.Thead className="bg-mine-shaft-950/30!">
                  <Table.Tr>
                    <Table.Th className="text-mine-shaft-500! uppercase! tracking-widest! text-[10px]! font-black! border-none! px-10! py-6!">
                      Candidate
                    </Table.Th>
                    <Table.Th className="text-mine-shaft-500! uppercase! tracking-widest! text-[10px]! font-black! border-none! py-6!">
                      Position
                    </Table.Th>
                    <Table.Th className="text-mine-shaft-500! uppercase! tracking-widest! text-[10px]! font-black! border-none! py-6!">
                      Status
                    </Table.Th>
                    <Table.Th className="text-mine-shaft-500! uppercase! tracking-widest! text-[10px]! font-black! border-none! px-10! py-6!">
                      Timestamp
                    </Table.Th>
                  </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                  {applications.slice(0, 6).map((app) => (
                    <Table.Tr
                      key={app.id}
                      className="hover:bg-mine-shaft-800/30! transition-colors! border-b! border-mine-shaft-800/10!"
                    >
                      <Table.Td className="px-10! py-6!">
                        <div className="flex items-center gap-4">
                          <Avatar
                            src={app.avatar}
                            color="bright-sun"
                            variant="light"
                            size="md"
                            radius="xl"
                            className="border! border-mine-shaft-800!"
                          >
                            {(app?.fullName || "A").charAt(0)}
                          </Avatar>
                          <div>
                            <Text size="sm" fw={800} className="text-white!">
                              {app?.fullName || "Anonymous"}
                            </Text>
                            <Text
                              size="xs"
                              className="text-mine-shaft-500! font-bold!"
                            >
                              {app.id.split("-").pop()}
                            </Text>
                          </div>
                        </div>
                      </Table.Td>
                      <Table.Td className="py-6!">
                        <Text
                          size="xs"
                          fw={800}
                          className="text-mine-shaft-300! uppercase! tracking-widest!"
                        >
                          {app.jobTitle}
                        </Text>
                      </Table.Td>
                      <Table.Td className="py-6!">
                        <Badge
                          variant="light"
                          color={
                            app.status === "HIRED"
                              ? "teal"
                              : app.status === "REJECTED"
                                ? "red"
                                : "blue"
                          }
                          size="sm"
                          className="font-black! uppercase! tracking-widest! h-7! px-4! rounded-lg!"
                        >
                          {app.status}
                        </Badge>
                      </Table.Td>
                      <Table.Td className="px-10! py-6!">
                        <Text
                          size="xs"
                          fw={700}
                          className="text-mine-shaft-500! italic!"
                        >
                          {app.appliedDate}
                        </Text>
                      </Table.Td>
                    </Table.Tr>
                  ))}
                </Table.Tbody>
              </Table>
            </ScrollArea>
          </Card>
        </div>

        <div className="col-span-1 lg:col-span-4">
          <Card className="bg-mine-shaft-900/40! border! border-mine-shaft-800! rounded-[3rem]! p-10! h-full! shadow-2xl! relative! overflow-hidden! flex flex-col items-center justify-center gap-12">
            <div className="absolute top-0 right-0 p-10 opacity-[0.02] rotate-12">
              <IconWorld size={300} className="text-bright-sun-400" />
            </div>

            <div className="relative relative z-10 w-full flex flex-col items-center justify-center gap-12">
              <div className="relative">
                <RingProgress
                  size={240}
                  thickness={24}
                  roundCaps
                  label={
                    <div className="flex flex-col items-center">
                      <Text
                        size="4xl"
                        fw={900}
                        className="text-white! tracking-tighter!"
                      >
                        {successRate}%
                      </Text>
                      <Text
                        size="xs"
                        fw={900}
                        className="text-mine-shaft-500! uppercase! tracking-widest!"
                      >
                        Success
                      </Text>
                    </div>
                  }
                  sections={[
                    { value: successRate, color: "bright-sun.4" },
                    { value: 100 - successRate, color: "mine-shaft.8" },
                  ]}
                />
                <div className="absolute -top-4 -right-4 p-4 bg-teal-400/10 rounded-full border border-teal-400/20 shadow-xl backdrop-blur-md">
                  <IconActivity size={24} className="text-teal-400" />
                </div>
              </div>

              <div className="text-center w-full">
                <Text
                  size="xl"
                  fw={900}
                  className="text-white! uppercase! tracking-tight! mb-2!"
                >
                  Platform Health
                </Text>
                <Text
                  size="xs"
                  className="text-mine-shaft-400! font-black! tracking-[0.3em]! uppercase!"
                >
                  Conversion Efficiency
                </Text>
              </div>

              <Divider className="w-full! border-mine-shaft-800/50!" />

              <div className="grid grid-cols-2 gap-8 w-full">
                <div>
                  <div className="flex flex-col gap-0 tracking-widest!">
                    <Text
                      size="xs"
                      fw={900}
                      className="text-mine-shaft-500! uppercase! mb-1!"
                    >
                      Active Jobs
                    </Text>
                    <Text size="2xl" fw={900} className="text-white!">
                      24
                    </Text>
                  </div>
                </div>
                <div>
                  <div className="flex flex-col gap-0 items-end tracking-widest!">
                    <Text
                      size="xs"
                      fw={900}
                      className="text-mine-shaft-500! uppercase! mb-1!"
                    >
                      Companies
                    </Text>
                    <Text size="2xl" fw={900} className="text-white!">
                      12
                    </Text>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminTracking;
