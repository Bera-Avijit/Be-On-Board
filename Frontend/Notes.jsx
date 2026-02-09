/*
Project Overview & Status

1. Environment Setup
   - Initialized React project using Vite.
   - Installed Tailwind CSS, Mantine UI, Redux Toolkit, and React Router DOM.

2. Existing Project Structure
   - Entry Points: src/main.jsx, src/App.jsx
   - Components: Header.jsx, Hero.jsx, NavLinks.jsx
   - Pages: HomePage.jsx

3. Next Steps
   - Ready to implement specific UI features and logic.
*/

import { Box, Container, Slider, Text } from "@mantine/core";
import React, { useState } from "react";

const Notes = () => {
  const [value, setValue] = useState(40);
  const [endValue, setEndValue] = useState(50);
  return (
    <>
      {/* Mantine Demo */}

      <h1 className="text-[40px]">Hello World</h1>
      <Container size="md" mt={10}>
        <Box maw={400} mx="auto">
          <Text mt="md" size="sm">
            onChange value: <b>{value}</b>
          </Text>
          <Text mt={5} size="sm">
            onChangeEnd value: <b>{endValue}</b>
          </Text>
          <Slider
            value={value}
            onChange={setValue}
            onChangeEnd={setEndValue}
            color="red"
            // labelAlwaysOn
            defaultValue={40}
            marks={[
              { value: 20, label: "20%" },
              { value: 50, label: "50%" },
              { value: 80, label: "80%" },
            ]}
          />
        </Box>
      </Container>
    </>
  );
};

export default Notes;
