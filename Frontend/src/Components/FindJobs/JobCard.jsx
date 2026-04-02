import React, { useState, useEffect } from "react";
import {
  Card,
  Image,
  Text,
  Group,
  Badge,
  Divider,
  Button,
} from "@mantine/core";
import { Link } from "react-router-dom";
import {
  IconMapPin,
  IconBookmark,
  IconClock,
  IconBookmarkFilled,
} from "@tabler/icons-react";
import { saveJob, unsaveJob, isJobSaved } from "../../Data/ApplicationData";

const JobCard = ({ job }) => {
  const [expanded, setExpanded] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);

  useEffect(() => {
    setBookmarked(isJobSaved(job.id));
  }, [job.id]);

  const handleBookmarkToggle = () => {
    if (bookmarked) {
      unsaveJob(job.id);
      setBookmarked(false);
    } else {
      saveJob(job.id);
      setBookmarked(true);
    }
  };

  return (
    <Card
      shadow="lg"
      p="md"
      radius="lg"
      className="h-full flex flex-col bg-mine-shaft-900/30! backdrop-blur-sm! border! border-mine-shaft-600/80! hover:border-bright-sun-400! hover:shadow-[0_0_20px_rgba(250,230,45,0.1)]! transition-all! group"
    >
      <div className="flex-1 flex flex-col">
        <Card.Section p="sm">
          <Group justify="space-between" align="flex-start" wrap="nowrap">
            <Group gap="xs">
              <div className="w-12! h-12! p-2! bg-mine-shaft-900/50! rounded-xl! border! border-mine-shaft-800! group-hover:border-bright-sun-400/30! transition-colors! flex! items-center! justify-center!">
                <Image
                  src={job.logoUrl}
                  fit="contain"
                  w="100%"
                  h="100%"
                  fallbackSrc="https://via.placeholder.com/48"
                />
              </div>
              <div className="flex-1! min-w-0!">
                <Text
                  size="sm"
                  fw={800}
                  className="text-mine-shaft-50! group-hover:text-bright-sun-400! transition-colors! truncate!"
                >
                  {job.jobTitle}
                </Text>
                <Text
                  size="10px"
                  fw={600}
                  className="text-mine-shaft-400! truncate!"
                >
                  {job.company} • {job.applicants} Applicants
                </Text>
              </div>
            </Group>
            {bookmarked ? (
              <IconBookmarkFilled
                size={18}
                onClick={handleBookmarkToggle}
                className="text-white! cursor-pointer! shrink-0!"
              />
            ) : (
              <IconBookmark
                size={18}
                onClick={handleBookmarkToggle}
                className="text-mine-shaft-400! hover:text-bright-sun-400! cursor-pointer! transition-colors! shrink-0!"
              />
            )}
          </Group>
        </Card.Section>

        <Group gap={6} mb="md" wrap="nowrap">
          <Badge
            color="yellow"
            variant="light"
            size="xs"
            radius="sm"
            className="bg-bright-sun-400/10! text-bright-sun-400! border! border-bright-sun-400/10! font-bold! shrink-0!"
          >
            {job.experience}
          </Badge>
          <Badge
            color="gray"
            variant="light"
            size="xs"
            radius="sm"
            className="bg-mine-shaft-900! text-mine-shaft-300! font-bold! shrink-0!"
          >
            {job.jobType}
          </Badge>
          <Badge
            leftSection={
              <IconMapPin size={10} className="text-bright-sun-400!" />
            }
            variant="light"
            size="xs"
            radius="sm"
            className="bg-mine-shaft-900! text-mine-shaft-300! border! border-mine-shaft-800! font-bold! truncate!"
          >
            {job.location}
          </Badge>
        </Group>

        <div className="mb-md! flex-1">
          <Text
            size="xs"
            className={`text-mine-shaft-300! leading-relaxed! transition-all! ${!expanded ? "line-clamp-2!" : ""}`}
            dangerouslySetInnerHTML={{ __html: job.description }}
          />
          <Text
            size="10px"
            fw={700}
            className="text-bright-sun-400! cursor-pointer! hover:underline! mt-1! w-fit!"
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? "Read Less" : "Read More..."}
          </Text>
        </div>

        <Divider color="mine-shaft-900" variant="solid" mb="md" alpha={0.3} />

        <Group justify="space-between" align="center" mb="md">
          <Text size="sm" fw={800} className="text-bright-sun-400!">
            {job.minSalary} LPA - {job.maxSalary} LPA
          </Text>

          <Group gap={4} align="center">
            <IconClock size={12} className="text-bright-sun-400!" />
            <Text size="10px" fw={700} className="text-mine-shaft-400!">
              {job.postedDaysAgo} days ago
            </Text>
          </Group>
        </Group>
      </div>

      <Button
        component={Link}
        to={`/job-details/${job.id}`}
        fullWidth
        variant="outline"
        color="yellow"
        radius="lg"
        className="border-bright-sun-400! text-bright-sun-400! hover:bg-bright-sun-400! hover:text-mine-shaft-950! transition-all! font-extrabold! uppercase! tracking-tighter!"
      >
        View Job
      </Button>
    </Card>
  );
};

export default JobCard;
