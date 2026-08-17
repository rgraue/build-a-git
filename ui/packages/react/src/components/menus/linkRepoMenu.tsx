import React, { useContext, useEffect, useState } from "react";
import { Alert, Button, Drawer, Flex, Group, Input, Portal, Text, createOverlay} from "@chakra-ui/react";
import { useRepo } from "../../contexts/repoContext";
import { Error } from "@build-a-git/core";
import { toast, toaster } from "../common/toaster";
import { useWorkspace, workspaceContext } from "../../contexts/workspaceContext";

export const LinkRepoMenu = createOverlay<any>((props) => {
    const repoClient = useRepo();
    const workspace = useWorkspace();
    const [path, setPath] = useState('');
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');
    const [controlledOpen, setControlledOpen] = useState(true);


    useEffect(() => {
        if (success) {
            // queueMicrotask(() => {
                // toast.create({
                //     title: `Successfully linked Repo`,
                //     description: `${path}`,
                //     type: "info",
                //     closable: true,
                //     duration: 3000,
                // });
                workspace.setContext(ex => ({...ex, currentRepo: path, linkedRepos: [...ex.linkedRepos, path]}));
                // workspace.
                setControlledOpen(false);
            // })
        }
    }, [success]);

    const linkRepo = async () => {
        const repo = await repoClient.getRepo(path);
        setError('');

        if ((repo as Error).detail) {
            setSuccess(false);
            setError((repo as Error).detail);
            return;
        }

        setSuccess(true);
    };


    return <Drawer.Root 
                placement={'top'} 
                {...props} 
                open={controlledOpen} 
                onInteractOutside={() => setControlledOpen(false)}
            >
          <Portal>
            <Drawer.Positioner padding={'10%'}>
              <Drawer.Content>
                <Drawer.Header>
                    <Drawer.Title>
                        <Flex direction={'row'} gap={'2rem'}>
                            <Text>Link Repository</Text>
                        </Flex>
                    </Drawer.Title>
                </Drawer.Header>
                <Drawer.Body spaceY="4">
                    <Flex direction={'column'}>
                        <Group>
                            <Input 
                                placeholder="Repository Path" 
                                value={path} 
                                onChange={(e) => setPath(e.target.value)}
                            /> 
                            <Button
                                variant={'ghost'}
                                onClick={() => linkRepo()}
                            >
                                Link
                            </Button>
                        </Group>
                        {
                            error.length > 0 &&
                            <Alert.Root status="error" w={'50%'}>
                                <Alert.Indicator />
                                <Alert.Title>{error}</Alert.Title>
                            </Alert.Root>
                        }
                    </Flex>   
                </Drawer.Body>
              </Drawer.Content>
            </Drawer.Positioner>
          </Portal>
        </Drawer.Root>
});

export const LinkRepoMenuButton = () => {
    return <Button
            variant={'ghost'}
            onClick={(e) => LinkRepoMenu.open('linkRepo', undefined)}
          >
            Link Repository
          </Button>
};