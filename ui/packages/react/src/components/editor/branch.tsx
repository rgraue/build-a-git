import React, {useState, useRef} from "react";
import { GitBranch, GitCommit } from '@build-a-git/core';
import { Flex } from "@chakra-ui/react";
import { BuildingBlock } from "./buildingBlock";
import { DraggableComponent } from "../common/DraggableComponent";

const testBranch: GitBranch = {
    commits: [
        {
            commitSha: "4dcc84d"
        },
        {
            commitSha: "5"
        },
        {
            commitSha: "4"
        },
        {
            commitSha: "3"
        },
        {
            commitSha: "2"
        },
        {
            commitSha: "1"
        }
    ]
}

export interface BranchProps {
    name: string
}

export const Branch = ({name}: BranchProps) => {
    const nodeRef = useRef(null);
    const [branch, setBranch ] = useState<GitBranch>(testBranch);

    const makeBlock = (commit: GitCommit) => {
        return <BuildingBlock commit={commit}/>
    }

    return <DraggableComponent nodeRef={nodeRef}>
        <Flex direction={"column"} ref={nodeRef} w={'100px'}>
            {branch.commits.map(makeBlock)}
            <p>{name}</p>
        </Flex>
    </DraggableComponent>

}