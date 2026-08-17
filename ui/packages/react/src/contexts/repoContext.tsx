import React, { useContext, createContext, useState } from "react";
import { BuildAGitClient } from '@build-a-git/core'

const repoContext = createContext<BuildAGitClient | undefined>(undefined);

export const useRepo = () => {
    const context = useContext(repoContext);

    if (!context) {
        throw new Error("UseRepo must be withing RepoProvider");
    }

    return context;
}

export const RepoProvider = ({
    client,
    children
}: {
    client: BuildAGitClient,
    children: React.ReactNode
}) => {
    // eslint-disable-next-line
    const [context, setContext] = useState(client);

    return <repoContext.Provider value={context}>
        {children}
    </repoContext.Provider>
}