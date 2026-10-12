export interface Repo {
    name: string,
    origin?: string,
    default: string,
    branches: string[]
}

export interface Branch {
    name: string,
    local: boolean,
    upstream?: string,
    current: boolean
}

export interface Commit {
    sha: string,
    short: string,
    branch: string,
    message: string,
    author: string,
    parents: string[]
}

export interface RepoLimb {
    local: Commit[],
    upstream: Commit[]
}

export interface RepoTree {
    default_branch: string,
    base_branch: string,
    limbs: {
        [branch: string]: RepoLimb
    }
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
            `${this.serverUrl}/branch/${encodedRepoPath}/?remote=true`, {
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

    async getRepoTree(url: string, base: string, start: number, depth: number): Promise<RepoTree | Error> {
        const encodedRepoPath = encodeURIComponent(url);
        const encodedBase = encodeURIComponent(base);

        const response = await fetch(
            `${this.serverUrl}/repo/pretty/${encodedRepoPath}?base=${encodedBase}&start=${start}&depth=${depth}`,
            {
                method: 'GET',
            }
        );

        if (!response.ok) {
            return await response.json() as Error
        }

        return await response.json() as RepoTree
    }
}