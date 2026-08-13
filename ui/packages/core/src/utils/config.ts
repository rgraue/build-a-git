export interface BuildAGitConfig {
    version: string
    serverUrl: string
}

export const config = (): BuildAGitConfig => {
    return {
        version: '1.0.0',
        serverUrl: 'http://localhost:11818'
    }
}