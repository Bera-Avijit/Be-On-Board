import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createTheme, MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import "./index.css";
import App from "./App.jsx";

const theme = createTheme({
  colors: {
    "mine-shaft": [
      "#f6f6f6", // 0 (50)
      "#e7e7e7", // 1 (100)
      "#d1d1d1", // 2 (200)
      "#b0b0b0", // 3 (300)
      "#888888", // 4 (400)
      "#6d6d6d", // 5 (500)
      "#5d5d5d", // 6 (600)
      "#4f4f4f", // 7 (700)
      "#454545", // 8 (800)
      "#3d3d3d", // 9 (900)
    ],
    "bright-sun": [
      "#fffbeb", // 0
      "#fff3c6", // 1
      "#ffe588", // 2
      "#ffd149", // 3
      "#ffbd20", // 4
      "#f99b07", // 5
      "#dd7302", // 6
      "#b75006", // 7
      "#943c0c", // 8
      "#7a330d", // 9
    ],
  },
  // Optionally make it the default color for all components
  primaryColor: "bright-sun",
  // You can also specify which shade (0-9) is the "default"
  primaryShade: 5,
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <MantineProvider theme={theme} withNormalizeCSS withGlobalStyles>
      <Notifications position="top-right" zIndex={2077} />
      <App />
    </MantineProvider>
  </StrictMode>,
);
