from pydantic import BaseModel

class BranchModel(BaseModel):
    name: str
    remote: bool

class RepoModel(BaseModel):
    name: str
    origin: str
    branches: list[BranchModel]
