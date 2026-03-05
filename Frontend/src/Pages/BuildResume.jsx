import { Container, Title, Text, Button, Badge } from "@mantine/core";
import {
  IconApiApp,
  IconWand,
  IconSparkles,
  IconArrowRight,
} from "@tabler/icons-react";

const BuildResume = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 min-h-screen flex items-center justify-center">
      <div className="relative w-full max-w-4xl bg-mine-shaft-900/40 border border-mine-shaft-800 rounded-[2.5rem] p-10 md:p-16 backdrop-blur-xl shadow-2xl overflow-hidden text-center group">
        {/* Decorative Background Elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-bright-sun-400/5 rounded-full blur-[80px]"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/5 rounded-full blur-[80px]"></div>

        <div className="relative z-10 flex flex-col items-center gap-8">
          <Badge
            variant="outline"
            color="bright-sun"
            size="xl"
            radius="xl"
            className="border-2! font-black! px-8! h-12! uppercase! tracking-widest!"
            leftSection={<IconSparkles size={16} />}
          >
            Coming Soon
          </Badge>

          <div className="flex flex-col gap-4">
            <Title
              order={1}
              className="text-white! uppercase! tracking-tighter! text-5xl! md:text-6xl!"
            >
              AI <span className="text-bright-sun-400">Resume</span> Builder
            </Title>
            <Text
              size="lg"
              className="text-mine-shaft-400! font-medium! max-w-2xl! mx-auto!"
            >
              We're integrating advanced <strong>n8n AI workflows</strong> to
              automatically generate a highly optimized resume tailored to your
              profile data and preferred job roles.
            </Text>
          </div>

          <div className="flex flex-wrap justify-center gap-6 mt-8">
            <div className="flex flex-col items-center gap-3 p-6 bg-mine-shaft-900/60 rounded-3xl border border-mine-shaft-800 w-48 hover:border-bright-sun-400/30 transition-all">
              <IconWand size={36} className="text-bright-sun-400" />
              <Text
                size="sm"
                fw={800}
                className="text-white uppercase tracking-wider"
              >
                AI Powered
              </Text>
              <Text size="xs" className="text-mine-shaft-500 text-center">
                Smart generation based on your profile.
              </Text>
            </div>

            <div className="flex flex-col items-center gap-3 p-6 bg-mine-shaft-900/60 rounded-3xl border border-mine-shaft-800 w-48 hover:border-bright-sun-400/30 transition-all">
              <IconApiApp size={36} className="text-blue-400" />
              <Text
                size="sm"
                fw={800}
                className="text-white uppercase tracking-wider"
              >
                n8n Workflow
              </Text>
              <Text size="xs" className="text-mine-shaft-500 text-center">
                Seamlessly connected background automation.
              </Text>
            </div>
          </div>

          <Button
            variant="light"
            color="yellow"
            size="xl"
            radius="xl"
            rightSection={<IconArrowRight size={20} />}
            className="mt-8! bg-bright-sun-400/10! text-bright-sun-400! border! border-bright-sun-400/20! hover:bg-bright-sun-400/20! hover:scale-105! transition-all!"
            onClick={() => (window.location.href = "/applications")}
          >
            Go to My Applications
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BuildResume;
