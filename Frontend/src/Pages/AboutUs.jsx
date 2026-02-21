import React from 'react';
import { Text, Container, Title, Group, Avatar, SimpleGrid, Card, Button } from '@mantine/core';
import { IconRocket, IconTarget, IconUsers, IconHeart } from '@tabler/icons-react';
import { Link } from 'react-router-dom';

const AboutUs = () => {
    return (
        <div className="min-h-screen bg-mine-shaft-950 font-['Poppins'] py-20 px-6">
            <Container size="lg">
                <div className="text-center mb-20">
                    <Badge color="yellow" variant="light" size="lg" radius="xl" className="mb-4 bg-bright-sun-400/10! text-bright-sun-400! border border-bright-sun-400/20!">
                        Our Story
                    </Badge>
                    <Title order={1} className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-6 uppercase">
                        Redefining the <span className="text-bright-sun-400">Future of Work</span>
                    </Title>
                    <Text size="xl" className="text-mine-shaft-300 max-w-2xl mx-auto font-medium">
                        Be On Board is more than just a job portal. We are a bridge between extraordinary talent and world-changing companies.
                    </Text>
                </div>

                <SimpleGrid cols={{ base: 1, md: 2 }} spacing="xl" mb={80}>
                    <div className="bg-mine-shaft-900/30 border border-mine-shaft-800 p-10 rounded-[2.5rem] relative overflow-hidden group">
                        <div className="absolute -top-10 -right-10 w-40 h-40 bg-bright-sun-400/5 blur-3xl rounded-full"></div>
                        <IconRocket size={40} className="text-bright-sun-400 mb-6" />
                        <Title order={2} className="text-white font-black mb-4 uppercase tracking-tight">Our Mission</Title>
                        <Text className="text-mine-shaft-200 leading-relaxed">
                            To empower every professional on the planet to find work that they love and every company to build teams that inspire greatness. We believe in transparency, speed, and the power of human connection.
                        </Text>
                    </div>

                    <div className="bg-mine-shaft-900/30 border border-mine-shaft-800 p-10 rounded-[2.5rem] relative overflow-hidden group">
                        <div className="absolute -top-10 -right-10 w-40 h-40 bg-bright-sun-400/5 blur-3xl rounded-full"></div>
                        <IconTarget size={40} className="text-bright-sun-400 mb-6" />
                        <Title order={2} className="text-white font-black mb-4 uppercase tracking-tight">Our Vision</Title>
                        <Text className="text-mine-shaft-200 leading-relaxed">
                            To become the world's most trusted ecosystem for careers, where finding a job is as easy as sending a message and hiring talent is a seamless journey of discovery.
                        </Text>
                    </div>
                </SimpleGrid>

                <div className="mb-20">
                    <Title order={2} className="text-center text-white font-black mb-12 uppercase tracking-tight">Why Choose Us?</Title>
                    <SimpleGrid cols={{ base: 1, sm: 2, lg: 4 }} spacing="md">
                        {[
                            { title: "Smart Match", desc: "Our AI-driven engine finds the perfect fit for your skills.", icon: IconRocket },
                            { title: "Global Network", desc: "Connect with top companies from Silicon Valley to Bangalore.", icon: IconUsers },
                            { title: "Fast Hiring", desc: "Get hired 3x faster with our streamlined application process.", icon: IconTarget },
                            { title: "User Centric", desc: "A premium experience designed for humans, not just algorithms.", icon: IconHeart }
                        ].map((item, idx) => (
                            <Card key={idx} padding="xl" radius="lg" className="bg-mine-shaft-900/20! border! border-mine-shaft-800! hover:border-bright-sun-400/30! transition-all! group">
                                <item.icon size={32} className="text-bright-sun-400 mb-4 group-hover:scale-110 transition-transform" />
                                <Text fw={900} className="text-white uppercase mb-2 text-sm">{item.title}</Text>
                                <Text size="xs" className="text-mine-shaft-400 leading-relaxed font-medium">{item.desc}</Text>
                            </Card>
                        ))}
                    </SimpleGrid>
                </div>

                <div className="bg-bright-sun-400 rounded-[3rem] p-12 text-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.2),transparent)]"></div>
                    <Title order={2} className="text-mine-shaft-950 font-black text-4xl mb-6 tracking-tight uppercase">Ready to start your journey?</Title>
                    <Text className="text-mine-shaft-900 font-bold max-w-lg mx-auto mb-10">Join thousands of professionals who have found their dream roles through Be On Board.</Text>
                    <Group justify="center">
                        <Button component={Link} to="/find-jobs" size="xl" radius="xl" className="bg-mine-shaft-950! text-white! hover:bg-mine-shaft-800! px-10! font-black uppercase tracking-tighter">Find a Job</Button>
                        <Button component={Link} to="/post-jobs" size="xl" radius="xl" variant="outline" className="border-mine-shaft-950! text-mine-shaft-950! hover:bg-mine-shaft-950/10! px-10! font-black uppercase tracking-tighter">Post a Job</Button>
                    </Group>
                </div>
            </Container>
        </div>
    );
};

const Badge = ({ children, className }) => (
    <div className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${className}`}>
        {children}
    </div>
);

export default AboutUs;
