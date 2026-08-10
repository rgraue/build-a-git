import React from "react";
import { Box, Flex} from "@chakra-ui/react";
import { ColorModeButton } from "../common/colorMode";

export const NavBar = () => {
  return (
    <Box
      paddingTop={"1rem"}
      paddingBottom={"1rem"}
      paddingEnd={"5rem"}
      paddingStart={"5rem"}
      backgroundColor={"AccentColor"}
    >
      <Flex
        justify={"space-between"}
      >
        <Flex justifyContent={"center"}>
          Build A Git
        </Flex>
      </Flex>
    </Box>
  );
};
