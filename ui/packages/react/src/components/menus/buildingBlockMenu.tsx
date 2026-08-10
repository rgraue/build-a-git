import React from "react";
import { Drawer, Portal, Stat, createOverlay } from '@chakra-ui/react'
import { GitCommit } from "@build-a-git/core";

export const buildingBlockMenu = createOverlay<GitCommit>((props) => {
    const { commitSha, commitShort, author, branch, message, ...rest } = props

    return <Drawer.Root placement={'end'} {...rest}>
      <Portal>
        <Drawer.Positioner>
          <Drawer.Content>
            <Drawer.Header>
                <Drawer.Title>{commitShort}</Drawer.Title>
            </Drawer.Header>
            <Drawer.Body spaceY="4">
            <Drawer.Description>{commitSha}</Drawer.Description>
            {/* branch */}
            <Stat.Root>
                <Stat.Label>Commit Message</Stat.Label>
                <Stat.ValueText>{message ? message : '--No Commit Message--'}</Stat.ValueText>
            </Stat.Root>
            {/* Author */}
            <Stat.Root>
                <Stat.Label>Author</Stat.Label>
                <Stat.ValueText>{author ? author : '--No Commit Author--'}</Stat.ValueText>
            </Stat.Root>
            {/* long sha */}
            <Stat.Root>
                <Stat.Label>Branch</Stat.Label>
                <Stat.ValueText>{branch}</Stat.ValueText>
            </Stat.Root>
            </Drawer.Body>
          </Drawer.Content>
        </Drawer.Positioner>
      </Portal>
    </Drawer.Root>
});