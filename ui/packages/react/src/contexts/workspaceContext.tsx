import React, { useContext, createContext, useState, SetStateAction } from "react";

export interface WorkspaceState {
    currentRepo?: string
    linkedRepos: string[]
}

export class Workspace {
    currentRepo: string = '__NONE'
    linkedRepos: string[] = []
    setContext: React.Dispatch<SetStateAction<Workspace>> = () => {}
}

export const workspaceContext = createContext<Workspace>(new Workspace());

export const useWorkspace = () => {
    const context = useContext(workspaceContext);
    
    if (!context) {
        throw new Error("UseRepo must be withing WorkspaceProvider");
    }

    return context;
}

export const WorkspaceProvider = ({
    children
}: {
    children: React.ReactNode
}) => {
    const [context, setContext] = useState(new Workspace());

    context.setContext = setContext

    return <workspaceContext.Provider value={context}>
        {children}
    </workspaceContext.Provider>
}