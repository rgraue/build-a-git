export interface GitCommit {
    commitSha: string
}

export interface GitBranch {
    commits: GitCommit[]
}