import React from "react";
import { BuildingBlock } from "./buildingBlock";
import { Flex } from "@chakra-ui/react";
import { Branch } from "./branch";
import { DraggableCanvas } from "../common/canvas";

export const Editor = () => {

    return <Flex h={'90vh'} backgroundColor={"Menu"}>
        {/* <Branch name={"test"} /> */}
        <DraggableCanvas>
            <Branch name={"first"}/>
            <Branch name={"another"}/>
            <Branch name={"another"}/>
            <Branch name={"another"}/>
            <Branch name={"SM-19999/this branch is long"}/>
        </DraggableCanvas>
    </Flex>
}