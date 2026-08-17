import { Button, Menu, NativeSelect, Portal, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { LuMenu } from "react-icons/lu";
import { LinkRepoMenu, LinkRepoMenuButton } from "../menus/linkRepoMenu";

export const RepoMenu = () => {
    const [open, setOpen] = useState(false)

    const options = [
      <LinkRepoMenuButton />
    ]

    return (
        <Menu.Root open={open} onOpenChange={(e) => setOpen(e.open)}>
        <Menu.Trigger asChild>
          <Button variant="outline" size="sm">
            <LuMenu />
          </Button>
        </Menu.Trigger>
        <Portal>
          <Menu.Positioner>
            <Menu.Content>
              {...options}
            </Menu.Content>
          </Menu.Positioner>
        </Portal>
        <LinkRepoMenu.Viewport />
      </Menu.Root>
    )
}