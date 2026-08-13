import React, {useState, useRef} from "react";
import { GitBranch, GitCommit } from '@build-a-git/core';
import { Badge, Flex } from "@chakra-ui/react";
import { BuildingBlock } from "./buildingBlock";
import { DraggableComponent } from "../common/draggableComponent";

const testBranch: GitBranch = {
    commits: [
        {
            commitSha: "long",
            commitShort: "short",
            branch:"this one"
        },
        {
            commitSha: "long",
            commitShort: "short"
        },
        {
            commitSha: "long",
            commitShort: "short"
        },
        {
            commitSha: "long",
            commitShort: "short"
        },
        {
            commitSha: "long",
            commitShort: "short"
        },
        {
            commitSha: "long",
            commitShort: "short"
        }
    ],
    default: true,
    name: "branchName"
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

    const formatBranchName = () => {
        if (name.length > 12) {
            return name.slice(0, 12) + '...';
        }

        return name;
    }

    return <DraggableComponent nodeRef={nodeRef}>
        <Flex direction={"column"} ref={nodeRef} w={'150px'}>
            {branch.commits.map(makeBlock)}
            <Badge colorPalette={'blue'} size={'lg'} variant={'surface'}>{formatBranchName()}</Badge>
            {branch.default && <Badge colorPalette={'green'} size={'lg'} variant={'surface'}>Default</Badge>}
        </Flex>
    </DraggableComponent>

}