import React, { useContext, useEffect, useState } from "react";
import { BuildingBlock } from "./buildingBlock";
import { Flex, Spinner, Text } from "@chakra-ui/react";
import { Branch } from "./branch";
import { DraggableCanvas } from "../common/canvas";
import { useRepo } from "../../contexts/repoContext";
import { useWorkspace } from "../../contexts/workspaceContext";
import { RepoTree, Error } from "@build-a-git/core";

export const Editor = () => {
    const { currentRepo } = useWorkspace();
    const repo = useRepo();
    const [tree, setTree] = useState<RepoTree>();

    const loadTree = async () => {
        const repoTree = await repo.getRepoTree(currentRepo!.name, currentRepo?.default || 'main', 0, 10);
        setTree(repoTree as RepoTree);
    }

    useEffect(() => {
            loadTree();
    }, [currentRepo]); 


    const mapTree = () => {
        const limbs = tree?.limbs

        if (limbs) {
            return Object.keys(limbs).map(key => {
                return <Branch name={key} limb={limbs[key]}/>
            })
        } else {
            console.log("no limbs in tree", tree);
            return <Spinner />
        }
    }

    return <Flex h={'90.5%'} backgroundColor={"Menu"}>
        {/* <Branch name={"test"} /> */}
        <DraggableCanvas>
            {mapTree()}
        </DraggableCanvas>
    </Flex>
}