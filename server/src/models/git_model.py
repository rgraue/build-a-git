from pydantic import BaseModel

class RepoModel(BaseModel):
    name: str
    origin: str | None
    default: str | None
    branches: list[str]

class BranchModel(BaseModel):
    name: str
    upstream: str | None
    current: bool

class CommitModel(BaseModel):
    sha: str
    short: str
    branch: str
    message: str
    author: str
    parents: list[str]

class RepoTree(BaseModel):
    default_branch: str
    base_branch: str
    limbs: dict[str, list[CommitModel]]

    def from_commits(all_commits: list[list[CommitModel]], base: str, default: str) -> RepoTree:
        tree = RepoTree(
            default_branch=default,
            base_branch=base,
            limbs={}
        )

        for branch in all_commits:
            for commit in branch:

                if commit.branch not in tree.limbs:
                    tree.limbs[commit.branch] = []

                tree.limbs[commit.branch].append(commit)
    
        return tree

    def prune(self):
        for branch_name in self.limbs:
    
            if branch_name == self.base_branch:
                print(f"base set to {self.base_branch}. skipping prune")
                continue

            print(f"pruning {branch_name}")
            self.limbs[branch_name] = self.__filter_limb(self.limbs[self.base_branch], self.limbs[branch_name])

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