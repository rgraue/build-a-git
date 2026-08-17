import { Box, Flex, Text } from "@chakra-ui/react";
import React from "react";
import { HealthIcon } from "./healthIcon";
import { config } from "@build-a-git/core";
import { useWorkspace } from "../../contexts/workspaceContext";

export const Footer = () => {
    const workspace = useWorkspace();
    const debug = () => {
        console.log('debug', workspace);
    }

    return (
        <Box
            // paddingTop={"1rem"}
            // paddingBottom={"1rem"}
            // paddingEnd={"5rem"}
            // paddingStart={"5rem"}
            backgroundColor={'darkslategrey'}
            h='2.5%'
        >
            <Flex
                textAlign={'center'}
                alignItems={'center'}
                justify={"space-between"}
                marginStart={'1rem'}
                marginEnd={'1rem'}
            >
                <Flex>
                    
                </Flex>
                <Flex>

                </Flex>
                <Flex gap={'.5rem'}>
                    <Text onClick={debug} textStyle={'sm'}>{config().version}</Text>
                   <HealthIcon />
                </Flex>
            </Flex>
        </Box>
    )
}