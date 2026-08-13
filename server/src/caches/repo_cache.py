from functools import cache
from services.repo_service import Repo

@cache
def get_cached_repo(path: str):
    return Repo(path)