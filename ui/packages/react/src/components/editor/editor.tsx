import React, { useContext, useEffect, useState } from "react";
import { BuildingBlock } from "./buildingBlock";
import { Flex, Spinner, Text } from "@chakra-ui/react";
import { Branch } from "./branch";
import { DraggableCanvas } from "../common/canvas";
import { useRepo } from "../../contexts/repoContext";
import { useWorkspace } from "../../contexts/workspaceContext";
import { RepoTree, Error, RepoLimb } from "@build-a-git/core";
import Xarrow, { Xwrapper } from "react-xarrows";

export const Editor = () => {
    const { currentRepo } = useWorkspace();
    const repo = useRepo();
    const [tree, setTree] = useState<RepoTree>();

    const loadTree = async () => {
        // TODO make this sort to correct default
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

    const drawLines = (limbs: {[branch: string]: RepoLimb}) => {
        const lines: React.ReactNode[] = [];

        Object.keys(limbs).forEach(key => {
            const limb = limbs[key];
            limb.local.forEach(commit => {

                // if more then 1, its a merge commit
                // parent from other branch is always later in parent list
                if (commit.parents.length > 1) {
                    const start = commit.parents[commit.parents.length - 1];
                    const end = commit.sha;
                    console.log("linking", start, end)
                    lines.push(<Xarrow start={start} end={end}/>)
                }

            });
        });

        return lines;
    }

    return <Flex h={'90.5%'} backgroundColor={"Menu"}>
        {/* <Branch name={"test"} /> */}
        <Xwrapper>
        <DraggableCanvas>
            <>
                {mapTree()}
                {tree && drawLines(tree.limbs)}
            </>
        </DraggableCanvas>
        </Xwrapper>
    </Flex>
}