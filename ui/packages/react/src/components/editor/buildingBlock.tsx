import React from "react";
import { BUILD_BLOCK_PATH, getRandomColor, GitCommit } from '@build-a-git/core'
import { Box } from "@chakra-ui/react";

export interface BuildingBlockProps {
    commit: GitCommit
}

export const BuildingBlock = ({commit}: BuildingBlockProps) => {
    const buildingBlockStyle: React.CSSProperties = {
        width: '100px',
        height: '50px',
        backgroundColor: commit.color ? commit.color : getRandomColor(),
        clipPath: 'url(#mask)',
        display: 'flex',
        justifyContent: 'center', 
        alignItems: 'center',
    }

    return (
        <>
            <svg xmlns="http://www.w3.org/2000/svg" width="0" height="0" style={{position: "absolute"}}>
                <defs>
                    <clipPath id="mask" clipPathUnits="objectBoundingBox">
                        <path d={BUILD_BLOCK_PATH} />
                    </clipPath>
                </defs>
            </svg>
            <Box style={buildingBlockStyle} >
                <p style={{color: "black", fontSize: '16px'}}>{commit.commitSha}</p>
            </Box>
        </>

    )
}