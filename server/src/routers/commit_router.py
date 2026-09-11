from fastapi import HTTPException
from fastapi.routing import APIRouter
from caches.repo_cache import get_cached_repo
from models.git_model import CommitModel
from exceptions.common import NotFoundException

commit_router = APIRouter(prefix='/commits', tags=['commits'])


@commit_router.get('/{path:path}')
async def get_branch_commits(path: str, branch: str, start: int = 0, depth: int = 10) -> list[CommitModel]:
    print(f"getting commits in {path} {branch}")
    try:
        repo = get_cached_repo(path)
        commits = repo.walk_commits(branch, start, depth)
        return commits
    except NotFoundException as e:
        print(str(e))
        raise HTTPException(status_code=404, detail=str(e))
    except Exception as e:
        print(e)
        # raise HTTPException(status_code=500, detail=str(e))
        raise e