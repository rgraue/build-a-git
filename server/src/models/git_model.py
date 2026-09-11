from pydantic import BaseModel

class BranchModel(BaseModel):
    name: str
    upstream: str | None
    current: bool

class RepoModel(BaseModel):
    name: str
    origin: str
    defualt: str | None
    branches: list[str]

class CommitModel(BaseModel):
    sha: str
    short: str
    message: str
    author: str
    parents: list[str]
