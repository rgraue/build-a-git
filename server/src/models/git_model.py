from pydantic import BaseModel

class RepoModel(BaseModel):
    name: str
    origin: str | None
    default: str | None
    branches: list[str]

class BranchModel(BaseModel):
    name: str
    local: bool
    upstream: str | None
    current: bool

    def get_shorthand_name(self):
        return self.name.removeprefix("origin/")

class CommitModel(BaseModel):
    sha: str
    short: str
    branch: str
    message: str
    author: str
    parents: list[str]

class RepoLimb(BaseModel):
    local: list[CommitModel]
    upstream: list[CommitModel]

class RepoTree(BaseModel):
    default_branch: str
    base_branch: str
    limbs: dict[str, RepoLimb]

    def add_limb(self, branch: BranchModel, commits: list[CommitModel]):
        shorthand = branch.get_shorthand_name()

        if shorthand not in self.limbs:
            self.limbs[shorthand] = RepoLimb(local=[], upstream=[])

        if branch.local:
            self.limbs[shorthand].local = commits
        else:
            self.limbs[shorthand].upstream = commits

    def prune(self):
        for branch_name in self.limbs:
    
            if branch_name == self.base_branch:
                print(f"base set to {self.base_branch}. skipping pruned")
                continue

            print(f"pruning {branch_name}")
            self.limbs[branch_name].local = self.__filter_limb(self.limbs[self.base_branch].local, self.limbs[branch_name].local)
            self.limbs[branch_name].upstream = self.__filter_limb(self.limbs[self.base_branch].upstream, self.limbs[branch_name].upstream)

    def __filter_limb(self, base: list[CommitModel], to_filter: list[CommitModel]):
        filtered: list[CommitModel] = []

        for filter_to_commit in to_filter:
            found = False
            for base_commit in base:
                if base_commit.sha == filter_to_commit.sha:
                    found = True

            if found is False:
                filtered.append(filter_to_commit)

        return filtered