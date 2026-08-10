import { ChakraProvider, defaultSystem } from "@chakra-ui/react"
import { Editor } from "./components/editor/editor"
import { NavBar } from "./components/nav/navBar"
import { ColorModeProvider } from "./components/common/colorMode"
import { Main } from "./main"


export const Root = () => {
    return (
        <ChakraProvider value={defaultSystem}>
            <ColorModeProvider defaultTheme="dark">
                <Main />
            </ColorModeProvider>
        </ChakraProvider>
    )
}