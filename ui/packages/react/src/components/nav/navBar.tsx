import React from "react";
import { Box, Flex, Text} from "@chakra-ui/react";
import { RepoMenu } from "./repoMenu";

export const NavBar = () => {
  return (
    <Box
      paddingTop={"1rem"}
      paddingBottom={"1rem"}
      paddingEnd={"5rem"}
      paddingStart={"5rem"}
      backgroundColor={'darkslategray'}
      h={'5%'}
    >
      <Flex
        direction={'row'}
        justify={"space-between"}
        alignItems={'center'}
      >
        <Text>Build A Git</Text>
        <RepoMenu />
      </Flex>
    </Box>
  );
};
