import React, { useState } from 'react';
import { TextInput, Button } from '@mantine/core';
import { IconMail } from '@tabler/icons-react';

const Subscribe = () => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');

    const validateEmail = (val) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!val) {
            setError('Email is required');
            return false;
        }
        if (!emailRegex.test(val)) {
            setError('Please enter a valid email address');
            return false;
        }
        setError('');
        return true;
    };

    const handleSubscribe = () => {
        if (validateEmail(email)) {
            alert(`Subscription successful for ${email}!`);
            setEmail('');
        }
    };

    return (
        <section className="bg-mine-shaft-950 px-4 md:px-10 lg:px-20 pb-10">
            <div className="max-w-6xl mx-auto bg-mine-shaft-900/40 backdrop-blur-md border border-mine-shaft-800 rounded-3xl p-3 md:p-6 flex flex-col lg:flex-row items-center justify-between gap-8">
                {/* Left Side: Heading */}
                <div className="flex-1 text-center lg:text-left px-3">
                    <h2 className="text-mine-shaft-100 text-2xl md:text-4xl font-extrabold leading-tight">
                        Never want to miss any <span className="text-bright-sun-400">Job News?</span>
                    </h2>
                </div>

                {/* Right Side: Simple Subscription Form */}
                <div className="w-full lg:w-1/2 max-w-lg">
                    <div className="flex flex-col sm:flex-row items-stretch gap-3">
                        <TextInput
                            placeholder="Your email address"
                            size="md"
                            radius="xl"
                            className="flex-1"
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value);
                                if (error) validateEmail(e.target.value);
                            }}
                            error={error}
                            leftSection={<IconMail size={18} className="text-mine-shaft-400" />}
                            styles={{
                                input: {
                                    backgroundColor: 'rgba(26, 26, 26, 0.6)',
                                    border: '1px solid #333',
                                    color: '#eee',
                                    '&:focus': { borderColor: '#fbbf24' },
                                    height: '50px'
                                },
                                error: { fontSize: '11px', marginTop: '4px', marginLeft: '12px' }
                            }}
                        />
                        <Button
                            onClick={handleSubscribe}
                            size="md"
                            radius="xl"
                            className="bg-bright-sun-400 hover:bg-bright-sun-500 text-mine-shaft-950 font-bold transition-all duration-300 transform hover:scale-105 h-[50px] px-8"
                        >
                            Subscribe
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Subscribe;