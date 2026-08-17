export interface Repo {
    name: string,
    origin: string,
    branches: string[]
}

export interface Branch {
    name: string,
    origin?: string,
    current: boolean
}

export interface Commit {
    sha: string,
    short: string,
    message: string,
    author: string
}

export interface Error {
    detail: string
}


export class BuildAGitClient {
    serverUrl: string

    constructor(serverUrl: string) {
        this.serverUrl = serverUrl;
    }

    async getRepo(url: string): Promise<Repo | Error> {
        const encodedRepoPath = encodeURIComponent(url);
        const response = await fetch(
            `${this.serverUrl}/repo/${encodedRepoPath}`, {
            method: 'GET',
            }
        );

        if (!response.ok) {
            return await response.json() as Error;
        }

        return await response.json() as Repo;
    }

    async getBranches(url: string): Promise<Branch[] | Error> {
        const encodedRepoPath = encodeURIComponent(url);
        const response = await fetch(
            `${this.serverUrl}/branch/${encodedRepoPath}/`, {
            method: 'GET',
            }
        );

        if (!response.ok) {
            return await response.json() as Error
        }

        return await response.json() as Branch[]
    }

    async getBranch(url: string, branch: string): Promise<Branch | Error> {
        const encodedRepoPath = encodeURIComponent(url);
        const encodedBranchName = encodeURIComponent(branch);
        const response = await fetch(
            `${this.serverUrl}/branch/${encodedRepoPath}?branch=${encodedBranchName}`, 
            {
                method: 'GET',
            }
        );

        if (!response.ok) {
            return await response.json() as Error
        }

        return await response.json() as Branch
    }

    async getCommits(url: string, branch: string, start: number, depth: number): Promise<Commit[] | Error> {
        const encodedRepoPath = encodeURIComponent(url);
        const encodedBranchName = encodeURIComponent(branch);
        const response = await fetch(
            `${this.serverUrl}/commits/${encodedRepoPath}?branch=${encodedBranchName}&start=${start}&depth=${depth}`,
            {
                method: 'GET',
            }
        );

        if (!response.ok) {
            return await response.json() as Error
        }

        return await response.json() as Commit[]
    }
}