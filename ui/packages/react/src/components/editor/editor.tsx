import React, { useContext, useEffect, useState } from "react";
import { BuildingBlock } from "./buildingBlock";
import { Flex } from "@chakra-ui/react";
import { Branch } from "./branch";
import { DraggableCanvas } from "../common/canvas";
import { useRepo } from "../../contexts/repoContext";
import { useWorkspace } from "../../contexts/workspaceContext";
import { Branch as BranchModel, Error } from "@build-a-git/core";

export const Editor = () => {
    const { currentRepo } = useWorkspace();
    const repo = useRepo();

    console.log('satte', currentRepo);

    const [branches, setBranches] = useState<BranchModel[]>([]);

    const loadBranches = async () => {
        const branches = await repo.getBranches(currentRepo!);
        if (!(branches as Error).detail) {
            setBranches(() => (branches as BranchModel[]));
        }
    }

    useEffect(() => {
            console.log('this thing')
            loadBranches();
    }, [currentRepo]); 


    const mapBranches = (branch: BranchModel) => {
        return <Branch branch={branch}/>
    }

    return <Flex h={'90.5%'} backgroundColor={"Menu"}>
        {/* <Branch name={"test"} /> */}
        <DraggableCanvas>
            {branches && branches.map(mapBranches)}
        </DraggableCanvas>
    </Flex>
}