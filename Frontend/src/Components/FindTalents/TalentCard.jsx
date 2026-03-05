import React, { useState } from "react";
import {
  Card,
  Avatar,
  Text,
  Group,
  Badge,
  Divider,
  Button,
} from "@mantine/core";
import { IconMapPin, IconHeart, IconHeartFilled } from "@tabler/icons-react";
import { isRecruiter } from "../../Data/User";

const TalentCard = ({ talent }) => {
  const [bookmarked, setBookmarked] = useState(false);

  return (
    <Card
      shadow="lg"
      p="md"
      radius="lg"
      className="h-full flex flex-col bg-mine-shaft-900/40! backdrop-blur-md! border! border-mine-shaft-700/50! hover:border-bright-sun-400/50! hover:shadow-[0_0_30px_rgba(250,230,45,0.05)]! transition-all! duration-300! group cursor-pointer"
    >
      <div className="flex-1 flex flex-col">
        <Card.Section p="sm">
          <Group justify="space-between" align="flex-start" wrap="nowrap">
            <Group gap="xs">
              <Avatar
                src={talent.image}
                alt={talent.name}
                size="lg"
                radius="xl"
                className="border-2! border-mine-shaft-700! group-hover:border-bright-sun-400! transition-all! duration-500! shadow-inner!"
                color="yellow"
                variant="filled"
              />
              <div className="flex-1! min-w-0!">
                <Text
                  size="md"
                  fw={800}
                  className="text-mine-shaft-50! group-hover:text-bright-sun-400! transition-colors! truncate! tracking-tight"
                >
                  {talent.name}
                </Text>
                <Text
                  size="xs"
                  fw={600}
                  className="text-mine-shaft-300! truncate! opacity-80"
                >
                  {talent.role} • {talent.company}
                </Text>
              </div>
            </Group>
            {bookmarked ? (
              <IconHeartFilled
                size={18}
                onClick={(e) => {
                  e.preventDefault();
                  setBookmarked(false);
                }}
                className="text-red-500! cursor-pointer! shrink-0! hover:scale-110! transition-transform"
              />
            ) : (
              <IconHeart
                size={18}
                onClick={(e) => {
                  e.preventDefault();
                  setBookmarked(true);
                }}
                className="text-mine-shaft-400! hover:text-red-500! cursor-pointer! transition-all! shrink-0! hover:scale-110"
              />
            )}
          </Group>
        </Card.Section>

        <Group gap={6} mb="sm" mt="xs">
          {talent.skills?.slice(0, 3).map((skill, index) => (
            <Badge
              key={index}
              variant="light"
              size="xs"
              radius="sm"
              className="bg-bright-sun-400/5! text-bright-sun-400! border! border-bright-sun-400/10! font-bold! group-hover:bg-bright-sun-400/10! transition-colors"
            >
              {skill}
            </Badge>
          ))}
          {talent.skills?.length > 3 && (
            <Text size="10px" fw={700} className="text-bright-sun-400! ml-1">
              +{talent.skills.length - 3}
            </Text>
          )}
        </Group>

        <div className="mb-md! flex-1">
          <Text
            size="xs"
            className="text-mine-shaft-200! leading-relaxed! transition-all! line-clamp-3! group-hover:text-mine-shaft-100"
          >
            {talent.about}
          </Text>
        </div>

        <Divider color="mine-shaft-800" variant="solid" mb="md" alpha={0.2} />

        <Group justify="space-between" align="center" mb="md">
          <Text
            size="sm"
            fw={800}
            className="text-bright-sun-400! drop-shadow-sm"
          >
            {talent.salary}
          </Text>

          <Group gap={4} align="center">
            <IconMapPin size={12} className="text-bright-sun-400!" />
            <Text
              size="10px"
              fw={700}
              className="text-mine-shaft-300! truncate max-w-[100px]"
            >
              {talent.location}
            </Text>
          </Group>
        </Group>
      </div>

      <Group grow gap="sm">
        <Button
          component="a"
          href={`/talent-profile/${talent.id}`}
          variant="outline"
          color="yellow"
          radius="md"
          className="border-bright-sun-400/50! text-bright-sun-400! hover:bg-bright-sun-400! hover:text-mine-shaft-950! transition-all! font-bold! tracking-tight!"
        >
          View Profile
        </Button>
        <Button
          variant="filled"
          radius="md"
          className="bg-mine-shaft-800! text-mine-shaft-100! hover:bg-mine-shaft-700! transition-all! font-bold! tracking-tight! border! border-mine-shaft-700!"
        >
          {isRecruiter() ? "Message" : "Connect"}
        </Button>
      </Group>
    </Card>
  );
};

export default TalentCard;
