import React from "react";
import { Flex } from "@chakra-ui/react";
import { NavBar } from "./components/nav/navBar";
import { Editor } from "./components/editor/editor";

export const Main = () => {

    return <Flex direction={'column'} gap={'1rem'}>
        <NavBar />
        <Editor />
    </Flex>
}