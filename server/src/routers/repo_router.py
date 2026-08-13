from fastapi import HTTPException
from fastapi.routing import APIRouter
from caches.repo_cache import get_cached_repo
from models.git_model import RepoModel

repo_router = APIRouter(prefix="/repo", tags=["demo"])

@repo_router.get("/{path:path}")
async def get_repo(path: str) -> RepoModel:
    try:
        repo = get_cached_repo(path)
        return repo.dto()
    except Exception as e:
        raise HTTPException(status_code=404, detail=str(e))