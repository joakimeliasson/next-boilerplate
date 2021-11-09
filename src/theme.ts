import { extendTheme } from "@chakra-ui/react";

const colors = {
  thunder: {
    main: "#011936",
  },
  lemon: {
    main: "#f9dc5c",
  },
  blood: {
    light: "#ffe5f0",
    main: "#d53434",
    dark: "#ad2525",
  },
};

const theme = extendTheme({ colors });

export { theme };
