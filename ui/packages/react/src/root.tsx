import { ChakraProvider, defaultSystem } from "@chakra-ui/react"
import { Editor } from "./components/editor/editor"
import { NavBar } from "./components/nav/navBar"
import { ColorModeProvider } from "./components/common/colorMode"
import { Main } from "./main"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"


export const Root = () => {
    return (
        <ChakraProvider value={defaultSystem}>
            <ColorModeProvider defaultTheme="dark">
                <QueryClientProvider client={new QueryClient()}>
                    <Main />
                </QueryClientProvider>
            </ColorModeProvider>
        </ChakraProvider>
    )
}