import { ChakraProvider, defaultSystem } from "@chakra-ui/react"
import { ColorModeProvider } from "./components/common/colorMode"
import { Main } from "./main"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { RepoProvider } from "./contexts/repoContext"
import { BuildAGitClient } from "@build-a-git/core"
import { config } from '@build-a-git/core'
import { WorkspaceProvider } from "./contexts/workspaceContext"

export const Root = () => {

    const buildAGitClient = new BuildAGitClient(config().serverUrl);

    return (
        <ChakraProvider value={defaultSystem}>
            <ColorModeProvider defaultTheme="dark">
                <QueryClientProvider client={new QueryClient()}>
                    <WorkspaceProvider>
                        <RepoProvider client={buildAGitClient}>
                            <Main />
                        </RepoProvider>
                    </WorkspaceProvider>
                </QueryClientProvider>
            </ColorModeProvider>
        </ChakraProvider>
    )
}