import React, {useState, useRef, useEffect} from "react";
import { Branch as BranchModel, Commit, Error } from '@build-a-git/core';
import { Badge, Flex } from "@chakra-ui/react";
import { BuildingBlock } from "./buildingBlock";
import { DraggableComponent } from "../common/draggableComponent";
import { useWorkspace } from "../../contexts/workspaceContext";
import { useRepo } from "../../contexts/repoContext";

export interface BranchProps {
    branch: BranchModel
}

export const Branch = ({branch}: BranchProps) => {
    const workspace = useWorkspace();
    const repo = useRepo();
    const nodeRef = useRef(null);
    const [commits, setCommits] = useState<Commit[]>([]);

    const loadCommits = async () => {
        const commitResult = await repo.getCommits(workspace.currentRepo!, branch.name, 0, 10);

        if (!(commitResult as Error).detail) {
            setCommits(ex => [...ex, ...(commitResult as Commit[])]);
        }
    }

    useEffect(() => {
        loadCommits();
    }, []);

    const makeBlock = (commit: Commit) => {
        return <BuildingBlock commit={commit} branchName={branch.name}/>
    }

    const formatBranchName = () => {
        if (branch.name.length > 12) {
            return branch.name.slice(0, 12) + '...';
        }

        return branch.name;
    }

    return <DraggableComponent nodeRef={nodeRef}>
        <Flex direction={"column"} ref={nodeRef} w={'150px'}>
            {commits.map(makeBlock)}
            <Badge colorPalette={'blue'} size={'lg'} variant={'surface'}>{formatBranchName()}</Badge>
            {/* {branch.default && <Badge colorPalette={'green'} size={'lg'} variant={'surface'}>Default</Badge>} */}
        </Flex>
    </DraggableComponent>

}