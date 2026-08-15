from pygit2 import Repository, Branch, GIT_SORT_TIME, GIT_BRANCH_ALL
from models.git_model import RepoModel, BranchModel, CommitModel
from exceptions.common import NotFoundException
from utils.common import remove_ref_paths

class Repo:
    def __init__(self, path: str):
        print(f"initializing repo at {path}")
        self.path = path
        self.repository = Repository(path)
        self.origin = self.repository.remotes['origin']

        # ----- BRANCHES ------
        self.current_branch = self.repository.head.shorthand
        self.local_branches = list(self.repository.branches.local)
        self.remote_branches = list(self.repository.branches.remote)

    def get_branch(self, branch_name: str) -> BranchModel:
        branch: Branch = self.repository.lookup_branch(branch_name, GIT_BRANCH_ALL)

        if branch is None:
            raise NotFoundException(f"branch {branch_name} not found")

        remote_name = None
        try:
            remote_name = branch.upstream_name
        except:
            None
        
        return BranchModel(
            name=remove_ref_paths(branch.name),
            upstream=remove_ref_paths(remote_name) if remote_name else None,
            current=self.current_branch == branch_name
        )

    def walk_commits(self, branch_name: str, start: int, depth: str) -> list[CommitModel]:
        """
        get commits in a branch

        start: (inclusive) first index of commit to find
        depth: how many commits will be found after the first
        """
        print(f"walking branch {branch_name} in {self.repository.path}")
        commits: list[CommitModel] = []
        branch: Branch = self.repository.lookup_branch(branch_name, GIT_BRANCH_ALL)

        if branch:
            tip = branch.target

            for i, commit in enumerate(self.repository.walk(tip, GIT_SORT_TIME)):
                if i >= depth:
                    break
                if i >= start:
                    commits.append(
                        CommitModel(
                            sha=str(commit.id),
                            short=str(commit.id)[:7],
                            message=commit.message,
                            author=str(commit.author)
                        )
                    )
        else:
            raise NotFoundException(f"branch {branch_name} not found")

        return commits
        
    def dto(self) -> RepoModel:
        return RepoModel(
            name=self.path,
            origin=self.origin.url,
            branches=self.remote_branches + self.local_branches
        )