import { useColorMode, Switch, IconButton } from "@chakra-ui/core";

export const DarkModeSwitch = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const isDark = colorMode === "dark";
  return (
    <IconButton
      ml={2}
      icon={isDark ? "moon" : "sun"}
      aria-label="toggleColorMode"
      onClick={toggleColorMode}
    />
  );
};
