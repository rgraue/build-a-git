import { Repo } from "@build-a-git/core";
import React, { useContext, createContext, useState, SetStateAction } from "react";

export interface WorkspaceState {
    currentRepo?: Repo
    linkedRepos: string[]
}

export class Workspace {
    currentRepo?: Repo = undefined
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