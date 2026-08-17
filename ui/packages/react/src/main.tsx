import React from "react";
import { Flex } from "@chakra-ui/react";
import { NavBar } from "./components/nav/navBar";
import { Editor } from "./components/editor/editor";
import { Footer } from "./components/footer/footer";
import { Toaster } from "./components/common/toaster";

export const Main = () => {

    return <Flex justify={'space-between'} direction={'column'} h={'100vh'}>
        <Toaster />
        <NavBar />
        <Editor />
        <Footer />
    </Flex>
}