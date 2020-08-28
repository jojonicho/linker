import { Flex, useColorMode } from "@chakra-ui/core";

export const Container = (props: any) => {
  const { colorMode } = useColorMode();

  const bgColor = { light: "gray.50", dark: "gray.900" };

  const color = { light: "black", dark: "white" };
  return (
    <Flex
      direction="column"
      alignItems="center"
      justifyContent="flex-start"
      bg={bgColor[colorMode]}
      color={color[colorMode]}
      {...props}
      borderRadius="0.4rem"
      m={3}
      p={3}
    />
  );
};
