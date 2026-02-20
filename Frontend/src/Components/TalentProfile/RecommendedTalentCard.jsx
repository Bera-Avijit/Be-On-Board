import React, { useState } from 'react';
import { Avatar, Text, Group, ActionIcon } from '@mantine/core';
import { IconHeart, IconHeartFilled } from '@tabler/icons-react';
import { Link } from 'react-router-dom';

const RecommendedTalentCard = ({ talent }) => {
    const [bookmarked, setBookmarked] = useState(false);

    return (
        <div className="flex items-center justify-between p-3 rounded-xl bg-mine-shaft-900/50 border border-mine-shaft-800 hover:border-bright-sun-400/30 transition-all group">
            <Link to={`/talent-profile/${talent.id}`} className="flex items-center gap-3 flex-1 min-w-0">
                <Avatar
                    src={talent.image}
                    alt={talent.name}
                    size="md"
                    radius="xl"
                    className="border border-mine-shaft-700 group-hover:border-bright-sun-400 transition-all"
                />
                <div className="flex-1 min-w-0">
                    <Text size="sm" fw={700} className="text-mine-shaft-50 truncate group-hover:text-bright-sun-400 transition-colors">
                        {talent.name}
                    </Text>
                    <Text size="xs" className="text-mine-shaft-400 truncate">
                        {talent.role} • {talent.company}
                    </Text>
                </div>
            </Link>

            <ActionIcon
                variant="subtle"
                color={bookmarked ? "red" : "gray"}
                onClick={() => setBookmarked(!bookmarked)}
                className="hover:bg-transparent"
            >
                {bookmarked ? <IconHeartFilled size={18} /> : <IconHeart size={18} />}
            </ActionIcon>
        </div>
    );
};

export default RecommendedTalentCard;
