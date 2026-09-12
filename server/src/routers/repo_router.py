from fastapi import HTTPException
from fastapi.routing import APIRouter
from caches.repo_cache import get_cached_repo
from models.git_model import RepoModel, RepoTree

repo_router = APIRouter(prefix="/repo", tags=["demo"])

@repo_router.get("/pretty/{path:path}")
async def get_pretty_repo(path: str, base: str = None, start: int = 0, depth: int = 10) -> RepoTree:
    print(f"getting repo {path}")
    try:
        repo = get_cached_repo(path)
        base = base if base is not None else repo.default
        return repo.build_pruned_tree(base, start, depth)
    except Exception as e:
        print(str(e))
        raise HTTPException(status_code=404, detail=str(e))

@repo_router.get("/{path:path}")
async def get_repo(path: str) -> RepoModel:
    print(f"getting repo {path}")
    try:
        repo = get_cached_repo(path)
        return repo.dto()
    except Exception as e:
        print(str(e))
        raise HTTPException(status_code=404, detail=str(e))