import React, {useState, useRef, useEffect} from "react";
import { Branch as BranchModel, Commit, Error } from '@build-a-git/core';
import { Badge, Flex } from "@chakra-ui/react";
import { BuildingBlock } from "./buildingBlock";
import { DraggableComponent } from "../common/draggableComponent";
import { useWorkspace } from "../../contexts/workspaceContext";
import { useRepo } from "../../contexts/repoContext";

export interface BranchProps {
    name: string,
    limb: Commit[]
}

export const Branch = ({name, limb}: BranchProps) => {
    const nodeRef = useRef(null);


    const makeBlock = (commit: Commit) => {
        return <BuildingBlock commit={commit} branchName={name}/>
    }

    const formatBranchName = () => {
        if (name.length > 12) {
            return name.slice(0, 12) + '...';
        }

        return name;
    }

    return <DraggableComponent nodeRef={nodeRef}>
        <Flex direction={"column"} ref={nodeRef} w={'150px'}>
            {limb.map(makeBlock)}
            <Badge colorPalette={'blue'} size={'lg'} variant={'surface'}>{formatBranchName()}</Badge>
            {/* {branch.default && <Badge colorPalette={'green'} size={'lg'} variant={'surface'}>Default</Badge>} */}
        </Flex>
    </DraggableComponent>

}