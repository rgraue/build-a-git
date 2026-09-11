from fastapi import HTTPException
from fastapi.routing import APIRouter
from caches.repo_cache import get_cached_repo
from models.git_model import CommitModel, BranchModel
from exceptions.common import NotFoundException

branch_router = APIRouter(prefix='/branch', tags=['branch'])

@branch_router.get('/{path:path}/')
async def get_branches(path: str, remote: bool = False) -> list[BranchModel]:
    print(f"getting all branches in {path}. remote = {remote}")
    try:
        branches = []
        repo = get_cached_repo(path)
        branches_to_find = repo.local_branches

        if remote is True:
            branches_to_find = branches_to_find + repo.remote_branches

        # branches_to_find.remove("origin/HEAD")
        print(f"Searching {branches_to_find}")
        for branch in branches_to_find:
            branches.append(repo.get_branch(branch))
        return branches
    except NotFoundException as e:
        print(str(e))
        raise HTTPException(status_code=404, detail=str(e))
    except Exception as e:
        print(str(e))
        raise HTTPException(status_code=500, detail=str(e))


@branch_router.get('/{path:path}')
async def get_branch(path: str, branch: str) -> BranchModel:
    print(f"getting branch {branch} in {path}")
    try:
        repo = get_cached_repo(path)
        return repo.get_branch(branch)
    except NotFoundException as e:
        print(str(e))
        raise HTTPException(status_code=404, detail=str(e))
    except Exception as e:
        print(str(e))
        raise HTTPException(status_code=500, detail=str(e))