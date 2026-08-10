export interface GitCommit {
    commitSha: string
    commitShort: string
    message?: string
    base?: string
    branch?: string
    color?: string
    author?: string
}

export interface GitBranch {
    name: string
    default: boolean
    commits: GitCommit[]
}