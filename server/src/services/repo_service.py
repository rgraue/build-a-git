from pygit2 import Repository
from models.git_model import RepoModel, BranchModel

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
        
    def dto(self):
        return RepoModel(
            name=self.path,
            origin=self.origin.url,
            branches=
                list(map(lambda name: BranchModel(name=name, remote=True), self.remote_branches)) + 
                list(map(lambda name: BranchModel(name=name, remote=False), self.local_branches))
        )